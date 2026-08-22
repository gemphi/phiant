# PhiLog Formal Specification (`spec.md`)

- **Agent ID**: `philog`
- **Agent Name**: `PhiLog`
- **Domain**: `telemetry`
- **Layer**: `AgentLayer.INFRASTRUCTURE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiLogVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `LOG` | `"log"` | `{"level": str, "message": str, ...}` | `LogRecord` dict | Ingest structured log event. |
| `TAIL` | `"tail"` | `{"n": int}` | `List[LogRecord]` | Stream last N log events from ring buffer. |
| `QUERY` | `"query"` | `{"agent_id": str, "level": str}` | `List[LogRecord]` | Filter logs by emitter and severity. |
| `COUNT` | `"count"` | `{}` | `{"count": int}` | Total log events recorded. |
| `RECORD_AUDIT` | `"record_audit"` | `{"action": str, "agent_id": str, "commit_sha1": str}` | `AuditEntry` dict | Immutable audit trail record. |

---

## 2. Supported Tasks (`PhiLogTask`)

- `LOGGING` (`"logging"`)
- `AUDIT_INGESTION` (`"audit_ingestion"`)

---

## 3. Specifications (`PhiLogSpec`)

- `TELEMETRY_OBSERVABILITY_V1` (`"TELEMETRY_OBSERVABILITY_V1"`)
