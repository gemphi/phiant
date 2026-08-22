"""PhiLog domain models — structured telemetry and audit records."""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional

from phiadk._core.model_base import ModelBase
from phiadk._core.topology import Node, SimplexType


class LogLevel(str, Enum):
    """Log severity levels."""

    DEBUG = "DEBUG"
    INFO = "INFO"
    WARN = "WARN"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


@dataclass
class LogRecord(Node, ModelBase):
    """A structured log entry node."""

    _model_type: str = "log_record"
    level: LogLevel = LogLevel.INFO
    message: str = ""
    agent_id: str = "system"
    trace_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    details: Dict[str, Any] = field(default_factory=dict)
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self):
        self.node_type = "log_record"
        self.simplex = SimplexType.POINT

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "level": self.level.value if isinstance(self.level, LogLevel) else str(self.level),
            "message": self.message,
            "agent_id": self.agent_id,
            "trace_id": self.trace_id,
            "details": self.details,
            "timestamp": self.timestamp.isoformat(),
        })
        return base


@dataclass
class AuditEntry(ModelBase):
    """An immutable audit trail record for state/storage mutations."""

    audit_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    action: str = ""
    agent_id: str = ""
    target: str = ""
    commit_sha1: str = ""
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "success"
    metadata: Dict[str, Any] = field(default_factory=dict)
