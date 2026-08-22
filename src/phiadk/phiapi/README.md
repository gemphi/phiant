# AIP FastAPI Server & Blueprint Console (`src/phiadk/phiapi/`)

> _REST API Gateway, Server-Sent Events (SSE) Streaming & Blueprint UI Studio._

---

## 1. API Architecture

The `phiapi` module exposes the entire multi-agent ecosystem over standard HTTP REST, SSE streaming, and WebSockets:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'actorBkg': 'transparent', 'actorBorder': '#3b82f6', 'actorTextColor': '#f1f5f9', 'signalColor': '#94a3b8', 'signalTextColor': '#f1f5f9', 'labelBoxBkgColor': 'transparent', 'labelBoxBorderColor': '#334155'}}}%%
sequenceDiagram
    autonumber
    participant Browser as Blueprint Console (HTML/JS)
    participant FastAPI as FastAPI Gateway (phiapi)
    participant Orch as Orchestrator
    participant Agents as Domain Agents (15 Agents)

    Browser->>FastAPI: POST /v2/orchestrator/query {"query": "..."}
    FastAPI->>Orch: process(query, priority)
    Orch->>Agents: execute_verb(...)
    Agents-->>Orch: Result
    Orch-->>FastAPI: AgentResult
    FastAPI-->>Browser: JSON Response + Telemetry

    Browser->>FastAPI: GET /v2/streams/events (SSE)
    FastAPI-->>Browser: Real-time telemetry event stream
```

---

## 2. Core API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | Serves the AIP Blueprint Dashboard (`dashboard.html`). |
| `GET` | `/health` | System health check and uptime status. |
| `POST` | `/v2/orchestrator/query` | Submit natural language query to the 20-namespace orchestrator. |
| `GET` | `/v2/ontology/schema` | Retrieve full category-theoretic ontology schema and Mermaid graph. |
| `POST` | `/v2/ontology/action` | Apply validated Action Type morphism. |
| `POST` | `/v2/bus/pub` | Publish event on the `PhiBus` event network. |
| `GET` | `/v2/bus/events` | Query recent events from the `PhiBus` ring buffer. |
| `GET` | `/v2/streams/telemetry` | Server-Sent Events (SSE) live telemetry stream. |

---

## 3. Running the Server

```bash
# Start server on port 8000
python -m src.cli serve --port 8000
```
Open **`http://localhost:8000`** in your browser to access the interactive Blueprint Console.
