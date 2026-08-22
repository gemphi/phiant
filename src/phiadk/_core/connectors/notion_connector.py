"""Notion Connector - Notion API integration for documentation management."""

from __future__ import annotations

import logging
from typing import Any

import httpx

from ..config import settings

logger = logging.getLogger(__name__)


class NotionConnector:
    """Notion API connector for documentation and knowledge base operations.

    Provides page/database operations, content search, and text extraction
    for integration with the RAG pipeline.
    """

    BASE_URL = "https://api.notion.com/v1"
    API_VERSION = "2022-06-28"

    def __init__(self) -> None:
        self._client = httpx.AsyncClient(timeout=30.0)

    @property
    def _headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {settings.notion_api_key}",
            "Notion-Version": self.API_VERSION,
            "Content-Type": "application/json",
        }

    async def search(self, query: str, page_size: int = 10) -> list[dict[str, Any]]:
        """Search Notion workspace."""
        url = f"{self.BASE_URL}/search"
        payload = {
            "query": query,
            "page_size": page_size,
            "sort": {"direction": "descending", "timestamp": "last_edited_time"},
        }

        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()

        results = []
        for item in response.json().get("results", []):
            title = self._extract_title(item)
            results.append({
                "id": item["id"],
                "title": title,
                "type": item.get("object", "page"),
                "url": item.get("url", ""),
                "last_edited_time": item.get("last_edited_time", ""),
            })
        return results

    async def get_page(self, page_id: str) -> dict[str, Any]:
        """Get page metadata."""
        url = f"{self.BASE_URL}/pages/{page_id}"
        response = await self._client.get(url, headers=self._headers)
        response.raise_for_status()
        return response.json()

    async def get_page_content(self, page_id: str) -> str:
        """Get page content as plain text by fetching all blocks."""
        url = f"{self.BASE_URL}/blocks/{page_id}/children"
        response = await self._client.get(url, headers=self._headers)
        response.raise_for_status()

        blocks = response.json().get("results", [])
        return self._blocks_to_text(blocks)

    async def create_page(
        self, parent_id: str, title: str, content: str = ""
    ) -> dict[str, Any]:
        """Create a new page in Notion."""
        url = f"{self.BASE_URL}/pages"
        payload = {
            "parent": {"page_id": parent_id},
            "properties": {
                "title": {
                    "title": [{"text": {"content": title}}]
                }
            },
            "children": [
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"text": {"content": content}}]
                    },
                }
            ] if content else [],
        }

        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()
        return response.json()

    async def query_database(
        self, database_id: str, filter_obj: dict | None = None
    ) -> list[dict[str, Any]]:
        """Query a Notion database."""
        url = f"{self.BASE_URL}/databases/{database_id}/query"
        payload: dict[str, Any] = {}
        if filter_obj:
            payload["filter"] = filter_obj

        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()
        return response.json().get("results", [])

    async def health_check(self) -> bool:
        """Check if Notion API is reachable."""
        try:
            url = f"{self.BASE_URL}/users/me"
            response = await self._client.get(url, headers=self._headers)
            return response.status_code == 200
        except Exception:
            return False

    def _extract_title(self, item: dict[str, Any]) -> str:
        """Extract title from a Notion page or database object."""
        props = item.get("properties", {})
        for prop in props.values():
            if prop.get("type") == "title":
                title_parts = prop.get("title", [])
                return "".join(t.get("plain_text", "") for t in title_parts)
        return "Untitled"

    def _blocks_to_text(self, blocks: list[dict[str, Any]]) -> str:
        """Convert Notion blocks to plain text."""
        lines = []
        for block in blocks:
            block_type = block.get("type", "")
            block_data = block.get(block_type, {})

            if block_type in ("paragraph", "bulleted_list_item", "numbered_list_item"):
                rich_text = block_data.get("rich_text", [])
                text = "".join(rt.get("plain_text", "") for rt in rich_text)
                if block_type == "bulleted_list_item":
                    text = f"- {text}"
                elif block_type == "numbered_list_item":
                    text = f"* {text}"
                lines.append(text)

            elif block_type.startswith("heading_"):
                rich_text = block_data.get("rich_text", [])
                text = "".join(rt.get("plain_text", "") for rt in rich_text)
                level = block_type[-1]
                lines.append(f"{'#' * int(level)} {text}")

            elif block_type == "code":
                rich_text = block_data.get("rich_text", [])
                text = "".join(rt.get("plain_text", "") for rt in rich_text)
                lang = block_data.get("language", "")
                lines.append(f"```{lang}\n{text}\n```")

        return "\n".join(lines)

    async def close(self) -> None:
        """Close the HTTP client."""
        await self._client.aclose()
