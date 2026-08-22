"""Knowledge Agent - RAG-powered internal knowledge retrieval (Delegates to PhiRAG domain agent)."""

from __future__ import annotations

from typing import Any

from phiegg.phirag.agent import PhiRAGAgent
from .base_agent import AgentResult, AgentTask, BaseAgent


class KnowledgeAgent(BaseAgent):
    """RAG-powered agent for internal knowledge retrieval (Legacy Adapter over PhiRAG)."""

    name = "knowledge"
    description = "Search and answer questions from internal knowledge base"
    capabilities = ["knowledge_search", "policy_lookup", "faq_answer", "document_summary"]

    def __init__(self, vectorstore: Any = None) -> None:
        super().__init__()
        self.vectorstore = vectorstore
        self._phirag = PhiRAGAgent()

    async def execute(self, task: AgentTask) -> AgentResult:
        query = task.query
        if not query or not query.strip():
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output="Empty query provided.",
                confidence=0.0,
            )

        top_k = task.parameters.get("top_k", 5)
        ctx = await self._phirag.execute_verb("answer_query", {"query": query, "top_k": top_k})
        out = ctx.results.get("output", {})
        answer = out.get("answer", "No answer generated.")
        sources = out.get("sources", [])

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=answer,
            data={"query": query, "answer": answer, "sources": sources},
            actions_taken=[f"retrieved_chunks({len(sources)})", "generated_answer"],
            tokens_used=150,
            confidence=ctx.confidence or 0.85,
            sources=sources,
        )
