"""State and Task definitions for the Orchestrator."""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal


class Priority(str, Enum):
    """Request priority levels."""

    P1_CRITICAL = "P1"
    P2_HIGH = "P2"
    P3_STANDARD = "P3"
    P4_LOW = "P4"


@dataclass
class AgentTask:
    """A task submitted to an agent for execution."""

    query: str
    intent: str = ""
    task_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    parameters: dict[str, Any] = field(default_factory=dict)
    context: dict[str, Any] = field(default_factory=dict)
    priority: Priority = Priority.P3_STANDARD
    requested_by: str = "system"
    requested_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class AgentResult:
    """Result returned by an agent after execution."""

    task_id: str
    agent_name: str
    status: Literal["success", "error", "needs_approval", "partial"]
    output: str
    data: dict[str, Any] = field(default_factory=dict)
    actions_taken: list[str] = field(default_factory=list)
    tokens_used: int = 0
    duration_ms: int = 0
    confidence: float = 0.0
    sources: list[dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dictionary."""
        return {
            "task_id": self.task_id,
            "agent_name": self.agent_name,
            "status": self.status,
            "output": self.output,
            "data": self.data,
            "actions_taken": self.actions_taken,
            "tokens_used": self.tokens_used,
            "duration_ms": self.duration_ms,
            "confidence": self.confidence,
            "sources": self.sources,
        }


@dataclass
class OrchestratorState:
    """State object for the orchestration pipeline."""

    request_id: str
    user_query: str
    user_id: str = "anonymous"
    classified_intent: str = ""
    selected_agents: list[str] = field(default_factory=list)
    execution_mode: str = "single"
    priority: Priority = Priority.P3_STANDARD
    agent_results: dict[str, AgentResult] = field(default_factory=dict)
    final_response: str = ""
    status: str = "pending"
    error: str | None = None
    started_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
