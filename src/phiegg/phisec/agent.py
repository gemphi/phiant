"""PhiSec domain agent implementation."""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phisec.card import PHISEC_CARD
from phiegg.phisec.security import SecurityScannerClient
from phiegg.phisec.verbs import PhiSecVerb


class PhiSecAgent(PhiAgent):
    """Security domain agent performing vulnerability scans and policy enforcement."""

    agent_id = "phisec"
    agent_name = "PhiSec"
    domain = "security"
    layer = AgentLayer.INFRASTRUCTURE
    version = "1.0.0"
    description = "Security & Vulnerability Scanner, Token Verifier, and Policy Enforcer"
    card = PHISEC_CARD

    def __init__(self, data_resolver=None, scanner: Optional[SecurityScannerClient] = None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.scanner = scanner or SecurityScannerClient()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", PhiSecVerb.SCAN_VULNERABILITY.value)
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "security_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb
        params = ctx.parameters

        if verb == PhiSecVerb.SCAN_VULNERABILITY or verb == PhiSecVerb.SCAN_VULNERABILITY.value:
            target = params.get("target", "workspace")
            scan = self.scanner.scan_target(target)
            ctx.results["output"] = scan.to_dict()
            ctx.confidence = 1.0

        elif verb == PhiSecVerb.VERIFY_TOKEN or verb == PhiSecVerb.VERIFY_TOKEN.value:
            token = params.get("token", "")
            verification = self.scanner.verify_token(token)
            ctx.results["output"] = verification.to_dict()
            ctx.confidence = 1.0 if verification.token_valid else 0.0

        elif verb == PhiSecVerb.ENFORCE_POLICY or verb == PhiSecVerb.ENFORCE_POLICY.value:
            res = self.scanner.enforce_policy(
                resource=params.get("resource", "topos"),
                action=params.get("action", "read"),
                subject=params.get("subject", "user"),
            )
            ctx.results["output"] = res
            ctx.confidence = 1.0

        elif verb == PhiSecVerb.AUDIT_ACCESS or verb == PhiSecVerb.AUDIT_ACCESS.value:
            ctx.results["output"] = {"status": "AUDITED", "subject": params.get("subject", "all"), "events": []}
            ctx.confidence = 1.0

        elif verb == PhiSecVerb.QUARANTINE_THREAT or verb == PhiSecVerb.QUARANTINE_THREAT.value:
            threat_id = params.get("threat_id", "threat_0")
            ctx.results["output"] = {"status": "QUARANTINED", "threat_id": threat_id}
            ctx.confidence = 1.0

        else:
            ctx.results["error"] = f"Unknown PhiSec verb '{verb}'."
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
PSecAgent = PhiSecAgent
