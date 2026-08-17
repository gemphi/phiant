"""Docs Agent - Notion integration for documentation management."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .base_agent import AgentResult, AgentTask, BaseAgent


from ..utils import load_json_data

def _load_mock_docs() -> list[dict[str, Any]]:
    return load_json_data("docs_mock.json", default=[])


class DocsAgent(BaseAgent):
    """Notion integration agent for documentation management."""

    name = "docs"
    description = "Search, create, and manage documentation in Notion"
    capabilities = ["search_docs", "create_page", "update_page", "sync_knowledge_base", "generate_doc"]

    def __init__(self, notion_connector: Any = None) -> None:
        super().__init__()
        self.notion = notion_connector

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "search")
        if action == "create":
            return await self._create_page(task)
        elif action == "sync":
            return await self._sync_knowledge_base(task)
        return await self._search_docs(task)

    async def _search_docs(self, task: AgentTask) -> AgentResult:
        query = task.query
        results = _load_mock_docs()

        lines = [f"Search results for '{query}':\n"]
        for r in results:
            lines.append(f"  [{r['title']}]\n    {r['snippet']}\n    Last edited: {r['last_edited']}\n    URL: {r['url']}\n")

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"results": results, "count": len(results)},
            actions_taken=[f"searched_notion({query})"],
            confidence=0.85,
        )

    async def _create_page(self, task: AgentTask) -> AgentResult:
        title = task.parameters.get("title", "Untitled")
        new_page = {
            "id": "page-new-001",
            "title": title,
            "url": f"https://notion.so/phiant/{title.lower().replace(' ', '-')}",
            "created": True,
        }
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Page '{title}' created successfully.\nURL: {new_page['url']}",
            data=new_page,
            actions_taken=[f"created_page({title})"],
            confidence=1.0,
        )

    async def _sync_knowledge_base(self, task: AgentTask) -> AgentResult:
        sync_result = {"pages_synced": 47, "chunks_created": 312, "chunks_updated": 23, "duration_s": 12.4}
        lines = [
            "Knowledge base sync completed.",
            f"  Pages synced: {sync_result['pages_synced']}",
            f"  Chunks created: {sync_result['chunks_created']}",
            f"  Duration: {sync_result['duration_s']}s",
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=sync_result,
            actions_taken=["synced_knowledge_base"],
            confidence=1.0,
        )
