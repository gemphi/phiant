"""PhiOra Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.phiora.card import PHIORA_CARD
from phiadk.agents.phiora.store import ResolverClient, StoreClient, VectorClient
from phiadk.agents.phiora.verbs import PhiOraVerb


class PhiOraAgent(PhiAgent):
    """The PhiOra Data Layer Agent."""

    agent_id = "phiora"
    agent_name = "PhiOra"
    domain = "data_storage"
    layer = AgentLayer.DATA
    description = "Content-addressed key-value storage (git-style SHA-1), vector embeddings, and DataSet resolution."
    card = PHIORA_CARD

    def __init__(self, data_dir: Optional[Path] = None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.store = StoreClient()
        self.resolver = ResolverClient(data_dir=data_dir, store_client=self.store)
        self.vector = VectorClient()
        # Set self._data_resolver to self.resolver if none was passed
        if self._data_resolver is None:
            self._data_resolver = self.resolver

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine data storage action."""
        verb = ctx.verb or ctx.parameters.get("verb", "get_record")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "vector_space" if "vector" in verb else "store_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute data operations."""
        verb = ctx.verb
        params = ctx.parameters

        if verb == PhiOraVerb.PUT_RECORD:
            col = params.get("collection", "default")
            key = params.get("key", "")
            val = params.get("value")
            record = self.store.put(col, key, val)
            ctx.results["output"] = record.to_dict()
        elif verb == PhiOraVerb.GET_RECORD:
            col = params.get("collection", "default")
            key = params.get("key", "")
            record = self.store.get(col, key)
            ctx.results["output"] = record.to_dict() if record else None
        elif verb == PhiOraVerb.LIST_KEYS:
            col = params.get("collection", "default")
            keys = self.store.list_keys(col)
            ctx.results["output"] = keys
        elif verb == PhiOraVerb.SNAPSHOT_COLLECTION:
            col = params.get("collection", "default")
            ds = self.store.snapshot(col)
            ctx.results["output"] = ds.to_dict()
        elif verb == PhiOraVerb.RESOLVE_DATASET:
            source = params.get("source", "")
            data = self.resolver(source)
            ctx.results["output"] = data
        elif verb == PhiOraVerb.INDEX_VECTOR:
            key = params.get("key", "")
            content = params.get("content", "")
            emb = params.get("embedding", [])
            meta = params.get("metadata", {})
            vec_record = self.vector.index(key, content, emb, **meta)
            ctx.results["output"] = vec_record.to_dict()
        elif verb == PhiOraVerb.SEARCH_VECTOR:
            q_emb = params.get("query_embedding", [])
            top_k = params.get("top_k", 5)
            results = self.vector.search(q_emb, top_k=top_k)
            ctx.results["output"] = [r.to_dict() for r in results]
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify record hash integrity or search accuracy."""
        output = ctx.results.get("output")
        ctx.confidence = 1.0 if output is not None else 0.0
        ctx.results["eval"] = {
            "status": "valid" if output is not None else "not_found",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Fall back to file resolution if store record missing."""
        if ctx.results.get("output") is None and ctx.verb == "get_record" and ctx.depth < ctx.max_depth:
            key = ctx.parameters.get("key", "")
            child = ctx.descend(new_verb="resolve_dataset")
            child.parameters["source"] = key
            child = await self.run(child)
            ctx.results["fallback_output"] = child.results.get("output")
        return ctx
