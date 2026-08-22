"""PhiBot Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phibot.card import PHIBOT_CARD
from phiegg.phibot.playbook import PlaybookClient
from phiegg.phibot.verbs import PhiBotVerb


class PhiBotAgent(PhiAgent):
    """The PhiBot Automation Agent."""

    agent_id = "phibot"
    agent_name = "PhiBot"
    domain = "automation"
    layer = AgentLayer.APPLICATION
    description = "Automation engine, playbook orchestration, and repeatable workflow execution."
    card = PHIBOT_CARD

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.playbook = PlaybookClient(data_resolver=self._data_resolver)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine automation playbook or action."""
        verb = ctx.verb or ctx.parameters.get("verb", "list_playbooks")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "playbook_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute playbook discovery or execution morphism."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiBotVerb.LIST_PLAYBOOKS, PhiBotVerb.LIST):
            category = params.get("category")
            traversal = await self.playbook.list(category=category)
            ctx.results["output"] = traversal.to_dict()
        elif verb in (PhiBotVerb.EXECUTE_PLAYBOOK, PhiBotVerb.EXECUTE, PhiBotVerb.RUN_PLAYBOOK):
            pid = params.get("playbook_id", params.get("id", ""))
            morphism = await self.playbook.execute(pid)
            ctx.results["output"] = morphism.to_dict()
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify execution success."""
        output = ctx.results.get("output", {})
        status = output.get("status")
        is_ok = status not in ("failed", "unsupported_verb")
        ctx.confidence = 1.0 if is_ok else 0.0
        ctx.results["eval"] = {
            "status": "success" if is_ok else "failed",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or scale."""
        return ctx
