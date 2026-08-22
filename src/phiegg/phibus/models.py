"""PBusEvent & Event Bus Models for PhiBus."""

from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional


@dataclass
class PBusEvent:
    """Universal PBusEvent representing an event across the Phient topological ecosystem."""

    topic: str
    payload: Dict[str, Any] = field(default_factory=dict)
    event_id: str = field(default_factory=lambda: f"evt_{uuid.uuid4().hex[:12]}")
    timestamp: float = field(default_factory=time.time)
    source_agent: str = "system"
    commit_sha1: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "event_id": self.event_id,
            "topic": self.topic,
            "payload": self.payload,
            "timestamp": self.timestamp,
            "source_agent": self.source_agent,
            "commit_sha1": self.commit_sha1,
        }

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "PBusEvent":
        return cls(
            event_id=d.get("event_id", f"evt_{uuid.uuid4().hex[:12]}"),
            topic=d.get("topic", "default"),
            payload=d.get("payload", {}),
            timestamp=d.get("timestamp", time.time()),
            source_agent=d.get("source_agent", "system"),
            commit_sha1=d.get("commit_sha1"),
        )
