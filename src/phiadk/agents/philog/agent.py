"""PhiLog Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.philog.card import PHILOG_CARD
from phiadk.agents.philog.logger import StructuredLogger
from phiadk.agents.philog.models import LogLevel
from phiadk.agents.philog.verbs import PhiLogVerb


class PhiLogAgent(PhiAgent):
    """The PhiLog Observability & Telemetry Agent."""

    agent_id = "philog"
    agent_name = "PhiLog"
    domain = "telemetry"
    layer = AgentLayer.INFRASTRUCTURE
    version = "1.0.0"
    description = "Distributed telemetry - structured logging, audit trails, query filtering, and real-time streaming."
    card = PHILOG_CARD

    def __init__(self, data_resolver=None, logger: Optional[StructuredLogger] = None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.logger = logger or StructuredLogger()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine logging action."""
        verb = ctx.verb or ctx.parameters.get("verb", "log")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "telemetry_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute log recording, query, or audit."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiLogVerb.LOG, PhiLogVerb.INFO, PhiLogVerb.WARN, PhiLogVerb.ERROR, PhiLogVerb.DEBUG):
            lvl_str = params.get("level", verb.upper() if verb != PhiLogVerb.LOG else "INFO")
            try:
                level = LogLevel(lvl_str)
            except Exception:
                level = LogLevel.INFO
            msg = params.get("message", params.get("msg", ""))
            agent_id = params.get("agent_id", "system")
            details = {k: v for k, v in params.items() if k not in ("verb", "level", "message", "msg", "agent_id")}
            rec = self.logger.log(level, msg, agent_id=agent_id, **details)
            ctx.results["output"] = rec.to_dict()
        elif verb == PhiLogVerb.TAIL:
            n = params.get("n", 10)
            records = self.logger.tail(n=n)
            ctx.results["output"] = [r.to_dict() for r in records]
        elif verb == PhiLogVerb.QUERY:
            agent_filter = params.get("agent_id")
            lvl_filter = LogLevel(params["level"]) if "level" in params else None
            records = self.logger.query(agent_id=agent_filter, level=lvl_filter)
            ctx.results["output"] = [r.to_dict() for r in records]
        elif verb == PhiLogVerb.COUNT:
            ctx.results["output"] = {"count": self.logger.count()}
        elif verb == PhiLogVerb.RECORD_AUDIT:
            action = params.get("action", "")
            agent_id = params.get("agent_id", "")
            target = params.get("target", "")
            commit = params.get("commit_sha1", "")
            audit = self.logger.record_audit(action, agent_id=agent_id, target=target, commit_sha1=commit)
            ctx.results["output"] = audit.base_dict() | {
                "audit_id": audit.audit_id,
                "action": audit.action,
                "target": audit.target,
            }
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify log recording."""
        output = ctx.results.get("output")
        ctx.confidence = 1.0 if output is not None else 0.0
        ctx.results["eval"] = {
            "status": "valid",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or scale."""
        return ctx

    def tail(self, n: int = 10):
        """Retrieve the last N telemetry records."""
        return self.logger.tail(n=n)

    def emit(self, event: str, actor: str = "system", details: Optional[Dict[str, Any]] = None):
        """Emit an audit event record."""
        return self.logger.record_audit(action=event, agent_id=actor, target=str(details or {}))

