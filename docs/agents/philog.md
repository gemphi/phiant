---
outline: deep
---

# PhiLog

> Distributed telemetry - structured logging, audit trails, query filtering, and real-time log streaming.

| | |
|---|---|
| **ID** | `philog` |
| **Class** | `PhiLogAgent` / `PhiLogClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Infrastructure |
| **Domain** | `telemetry` |
| **File** | `phiadk/philog/` |
| **Schema** | `phiadk/philog/schema.json` |
| **Topology** | `phiadk/philog/topo/topology.mdx` |

## What PhiLog Does

PhiLog is the **observability and telemetry backbone**. Every agent in the ecosystem emits structured log events through PhiLog across 5 severity levels (`DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`), captures state mutation audit entries, and provides real-time streaming queries.

## Tasks & Verbs

### `logging_operations` - Emit Events
| Verb | Description | Parameters |
|------|-------------|------------|
| `log` | Emit structured log record | `level: str, message: str, **details` |
| `tail` | Stream most recent N log entries | `n: int` |

### `query_operations` - Search & Filter
| Verb | Description | Parameters |
|------|-------------|------------|
| `query` | Search logs with agent or level filters | `agent_id: str, level: str` |
| `count` | Count matching entries in buffer | - |

### `audit_operations` - Cryptographic Auditing
| Verb | Description | Parameters |
|------|-------------|------------|
| `record_audit` | Record immutable state mutation audit trail | `action: str, agent_id: str, target: str, commit_sha1: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `TELEMETRY_ARCHIVAL_V1` | Distributed structured logging with query, aggregation, audit trails, and export | `logging_operations`, `query_operations`, `audit_operations` |

## Dependencies

None - PhiLog is a foundational observability primitive.
