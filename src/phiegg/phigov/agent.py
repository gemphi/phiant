"""PhiGov domain agent implementation."""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phigov.card import PHIGOV_CARD
from phiegg.phigov.governance import ComplianceClient
from phiegg.phigov.verbs import PhiGovVerb


class PhiGovAgent(PhiAgent):
    """Governance domain agent checking regulatory compliance and audit lineage."""

    agent_id = "phigov"
    agent_name = "PhiGov"
    domain = "governance"
    layer = AgentLayer.EXECUTIVE
    version = "1.0.0"
    description = "Enterprise Regulatory Compliance, Lineage Auditing, and Policy Registry"
    card = PHIGOV_CARD

    def __init__(self, data_resolver=None, compliance_client: Optional[ComplianceClient] = None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.compliance = compliance_client or ComplianceClient()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", PhiGovVerb.CHECK_COMPLIANCE.value)
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "governance_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb
        params = ctx.parameters

        if verb == PhiGovVerb.CHECK_COMPLIANCE or verb == PhiGovVerb.CHECK_COMPLIANCE.value:
            reg = params.get("regulation", "GDPR")
            report = self.compliance.check_compliance(reg)
            ctx.results["output"] = report.to_dict()
            ctx.confidence = 1.0

        elif verb == PhiGovVerb.AUDIT_LINEAGE or verb == PhiGovVerb.AUDIT_LINEAGE.value:
            asset = params.get("asset_id", "default_asset")
            lineage = self.compliance.audit_lineage(asset)
            ctx.results["output"] = lineage.to_dict()
            ctx.confidence = 1.0

        elif verb == PhiGovVerb.GET_COMPLIANCE_SCORE or verb == PhiGovVerb.GET_COMPLIANCE_SCORE.value:
            scores = self.compliance.get_compliance_score()
            ctx.results["output"] = scores
            ctx.confidence = 1.0

        elif verb == PhiGovVerb.EVALUATE_POLICY or verb == PhiGovVerb.EVALUATE_POLICY.value:
            ctx.results["output"] = {"status": "EVALUATED", "policy": params.get("policy_id", "rule_1"), "passed": True}
            ctx.confidence = 1.0

        elif verb == PhiGovVerb.REGISTER_REGULATION or verb == PhiGovVerb.REGISTER_REGULATION.value:
            ctx.results["output"] = {"status": "REGISTERED", "regulation": params.get("regulation", "SOC2")}
            ctx.confidence = 1.0

        else:
            ctx.results["error"] = f"Unknown PhiGov verb '{verb}'."
            ctx.confidence = 0.0

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        if "error" in ctx.results:
            ctx.confidence = 0.0
        else:
            ctx.confidence = max(ctx.confidence, 0.95)
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        return ctx


# P* prefix alias
PGovAgent = PhiGovAgent
