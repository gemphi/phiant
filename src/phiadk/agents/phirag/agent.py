"""PhiRAG Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.phirag.card import PHIRAG_CARD
from phiadk.agents.phirag.retrieval import GenerationClient, RetrievalClient
from phiadk.agents.phirag.verbs import PhiRAGVerb


class PhiRAGAgent(PhiAgent):
    """The PhiRAG Knowledge Retrieval & Augmentation Agent."""

    agent_id = "phirag"
    agent_name = "PhiRAG"
    domain = "knowledge_rag"
    layer = AgentLayer.DATA
    description = "Knowledge retrieval, semantic vector search, and context augmentation."
    card = PHIRAG_CARD

    def __init__(self, vectorstore=None, llm_client=None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.retrieval = RetrievalClient(vectorstore=vectorstore, data_resolver=self._data_resolver)
        self.generation = GenerationClient(llm_client=llm_client)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine RAG strategy."""
        verb = ctx.verb or ctx.parameters.get("verb", "answer_query")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "knowledge_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute retrieval and generation morphisms."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiRAGVerb.RETRIEVE, PhiRAGVerb.SEARCH):
            query = params.get("query", "")
            top_k = params.get("top_k", 5)
            collection = params.get("collection")
            chunks = await self.retrieval.retrieve(query, top_k=top_k, collection=collection)
            ctx.results["output"] = chunks
        elif verb == PhiRAGVerb.GENERATE_ANSWER:
            query = params.get("query", "")
            context = params.get("context", [])
            morphism = await self.generation.generate(query, context)
            ctx.results["output"] = morphism.to_dict()
        elif verb in (PhiRAGVerb.ANSWER_QUERY, PhiRAGVerb.GENERATE):
            query = params.get("query", "")
            top_k = params.get("top_k", 5)
            collection = params.get("collection")
            chunks = await self.retrieval.retrieve(query, top_k=top_k, collection=collection)
            morphism = await self.generation.generate(query, chunks)
            ctx.results["output"] = {
                "answer": morphism.result.get("answer", "") if morphism.result else "",
                "sources": chunks,
                "morphism": morphism.to_dict(),
            }
        elif verb == PhiRAGVerb.INDEX:
            text = params.get("text", "")
            doc_id = params.get("document_id", "doc")
            chunks = self.retrieval.chunk_document(text, doc_id=doc_id)
            ctx.results["output"] = [c.to_dict() for c in chunks]
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Assess relevance and groundness of retrieved sources."""
        output = ctx.results.get("output", {})
        has_content = bool(output)
        ctx.confidence = 0.9 if has_content else 0.2
        ctx.results["eval"] = {
            "status": "grounded" if has_content else "no_sources",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Fall back to broader query or lower threshold if no sources."""
        if ctx.confidence < 0.5 and ctx.verb == "answer_query" and ctx.depth < ctx.max_depth:
            # Broaden query search
            child = ctx.descend(new_verb="retrieve")
            child.parameters["query"] = ctx.parameters.get("query", "")
            child.parameters["top_k"] = 10
            child = await self.run(child)
            ctx.results["fallback_sources"] = child.results.get("output")
        return ctx
