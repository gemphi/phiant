# Monitoring Specification

## 1. Overview

Comprehensive monitoring, metrics collection, and audit logging for the M-KOPA Agent Ecosystem. Provides observability into agent performance, cost tracking, and compliance audit trails.

## 2. Metrics

### Agent Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `agent_requests_total` | Counter | `agent, status` | Total requests per agent |
| `agent_request_duration_ms` | Histogram | `agent` | Request duration distribution |
| `agent_tokens_used_total` | Counter | `agent, model` | Total tokens consumed |
| `agent_errors_total` | Counter | `agent, error_type` | Error count by type |
| `agent_active_requests` | Gauge | `agent` | Currently executing requests |
| `agent_queue_depth` | Gauge | `priority` | Queued requests by priority |

### RAG Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `rag_retrieval_duration_ms` | Histogram | `collection` | Retrieval latency |
| `rag_documents_total` | Gauge | `collection` | Total documents ingested |
| `rag_chunks_total` | Gauge | `collection` | Total chunks in vector store |
| `rag_retrieval_score` | Histogram | `collection` | Relevance score distribution |
| `rag_sync_duration_ms` | Histogram | `source` | Sync operation duration |

### Connector Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `connector_requests_total` | Counter | `connector, status` | API call count |
| `connector_latency_ms` | Histogram | `connector` | API call latency |
| `connector_errors_total` | Counter | `connector, error_type` | Error count |
| `connector_circuit_state` | Gauge | `connector` | Circuit breaker state |

### Cost Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `llm_cost_usd` | Counter | `model, agent` | Estimated LLM cost |
| `llm_input_tokens` | Counter | `model` | Input tokens (for cost calc) |
| `llm_output_tokens` | Counter | `model` | Output tokens (for cost calc) |

## 3. Audit Logging

### Audit Event Schema

```python
@dataclass
class AuditEvent:
    event_id: str              # UUID
    timestamp: datetime        # UTC
    event_type: str            # "agent_execution", "connector_call", "admin_action"
    agent_name: str            # Which agent
    action: str                # "search_knowledge", "create_user", etc.
    user_id: str               # Who requested
    request_id: str            # Correlation ID
    parameters: dict           # Input parameters (PII redacted)
    result_status: str         # "success", "error", "denied"
    result_summary: str        # Brief description of outcome
    duration_ms: int           # Execution time
    tokens_used: int           # Token consumption
    ip_address: str            # Client IP
    metadata: dict             # Additional context
```

### Audit Storage

```sql
CREATE TABLE audit_log (
    event_id TEXT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    event_type TEXT NOT NULL,
    agent_name TEXT,
    action TEXT NOT NULL,
    user_id TEXT NOT NULL,
    request_id TEXT,
    parameters TEXT,           -- JSON, PII redacted
    result_status TEXT NOT NULL,
    result_summary TEXT,
    duration_ms INTEGER,
    tokens_used INTEGER,
    ip_address TEXT,
    metadata TEXT               -- JSON
);

CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_agent ON audit_log(agent_name);
CREATE INDEX idx_audit_request ON audit_log(request_id);
```

### PII Redaction Rules

| Field | Redaction | Example |
|-------|-----------|---------|
| Email | Partial mask | `j***@phiant.com` |
| Phone | Full mask | `***-***-****` |
| ID numbers | Full mask | `****` |
| Names in params | Preserved (not PII in context) | "Jane Doe" |
| API keys | Full mask | `sk-***` |

### Retention

- **Hot**: 30 days in SQLite/PostgreSQL
- **Warm**: 90 days in compressed archives
- **Cold**: 1 year in compliance archive
- **Deletion**: After retention period, per data policy

## 4. Alerting

### Alert Rules

| Alert | Condition | Severity | Channel |
|-------|-----------|----------|---------|
| Agent Down | Agent health check fails 3x | Critical | Slack + Email |
| High Error Rate | Error rate > 10% (5 min window) | Warning | Slack |
| Slow Response | P95 latency > 10s | Warning | Slack |
| Connector Down | Circuit breaker opens | Critical | Slack + Email |
| High Token Usage | Daily tokens > 500k | Info | Email |
| Queue Backlog | Queue depth > 50 | Warning | Slack |

### Alert Schema

```python
@dataclass
class Alert:
    alert_id: str
    severity: Literal["info", "warning", "critical"]
    title: str
    message: str
    source: str                # "agent", "connector", "system"
    triggered_at: datetime
    resolved_at: datetime | None
    acknowledged_by: str | None
```

## 5. Health Checks

### System Health Endpoint

```
GET /api/v1/health

Response:
{
  "status": "healthy",        // "healthy", "degraded", "unhealthy"
  "checks": {
    "api": "pass",
    "llm": "pass",
    "vectorstore": "pass",
    "audit_db": "pass",
    "entra": "pass",
    "notion": "pass",
    "hibob": "warn"           // degraded but functional
  },
  "uptime": "3d 14h 22m",
  "version": "1.0.0"
}
```
