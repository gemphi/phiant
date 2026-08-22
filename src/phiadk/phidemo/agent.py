"""Phidemo Agent implementation."""

from __future__ import annotations

from typing import Any, Dict

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.phidemo.card import PHIDEMO_CARD
from phiadk.phidemo.verbs import PhidemoVerb


class PhidemoAgent(PhiAgent):
    """The Phidemo Domain Agent."""

    agent_id = "phidemo"
    agent_name = "Phidemo"
    domain = "demo"
    layer = AgentLayer.APPLICATION
    description = "Custom generated domain agent"
    version = "1.5.0"
    card = PHIDEMO_CARD

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", "demo_action")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "demo_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb
        params = ctx.parameters
        ctx.results["output"] = {
            "status": "executed",
            "agent_id": self.agent_id,
            "verb": verb,
            "params": params,
        }
        ctx.confidence = 1.0
        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        ctx.confidence = max(ctx.confidence, 0.95)
        ctx.results["eval"] = {"status": "valid", "confidence": ctx.confidence}
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        return ctx
