"""PhiDoc Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phidoc.card import PHIDOC_CARD
from phiegg.phidoc.docs import PageClient, SearchClient
from phiegg.phidoc.verbs import PhiDocVerb


class PhiDocAgent(PhiAgent):
    """The PhiDoc Documentation Agent."""

    agent_id = "phidoc"
    agent_name = "PhiDoc"
    domain = "documentation"
    layer = AgentLayer.APPLICATION
    description = "Documentation search, Notion workspace sync, and page generation."
    card = PHIDOC_CARD

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.search = SearchClient(data_resolver=self._data_resolver)
        self.page = PageClient()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine documentation operation."""
        verb = ctx.verb or ctx.parameters.get("verb", "search_docs")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "documentation_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute document search or page mutation."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiDocVerb.SEARCH_DOCS, PhiDocVerb.SEARCH_PAGES, PhiDocVerb.SEARCH):
            query = params.get("query", "")
            traversal = await self.search.search(query)
            ctx.results["output"] = traversal.to_dict()
        elif verb == PhiDocVerb.CREATE_PAGE:
            title = params.get("title", "Untitled")
            morphism = await self.page.create(title)
            ctx.results["output"] = morphism.to_dict()
        elif verb == PhiDocVerb.SYNC_KNOWLEDGE_BASE:
            morphism = await self.page.sync()
            ctx.results["output"] = morphism.to_dict()
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify document operation outcome."""
        output = ctx.results.get("output", {})
        ctx.confidence = 0.95 if output else 0.4
        ctx.results["eval"] = {
            "status": "valid" if output else "empty",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or scale."""
        return ctx
