"""{{agent_name}} Agent implementation."""

from __future__ import annotations

from typing import Any, Dict

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.{{agent_id}}.card import {{card_name}}
from phiegg.{{agent_id}}.verbs import {{agent_name}}Verb


class {{class_name}}(PhiAgent):
    """The {{agent_name}} Domain Agent."""

    agent_id = "{{agent_id}}"
    agent_name = "{{agent_name}}"
    domain = "{{domain}}"
    layer = AgentLayer.{{layer_upper}}
    description = "{{description}}"
    version = "{{version}}"
    card = {{card_name}}

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", "{{first_verb}}")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "{{domain}}_space",
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
