# API Specification

## 1. Overview

FastAPI-based REST + WebSocket gateway for the Phient Agent Ecosystem. Provides HTTP endpoints for agent interaction, system monitoring, and admin operations, plus WebSocket for real-time streaming.

## 2. Base Configuration

```
Base URL:     http://localhost:8000
API Prefix:   /api/v1
Docs:         http://localhost:8000/docs (Swagger UI)
WebSocket:    ws://localhost:8000/ws/chat
```

## 3. REST Endpoints

### Agent Interaction

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/chat` | Send message to orchestrator |
| `POST` | `/api/v1/chat/stream` | Streaming chat response (SSE) |
| `GET` | `/api/v1/chat/{session_id}/history` | Get conversation history |
| `DELETE` | `/api/v1/chat/{session_id}` | Clear session |

### Agent Management

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/agents` | List all agents and status |
| `GET` | `/api/v1/agents/{name}` | Get agent details |
| `GET` | `/api/v1/agents/{name}/health` | Agent health check |

### Knowledge Base

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/knowledge/search` | Search knowledge base |
| `POST` | `/api/v1/knowledge/ingest` | Ingest document |
| `GET` | `/api/v1/knowledge/collections` | List collections |
| `GET` | `/api/v1/knowledge/stats` | Collection statistics |
| `POST` | `/api/v1/knowledge/sync` | Trigger Notion sync |

### Automations

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/automations` | List playbooks |
| `POST` | `/api/v1/automations/{id}/run` | Execute playbook |
| `GET` | `/api/v1/automations/{id}/status` | Execution status |

### System

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/health` | System health check |
| `GET` | `/api/v1/metrics` | Prometheus metrics |
| `GET` | `/api/v1/audit/logs` | Audit log query |
| `GET` | `/api/v1/status` | Ecosystem status dashboard data |

## 4. Request/Response Schemas

### Chat Request

```json
{
  "message": "What is Phient's leave policy for Kenya?",
  "session_id": "optional-session-uuid",
  "user_id": "user@phient.com",
  "priority": "standard",
  "metadata": {}
}
```

### Chat Response

```json
{
  "request_id": "uuid",
  "session_id": "uuid",
  "response": "Based on the Kenya Employee Handbook...",
  "agent_used": "knowledge",
  "confidence": 0.92,
  "sources": [
    {
      "title": "Kenya Employee Handbook",
      "section": "Section 4.2 - Leave Policy",
      "relevance_score": 0.95
    }
  ],
  "tokens_used": 1247,
  "duration_ms": 2340,
  "timestamp": "2026-07-24T10:30:00Z"
}
```

### System Status Response

```json
{
  "status": "healthy",
  "uptime_seconds": 86400,
  "agents": {
    "knowledge": { "status": "healthy", "requests_today": 142 },
    "automation": { "status": "healthy", "requests_today": 23 },
    "identity": { "status": "healthy", "requests_today": 67 },
    "hr": { "status": "degraded", "requests_today": 31 },
    "docs": { "status": "healthy", "requests_today": 89 },
    "onboarding": { "status": "healthy", "requests_today": 5 }
  },
  "connectors": {
    "entra": { "status": "healthy", "latency_ms": 120 },
    "notion": { "status": "healthy", "latency_ms": 89 },
    "hris": { "status": "degraded", "latency_ms": 2100 }
  },
  "rag": {
    "total_documents": 1247,
    "total_chunks": 8934,
    "last_sync": "2026-07-24T10:15:00Z"
  },
  "metrics": {
    "requests_today": 357,
    "avg_response_ms": 1890,
    "success_rate": 0.97,
    "tokens_used_today": 245000
  }
}
```

## 5. WebSocket Protocol

### Connection

```
ws://localhost:8000/ws/chat?session_id={uuid}&user_id={email}
```

### Message Format

```json
// Client → Server
{
  "type": "message",
  "content": "User's query",
  "metadata": {}
}

// Server → Client (streaming)
{
  "type": "chunk",
  "content": "Partial response text...",
  "agent": "knowledge",
  "done": false
}

// Server → Client (final)
{
  "type": "complete",
  "content": "Full response",
  "agent": "knowledge",
  "sources": [...],
  "metrics": { "tokens_used": 1247, "duration_ms": 2340 }
}

// Server → Client (status)
{
  "type": "status",
  "content": "Searching knowledge base...",
  "agent": "knowledge"
}
```

## 6. Authentication

- **Development**: API key in `X-API-Key` header
- **Production**: OAuth 2.0 via Entra ID
- **WebSocket**: Token in query parameter

## 7. Rate Limiting

| Tier | Requests/min | Concurrent |
|------|-------------|------------|
| Standard | 30 | 5 |
| Power User | 100 | 10 |
| Admin | 300 | 20 |

## 8. Error Responses

```json
{
  "error": {
    "code": "AGENT_TIMEOUT",
    "message": "Knowledge agent did not respond within 30 seconds",
    "request_id": "uuid",
    "timestamp": "2026-07-24T10:30:00Z"
  }
}
```

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 422 | Invalid request body |
| `AUTH_REQUIRED` | 401 | Missing/invalid authentication |
| `RATE_LIMITED` | 429 | Too many requests |
| `AGENT_TIMEOUT` | 504 | Agent execution timeout |
| `AGENT_ERROR` | 500 | Agent internal error |
| `CONNECTOR_DOWN` | 503 | Enterprise connector unavailable |
