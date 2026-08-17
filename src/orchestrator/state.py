"""State definitions for the Orchestrator."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone

from ..agents.base_agent import AgentResult, Priority


from ..agents.docs_agent import DocsAgent



print(DocsAgent.capabilities)


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
