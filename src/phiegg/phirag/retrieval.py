"""PhiRAG — Knowledge Retrieval & Augmented Generation.

RAG-powered knowledge retrieval with LLM-augmented generation.
Data resolved via phiora — no inline datasets.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from phiegg._core.agent_base import DataSet
from phiegg._core.topology import Morphism, Traversal
from phiegg._core.model_base import ModelBase


class RetrievalClient:
    """Vector-store retrieval over the knowledge space."""

    KB_DATA = DataSet(set_id="knowledge_base", set_type="live", source="knowledge_fallback.json")

    def __init__(self, vectorstore=None, data_resolver=None) -> None:
        self._vectorstore = vectorstore
        self._data_resolver = data_resolver

    async def retrieve(self, query: str, *, top_k: int = 5, collection: str | None = None) -> List[Dict[str, Any]]:
        """Traverse the knowledge space for relevant chunks."""
        if self._vectorstore:
            return await self._vectorstore.search(query=query, collection=collection, top_k=top_k)
        data = self._resolve(self.KB_DATA)
        return data if isinstance(data, list) else []

    def _resolve(self, dataset: DataSet) -> Any:
        if self._data_resolver:
            return self._data_resolver(dataset.source, default=[])
        return []


class GenerationClient:
    """LLM-augmented generation — morphism from context → answer."""

    def __init__(self, llm_client=None) -> None:
        self._llm = llm_client

    async def generate(self, query: str, context: List[Dict[str, Any]]) -> Morphism:
        """Generate an answer — morphism from knowledge_space → answer_space."""
        context_text = "\n".join(
            f"--- {c.get('title', 'Unknown')} ---\n{c.get('content', '')}"
            for c in context
        )

        if self._llm:
            answer = await self._llm.generate(query, context_text)
        else:
            answer = f"Based on {len(context)} sources:\n\n{context_text}"

        morphism = Morphism(
            morphism_type="generate_answer",
            source_space="knowledge_space",
            target_space="answer_space",
            parameters={"query": query, "chunks": len(context)},
        )
        morphism.complete({"answer": answer, "sources": len(context)})
        return morphism
