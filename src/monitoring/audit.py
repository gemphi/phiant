"""Audit Logger - Compliance audit trail for all agent actions.

Logs every agent action to SQLite with PII redaction, providing a
complete audit trail for compliance and debugging.
"""

from __future__ import annotations

import json
import logging
import re
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from ..config import settings

logger = logging.getLogger(__name__)


# PII redaction patterns
PII_PATTERNS = [
    (re.compile(r"([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"), r"\1[at]\2"),
    (re.compile(r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b"), "***-***-****"),
    (re.compile(r"sk-ant-[a-zA-Z0-9-]+"), "sk-***"),
    (re.compile(r"ntn_[a-zA-Z0-9]+"), "ntn_***"),
]


@dataclass
class AuditEvent:
    """A single audit event."""

    event_type: str
    agent_name: str
    action: str
    user_id: str
    request_id: str
    parameters: dict[str, Any]
    result_status: str
    result_summary: str
    duration_ms: int = 0
    tokens_used: int = 0
    metadata: dict[str, Any] | None = None


class AuditLogger:
    """SQLite-backed audit logger with PII redaction.

    Records all agent actions for compliance auditing and debugging.
    Automatically redacts PII from logged parameters.
    """

    def __init__(self, db_path: str | None = None) -> None:
        self._db_path = db_path or settings.audit_db_path
        self._ensure_db()

    def _ensure_db(self) -> None:
        """Create the audit database and table if they don't exist."""
        Path(self._db_path).parent.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(self._db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS audit_log (
                    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    event_type TEXT NOT NULL,
                    agent_name TEXT,
                    action TEXT NOT NULL,
                    user_id TEXT NOT NULL,
                    request_id TEXT,
                    parameters TEXT,
                    result_status TEXT NOT NULL,
                    result_summary TEXT,
                    duration_ms INTEGER,
                    tokens_used INTEGER,
                    metadata TEXT
                )
            """)
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_log(timestamp)"
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log(user_id)"
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_audit_agent ON audit_log(agent_name)"
            )
        logger.info("Audit database initialized at %s", self._db_path)

    def log(self, event: AuditEvent) -> None:
        """Log an audit event."""
        timestamp = datetime.now(timezone.utc).isoformat()
        params_json = json.dumps(self._redact_pii(event.parameters))
        meta_json = json.dumps(event.metadata) if event.metadata else None

        with sqlite3.connect(self._db_path) as conn:
            conn.execute(
                """
                INSERT INTO audit_log
                    (timestamp, event_type, agent_name, action, user_id,
                     request_id, parameters, result_status, result_summary,
                     duration_ms, tokens_used, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    timestamp,
                    event.event_type,
                    event.agent_name,
                    event.action,
                    event.user_id,
                    event.request_id,
                    params_json,
                    event.result_status,
                    event.result_summary,
                    event.duration_ms,
                    event.tokens_used,
                    meta_json,
                ),
            )

    def query(
        self,
        agent_name: str | None = None,
        user_id: str | None = None,
        limit: int = 50,
        offset: int = 0,
    ) -> list[dict[str, Any]]:
        """Query audit log with optional filters."""
        conditions = []
        params: list[Any] = []

        if agent_name:
            conditions.append("agent_name = ?")
            params.append(agent_name)
        if user_id:
            conditions.append("user_id = ?")
            params.append(user_id)

        where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""

        with sqlite3.connect(self._db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                f"""
                SELECT * FROM audit_log
                {where_clause}
                ORDER BY timestamp DESC
                LIMIT ? OFFSET ?
                """,
                params + [limit, offset],
            )
            return [dict(row) for row in cursor.fetchall()]

    def get_stats(self) -> dict[str, Any]:
        """Get audit log statistics."""
        with sqlite3.connect(self._db_path) as conn:
            total = conn.execute("SELECT COUNT(*) FROM audit_log").fetchone()[0]
            by_agent = dict(
                conn.execute(
                    "SELECT agent_name, COUNT(*) FROM audit_log GROUP BY agent_name"
                ).fetchall()
            )
            by_status = dict(
                conn.execute(
                    "SELECT result_status, COUNT(*) FROM audit_log GROUP BY result_status"
                ).fetchall()
            )
        return {
            "total_events": total,
            "by_agent": by_agent,
            "by_status": by_status,
        }

    @staticmethod
    def _redact_pii(data: dict[str, Any]) -> dict[str, Any]:
        """Redact PII from a dictionary."""
        redacted = {}
        for key, value in data.items():
            if isinstance(value, str):
                for pattern, replacement in PII_PATTERNS:
                    value = pattern.sub(replacement, value)
            elif isinstance(value, dict):
                value = AuditLogger._redact_pii(value)
            redacted[key] = value
        return redacted
