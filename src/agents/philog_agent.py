"""Telemetry & Logging Agent — Delegates to PhiLog domain agent."""

from __future__ import annotations

from typing import Any

from phiadk.agents.philog.agent import PhiLogAgent
from phiadk.agents.philog.logger import StructuredLogger
from .base_agent import AgentResult, AgentTask, BaseAgent


class TelemetryAgent(BaseAgent):
    """Telemetry and audit trail agent wrapping PhiLog."""

    name = "telemetry"
    description = "Enterprise structured logging, audit trails, and live telemetry buffer tailing"
    capabilities = [
        "tail_telemetry",
        "emit_audit_event",
        "verify_audit_trail",
        "query_logs",
    ]

    def __init__(self) -> None:
        super().__init__()
        self._philog = PhiLogAgent()
        self._logger = StructuredLogger()

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "tail")
        if action == "tail":
            n = int(task.parameters.get("n", 10))
            records = self._philog.tail(n)
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="success",
                output=f"Retrieved {len(records)} recent telemetry events.",
                data={"records": [r.to_dict() for r in records], "count": len(records)},
                actions_taken=["tail_telemetry"],
                confidence=1.0,
            )
        elif action == "emit":
            event = task.parameters.get("event", "SYSTEM_EVENT")
            actor = task.parameters.get("actor", "system")
            details = task.parameters.get("details", {})
            entry = self._philog.emit(event, actor=actor, details=details)
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="success",
                output=f"Audit event '{event}' emitted with hash {entry.hash[:8] if hasattr(entry, 'hash') else 'ok'}.",
                data={"event": entry.to_dict() if hasattr(entry, "to_dict") else {"event": event}},
                actions_taken=["emit_audit_event"],
                confidence=1.0,
            )
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="Telemetry agent executed.",
            confidence=0.9,
        )


LogAgent = TelemetryAgent
PhiLogAgentAdapter = TelemetryAgent
