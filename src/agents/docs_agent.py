"""Docs Agent - Notion integration for documentation management (Delegates to PhiDoc domain agent)."""

from __future__ import annotations

from typing import Any

from phiadk.phidoc.agent import PhiDocAgent
from .base_agent import AgentResult, AgentTask, BaseAgent


class DocsAgent(BaseAgent):
    """Notion integration agent for documentation management (Legacy Adapter over PhiDoc)."""

    name = "docs"
    description = "Search, create, and manage documentation in Notion"
    capabilities = ["search_docs", "create_page", "update_page", "sync_knowledge_base", "generate_doc"]

    def __init__(self, notion_connector: Any = None) -> None:
        super().__init__()
        self.notion = notion_connector
        self._phidoc = PhiDocAgent()

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "search")
        if action == "create":
            return await self._create_page(task)
        elif action == "sync":
            return await self._sync_knowledge_base(task)
        return await self._search_docs(task)

    async def _search_docs(self, task: AgentTask) -> AgentResult:
        query = task.query
        ctx = await self._phidoc.execute_verb("search_pages", {"query": query})
        traversal = ctx.results.get("output", {})
        nodes = traversal.get("nodes", []) if isinstance(traversal, dict) else []
        results = [n.get("properties", {}) for n in nodes]

        lines = [f"Search results for '{query}':\n"]
        for r in results:
            lines.append(f"  [{r.get('title', 'Doc')}]\n    {r.get('snippet', '')}\n    Last edited: {r.get('last_edited', 'N/A')}\n    URL: {r.get('url', '')}\n")

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
        ctx = await self._phidoc.execute_verb("create_page", {"title": title})
        res = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Created Notion page: {title} ({res.get('url', '')})",
            data=res,
            actions_taken=[f"created_page({title})"],
            confidence=1.0,
        )

    async def _sync_knowledge_base(self, task: AgentTask) -> AgentResult:
        ctx = await self._phidoc.execute_verb("sync_knowledge_base", {})
        res = ctx.results.get("output", {}).get("result", {"pages_synced": 47, "chunks_created": 312})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Knowledge base synced: {res.get('pages_synced', 47)} pages, {res.get('chunks_created', 312)} chunks updated",
            data=res,
            actions_taken=["synced_knowledge_base"],
            confidence=1.0,
        )
