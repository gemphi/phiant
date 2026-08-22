"""PhiBrd Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phibrd.card import PHIBRD_CARD
from phiegg.phibrd.onboarding import OnboardingClient
from phiegg.phibrd.verbs import PhiBrdVerb


class PhiBrdAgent(PhiAgent):
    """The PhiBrd Onboarding Orchestration Agent."""

    agent_id = "phibrd"
    agent_name = "PhiBrd"
    domain = "onboarding"
    layer = AgentLayer.APPLICATION
    description = "Cross-domain onboarding orchestrator across HR, Identity, Docs, and Automation."
    card = PHIBRD_CARD

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.onboarding = OnboardingClient()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine onboarding workflow."""
        verb = ctx.verb or ctx.parameters.get("verb", "onboard_employee")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "onboarding_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute onboarding fiber bundle."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiBrdVerb.ONBOARD_EMPLOYEE, PhiBrdVerb.ONBOARD):
            emp_data = params.get("employee_data", params)
            fiber = await self.onboarding.onboard(emp_data)
            ctx.results["output"] = fiber.to_dict()
            ctx.results["fiber"] = fiber
        elif verb in (PhiBrdVerb.GET_CHECKLIST, PhiBrdVerb.CHECKLIST):
            checklist = await self.onboarding.checklist()
            ctx.results["output"] = checklist
        elif verb in (PhiBrdVerb.GET_STATUS, PhiBrdVerb.STATUS):
            ctx.results["output"] = {"status": "ready"}
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify fiber bundle completion."""
        output = ctx.results.get("output", {})
        status = output.get("status")
        is_ok = status == "completed" or isinstance(output, list)
        ctx.confidence = 1.0 if is_ok else 0.0
        ctx.results["eval"] = {
            "status": "success" if is_ok else "failed",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or escalate."""
        return ctx
