"""Knowledge Agent - RAG-powered internal knowledge retrieval."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from anthropic import AsyncAnthropic

from .base_agent import AgentResult, AgentTask, BaseAgent
from ..config import settings

KNOWLEDGE_SYSTEM_PROMPT = (
    "You are M-KOPA's internal Knowledge Agent. Your role is to answer questions "
    "about M-KOPA's policies, processes, and organisational knowledge using the "
    "retrieved context provided to you.\n\n"
    "Rules:\n"
    "1. ONLY answer based on the retrieved context. Never fabricate information.\n"
    "2. If the context doesn't contain the answer, say so clearly.\n"
    "3. Always cite the source document and section.\n"
    "4. For policy questions, quote the relevant text directly.\n"
    "5. If the question is ambiguous, ask for clarification.\n"
)


from ..utils import load_json_data

def _load_fallback_data() -> list[dict[str, Any]]:
    return load_json_data("knowledge_fallback.json", default=[])


class KnowledgeAgent(BaseAgent):
    """RAG-powered agent for internal knowledge retrieval."""

    name = "knowledge"
    description = "Search and answer questions from M-KOPA's internal knowledge base"
    capabilities = ["knowledge_search", "policy_lookup", "faq_answer", "document_summary"]

    def __init__(self, vectorstore: Any = None) -> None:
        super().__init__()
        self.vectorstore = vectorstore
        self._client: AsyncAnthropic | None = None

    @property
    def client(self) -> AsyncAnthropic:
        if self._client is None:
            self._client = AsyncAnthropic(api_key=settings.anthropic_api_key)
        return self._client

    async def execute(self, task: AgentTask) -> AgentResult:
        query = task.query
        collection = task.parameters.get("collection")
        top_k = task.parameters.get("top_k", 5)

        retrieved_chunks = await self._retrieve(query, collection, top_k)
        context = self._build_context(retrieved_chunks)
        answer, tokens = await self._generate(query, context)

        sources = [
            {
                "title": chunk.get("title", "Unknown"),
                "section": chunk.get("section", ""),
                "relevance_score": chunk.get("score", 0.0),
                "source": chunk.get("source", ""),
            }
            for chunk in retrieved_chunks
        ]

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=answer,
            data={"chunks_retrieved": len(retrieved_chunks), "collection": collection},
            actions_taken=[f"searched_knowledge_base(top_k={top_k})"],
            tokens_used=tokens,
            confidence=0.9 if retrieved_chunks else 0.3,
            sources=sources,
        )

    async def _retrieve(self, query: str, collection: str | None, top_k: int) -> list[dict[str, Any]]:
        if self.vectorstore is None:
            return _load_fallback_data()
        return await self.vectorstore.search(query=query, collection=collection, top_k=top_k)

    def _build_context(self, chunks: list[dict[str, Any]]) -> str:
        if not chunks:
            return "No relevant documents found in the knowledge base."

        parts = []
        for i, chunk in enumerate(chunks, 1):
            parts.append(
                f"--- Document {i} ---\n{chunk.get('content', '')}\n"
                f"Source: {chunk.get('title', 'Unknown')} | Section: {chunk.get('section', 'N/A')}\n"
            )
        return "\n".join(parts)

    async def _generate(self, query: str, context: str) -> tuple[str, int]:
        if not settings.anthropic_api_key:
            return (
                f"Based on M-KOPA internal documentation:\n\n{context}\n\n"
                "(Set ANTHROPIC_API_KEY in .env for AI synthesis)",
                0,
            )

        user_message = f"Context (retrieved from internal documents):\n{context}\n\nQuestion: {query}"
        try:
            response = await self.client.messages.create(
                model=settings.anthropic_model,
                max_tokens=1024,
                system=KNOWLEDGE_SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_message}],
            )
            answer = response.content[0].text
            tokens = response.usage.input_tokens + response.usage.output_tokens
            return answer, tokens
        except Exception as exc:
            return f"Error generating answer: {exc}", 0
