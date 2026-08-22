"""PhiOne Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phione.card import PHIONE_CARD
from phiegg.phione.employee import EmployeeClient
from phiegg.phione.identity import IdentityClient
from phiegg.phione.leave import LeaveClient
from phiegg.phione.verbs import PhiOneVerb


class PhiOneAgent(PhiAgent):
    """The PhiOne HR & Identity Agent."""

    agent_id = "phione"
    agent_name = "PhiOne"
    domain = "identity_hr"
    layer = AgentLayer.INFRASTRUCTURE
    description = "User identity, SSO, and HR employee space management authority."
    card = PHIONE_CARD

    def __init__(self, entra_connector=None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.employee = EmployeeClient(data_resolver=self._data_resolver)
        self.identity = IdentityClient(entra_connector=entra_connector, data_resolver=self._data_resolver)
        self.leave = LeaveClient(data_resolver=self._data_resolver)

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine target space, verb, and parameters."""
        verb = ctx.verb or ctx.parameters.get("verb", "lookup_employee")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "employee_space" if "employee" in verb or "team" in verb or "headcount" in verb else "identity_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute the morphism or traversal."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiOneVerb.LOOKUP_EMPLOYEE, "employee_lookup"):
            email = params.get("email", "")
            node = await self.employee.lookup(email)
            ctx.results["output"] = node.to_dict()
        elif verb in (PhiOneVerb.TRAVERSE_TEAM, PhiOneVerb.TEAM_REPORT):
            dept = params.get("department", "Engineering")
            traversal = await self.employee.traverse_team(dept)
            ctx.results["output"] = traversal.to_dict()
        elif verb in (PhiOneVerb.HEADCOUNT_REPORT, PhiOneVerb.GET_HEADCOUNT, PhiOneVerb.HEADCOUNT):
            group_by = params.get("group_by", "country")
            traversal = await self.employee.traverse_headcount(group_by)
            ctx.results["output"] = traversal.to_dict()
        elif verb in (PhiOneVerb.ORG_STRUCTURE, PhiOneVerb.ORG_TREE, PhiOneVerb.TRAVERSE_ORG):
            node = await self.employee.traverse_org()
            ctx.results["output"] = node.to_dict()
        elif verb in (PhiOneVerb.LOOKUP_IDENTITY, PhiOneVerb.LOOKUP_USER, "identity_lookup"):
            email = params.get("email", "")
            node = await self.identity.lookup(email)
            ctx.results["output"] = node.to_dict()
        elif verb in (PhiOneVerb.PROVISION_IDENTITY, PhiOneVerb.CREATE_USER):
            user_data = params.get("user_data", params)
            morphism = await self.identity.morph_provision(user_data)
            ctx.results["output"] = morphism.to_dict()
        elif verb in (PhiOneVerb.DISABLE_IDENTITY, PhiOneVerb.DISABLE_USER):
            email = params.get("email", "")
            morphism = await self.identity.morph_disable(email)
            ctx.results["output"] = morphism.to_dict()
        elif verb in (PhiOneVerb.ADD_TO_GROUP, PhiOneVerb.ADD_GROUP_MEMBER):
            email = params.get("email", "")
            group = params.get("group_name", "")
            morphism = await self.identity.morph_add_to_group(email, group)
            ctx.results["output"] = morphism.to_dict()
        elif verb in (PhiOneVerb.REMOVE_FROM_GROUP, PhiOneVerb.REMOVE_GROUP_MEMBER):
            email = params.get("email", "")
            group = params.get("group_name", "")
            morphism = await self.identity.morph_remove_from_group(email, group)
            ctx.results["output"] = morphism.to_dict()
        elif verb == PhiOneVerb.ASSIGN_LICENSE:
            email = params.get("email", "")
            license_name = params.get("license_name", params.get("license", ""))
            morphism = await self.identity.morph_assign_license(email, license_name)
            ctx.results["output"] = morphism.to_dict()
        elif verb in (PhiOneVerb.GET_LEAVE_BALANCE, PhiOneVerb.LEAVE_BALANCE):
            email = params.get("email", "")
            balances = await self.leave.traverse_balance(email)
            ctx.results["output"] = [b.to_dict() for b in balances]
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Assess the quality and correctness of output."""
        output = ctx.results.get("output", {})
        has_error = "error" in output or output.get("status") == "unsupported_verb"
        ctx.confidence = 0.0 if has_error else 0.95
        ctx.results["eval"] = {
            "status": "error" if has_error else "valid",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Scale or conclude."""
        if ctx.confidence < 0.5 and ctx.depth < ctx.max_depth:
            # Fallback iteration: try identity lookup if employee lookup failed
            if ctx.verb == "lookup_employee" and "email" in ctx.parameters:
                child = ctx.descend(new_verb="lookup_identity")
                child = await self.run(child)
                ctx.results["fallback_output"] = child.results.get("output")
        return ctx
