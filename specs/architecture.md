# Architecture Specification

## 1. System Overview

The M-KOPA Agentic Ecosystem is a multi-agent platform that orchestrates specialized AI agents to automate internal operations across 2,500+ employees in 7 countries. It integrates with enterprise tools (Microsoft Entra ID, Notion, HiBob) and provides RAG-based knowledge retrieval grounded in organisational context.

### Design Principles

1. **Production-grade reliability** — Every agent runs with retry logic, circuit breakers, and graceful degradation
2. **Observability-first** — All agent actions are logged, metered, and auditable
3. **Security by default** — RBAC, encrypted secrets, audit trails on every operation
4. **Modular agents** — Each agent is independently deployable and testable
5. **Human-in-the-loop** — Destructive operations require explicit approval

## 2. Layered Architecture

```
Layer 5: Presentation    → Dashboard (HTML/JS), CLI (Rich), MCP (Claude)
Layer 4: API Gateway     → FastAPI (REST + WebSocket)
Layer 3: Orchestration   → LangGraph state machine, intent router, priority queue
Layer 2: Agent Pool      → 6 specialized agents with tool access
Layer 1: Infrastructure  → RAG pipeline, connectors, monitoring, audit
Layer 0: External        → Entra ID, Notion, HiBob, Anthropic API
```

## 3. Data Flow

### Request Lifecycle

```
User Request
    │
    ▼
FastAPI Gateway (auth, rate limit, validate)
    │
    ▼
Intent Router (classify intent → select agent(s))
    │
    ▼
Priority Framework (score urgency, queue position)
    │
    ▼
LangGraph Orchestrator (build execution graph)
    │
    ├──► Single Agent Path ──► Agent executes tools ──► Response
    │
    └──► Multi-Agent Path ──► Parallel/sequential agent execution
              │                        │
              ▼                        ▼
         Agent A result          Agent B result
              │                        │
              └────────┬───────────────┘
                       ▼
              Aggregator merges results
                       │
                       ▼
              Response to user (+ audit log)
```

### RAG Data Flow

```
Documents (Notion, internal wikis, policies)
    │
    ▼
Document Chunker (semantic splitting, 512-token chunks)
    │
    ▼
Embedding Engine (text-embedding-3-small / sentence-transformers)
    │
    ▼
ChromaDB Vector Store (persistent collections)
    │
    ▼
Retriever (hybrid search: semantic + keyword)
    │
    ▼
Re-ranker (cross-encoder scoring)
    │
    ▼
Context Window (top-k chunks → LLM prompt)
```

## 4. Deployment Topology

### Development (Local)

```
localhost
├── FastAPI server      :8000
├── Dashboard           :8001
├── MCP server          :3100 (stdio or SSE)
├── ChromaDB            :8200 (embedded)
└── SQLite audit log    ./data/audit.db
```

### Production (Recommended)

```
Cloud (Railway / Vercel / Azure)
├── FastAPI container       → Load balancer
├── Dashboard (static)      → CDN
├── MCP server              → Internal only
├── ChromaDB                → Persistent volume
├── PostgreSQL              → Audit + metrics
└── Redis                   → Job queue + caching
```

## 5. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| LLM | Claude 3.5 Sonnet (Anthropic) | Agent reasoning, intent classification |
| Agent Framework | LangChain + LangGraph | Agent lifecycle, state machines |
| Vector Store | ChromaDB | Embedding storage + retrieval |
| Embeddings | text-embedding-3-small / all-MiniLM-L6-v2 | Document embeddings |
| API | FastAPI + Uvicorn | REST + WebSocket gateway |
| MCP | mcp Python SDK | Claude Desktop integration |
| Auth | Microsoft Entra ID | Identity + access management |
| HRIS | HiBob API | Employee data |
| Docs | Notion API | Knowledge base |
| Monitoring | Prometheus metrics format | Observability |
| Audit | SQLite / PostgreSQL | Compliance logging |
| CLI | Rich + Typer | Terminal interface |
| Dashboard | Vanilla HTML/CSS/JS | Real-time monitoring UI |
| Testing | pytest + pytest-asyncio | Automated testing |

## 6. Configuration

All configuration is environment-driven via `.env` files:

```bash
# LLM
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Enterprise
ENTRA_TENANT_ID=...
ENTRA_CLIENT_ID=...
ENTRA_CLIENT_SECRET=...

NOTION_API_KEY=ntn_...
HIBOB_API_KEY=...
HIBOB_SERVICE_USER=...

# Infrastructure
CHROMA_PERSIST_DIR=./data/chroma
AUDIT_DB_PATH=./data/audit.db
LOG_LEVEL=INFO
```

## 7. Error Handling Strategy

| Error Type | Strategy | Example |
|-----------|----------|---------|
| LLM timeout | Retry with exponential backoff (3 attempts) | Claude API 529 |
| Connector failure | Circuit breaker (5 failures → open for 60s) | Entra API down |
| RAG empty results | Fallback to general knowledge agent | No matching docs |
| Invalid input | Validation error with helpful message | Malformed email |
| Auth failure | Return 401, log attempt | Expired token |
| Rate limit | Queue with priority, retry after delay | API 429 |

## 8. Scalability Considerations

- **Horizontal**: API layer is stateless, scales behind load balancer
- **Agent pool**: Each agent is independent; add new agents without modifying others
- **RAG**: ChromaDB supports sharding; can migrate to Pinecone/Weaviate at scale
- **Queue**: Redis-backed job queue for async operations at scale
- **Caching**: LLM response caching for repeated queries (TTL-based)

## 9. Phient Ontologies & Multi-Cloud Architecture (P* Standards)

Phient adheres to the enterprise `P*` naming convention and 1:1 Palantir Foundry API parity:
- **`PClient` / `PAsyncClient`**: Central unified client entry point with modular domain accessors.
- **`POntology` & `POntologyEngine`**: Central graph ontology schema management.
- **`PObjectType`, `PPropertyType`, `PLinkType`, `PActionType`**: Schema definition classes.
- **`POntologyObject`, `POntologyObjectSet`**: Runtime object and collection manipulation.
- **`PAgent`, `PNode`, `PSpace`, `PMorphism`**: Universal foundation abstractions.

For complete deployment specifications across Microsoft Azure, AWS, GCP, Snowflake, Databricks, and Palantir Foundry, refer to [specs/MULTI_CLOUD_INTEGRATION_GUIDE.md](file:///c:/Users/phiac/Workspace/gemphi/phient/specs/MULTI_CLOUD_INTEGRATION_GUIDE.md).

