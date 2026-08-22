"""PhiLog Structured Logger and Telemetry Sink."""

from __future__ import annotations

import logging
from typing import Any, Callable, Dict, List, Optional

from phiegg.philog.models import AuditEntry, LogLevel, LogRecord

logger = logging.getLogger(__name__)


class StructuredLogger:
    """In-memory and sink-capable structured telemetry engine."""

    def __init__(self, max_buffer_size: int = 1000) -> None:
        self._buffer: List[LogRecord] = []
        self._audits: List[AuditEntry] = []
        self._max_buffer = max_buffer_size

    def log(
        self,
        level: LogLevel,
        message: str,
        *,
        agent_id: str = "system",
        trace_id: Optional[str] = None,
        **details: Any,
    ) -> LogRecord:
        """Emit a structured log entry."""
        record = LogRecord(
            level=level,
            message=message,
            agent_id=agent_id,
            details=details,
        )
        if trace_id:
            record.trace_id = trace_id

        self._buffer.append(record)
        if len(self._buffer) > self._max_buffer:
            self._buffer.pop(0)

        # Standard python logger forwarding
        py_lvl = getattr(logging, level.value, logging.INFO)
        logger.log(py_lvl, "[%s] %s %s", agent_id, message, details or "")
        return record

    def debug(self, msg: str, **kwargs: Any) -> LogRecord:
        return self.log(LogLevel.DEBUG, msg, **kwargs)

    def info(self, msg: str, **kwargs: Any) -> LogRecord:
        return self.log(LogLevel.INFO, msg, **kwargs)

    def warn(self, msg: str, **kwargs: Any) -> LogRecord:
        return self.log(LogLevel.WARN, msg, **kwargs)

    def error(self, msg: str, **kwargs: Any) -> LogRecord:
        return self.log(LogLevel.ERROR, msg, **kwargs)

    def record_audit(
        self,
        action: str,
        *,
        agent_id: str,
        target: str,
        commit_sha1: str = "",
        status: str = "success",
        **metadata: Any,
    ) -> AuditEntry:
        """Record an immutable audit trail entry."""
        entry = AuditEntry(
            action=action,
            agent_id=agent_id,
            target=target,
            commit_sha1=commit_sha1,
            status=status,
            metadata=metadata,
        )
        self._audits.append(entry)
        return entry

    def query(
        self,
        *,
        agent_id: Optional[str] = None,
        level: Optional[LogLevel] = None,
        predicate: Optional[Callable[[LogRecord], bool]] = None,
    ) -> List[LogRecord]:
        """Search and filter buffered telemetry."""
        results = self._buffer
        if agent_id:
            results = [r for r in results if r.agent_id == agent_id]
        if level:
            results = [r for r in results if r.level == level]
        if predicate:
            results = [r for r in results if predicate(r)]
        return results

    def tail(self, n: int = 10) -> List[LogRecord]:
        """Return the most recent N log entries."""
        return self._buffer[-n:]

    def count(self) -> int:
        """Total buffered log count."""
        return len(self._buffer)

    def export(self) -> List[Dict[str, Any]]:
        """Export all logs to dictionary format."""
        return [r.to_dict() for r in self._buffer]
