"""Base agent contract for all Phient agents."""

from __future__ import annotations

import time
import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal

from tenacity import retry, stop_after_attempt, wait_exponential


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


class BaseAgent(ABC):
    """Abstract base class for all Phient agents.

    Provides common lifecycle management, error handling, metrics collection,
    and retry logic. All agents must implement the `execute` method.
    """

    name: str = "base"
    description: str = "Base agent"
    capabilities: list[str] = []
    required_permissions: list[str] = []
    max_retries: int = 3
    timeout_seconds: int = 30

    def __init__(self) -> None:
        self._request_count = 0
        self._error_count = 0
        self._total_duration_ms = 0

    @abstractmethod
    async def execute(self, task: AgentTask) -> AgentResult:
        """Execute the agent's primary function.

        Args:
            task: The task to execute.

        Returns:
            AgentResult with the execution outcome.
        """

    async def validate_input(self, task: AgentTask) -> bool:
        """Validate task input before execution. Override in subclasses."""
        if not task.query.strip():
            return False
        return True

    async def on_error(self, error: Exception, task: AgentTask) -> AgentResult:
        """Error handler with fallback logic. Override for custom error handling."""
        self._error_count += 1
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="error",
            output=f"Agent '{self.name}' encountered an error: {error}",
            data={"error_type": type(error).__name__, "error_message": str(error)},
        )

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        reraise=True,
    )
    async def run(self, task: AgentTask) -> AgentResult:
        """Run the agent with validation, timing, and error handling.

        This is the main entry point for agent execution. It wraps `execute`
        with input validation, timing, retry logic, and metrics collection.
        """
        # Validate input
        if not await self.validate_input(task):
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output="Invalid input: query cannot be empty.",
            )

        start_time = time.monotonic()
        try:
            result = await self.execute(task)
            elapsed_ms = int((time.monotonic() - start_time) * 1000)
            result.duration_ms = elapsed_ms

            # Update metrics
            self._request_count += 1
            self._total_duration_ms += elapsed_ms

            return result

        except Exception as exc:
            elapsed_ms = int((time.monotonic() - start_time) * 1000)
            result = await self.on_error(exc, task)
            result.duration_ms = elapsed_ms
            return result

    @property
    def health(self) -> dict[str, Any]:
        """Return agent health metrics."""
        avg_duration = (
            self._total_duration_ms / self._request_count if self._request_count > 0 else 0
        )
        error_rate = (
            self._error_count / self._request_count if self._request_count > 0 else 0.0
        )
        return {
            "name": self.name,
            "status": "healthy" if error_rate < 0.1 else "degraded",
            "requests_total": self._request_count,
            "errors_total": self._error_count,
            "error_rate": round(error_rate, 3),
            "avg_duration_ms": round(avg_duration, 1),
        }

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} name='{self.name}'>"
