"""PhiGen Agent Implementation."""

from __future__ import annotations

from typing import Any, Dict, Optional
from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentCard, AgentLayer
from phiadk.agents.phigen.card import PHIGEN_CARD
from phiadk.agents.phigen.tasks import PhiGenTasks
from phiadk.agents.phigen.verbs import VERB_REGISTRY


class PhiGenAgent(PhiAgent):
    """The PhiGen domain agent for code synthesis and parity audits."""

    agent_id = "phigen"
    agent_name = "PhiGen"
    domain = "code_generation"
    layer = AgentLayer.ENGINE
    description = "Code generation, typed schema synthesis, and Palantir parity verification engine."
    version = "1.0.0"
    card = PHIGEN_CARD

    def __init__(self, card: Optional[AgentCard] = None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.card = card or PHIGEN_CARD
        self.tasks = PhiGenTasks(self)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", "generate_types")
        ctx.verb = verb
        ctx.results["plan"] = {"agent": self.agent_id, "target_verb": verb}
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb
        handler = VERB_REGISTRY.get(verb)
        if handler:
            ctx.results["output"] = await handler(ctx.parameters)
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}
        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        ctx.confidence = 0.95
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        return ctx

    def to_dict(self) -> Dict[str, Any]:

        return self.card.to_dict()
