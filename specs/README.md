# Phiant Agentic Ecosystem — Specifications

> Technical specifications for every component of the Phiant AI Ops Agent platform.

## Document Index

| Spec | Description | Status |
|------|-------------|--------|
| [architecture.md](./architecture.md) | System architecture, data flow, deployment topology | Done |
| [agents.md](./agents.md) | All 6 agent specifications: capabilities, tools, prompts | Done |
| [orchestrator.md](./orchestrator.md) | LangGraph orchestrator, routing, priority framework | Done |
| [rag-pipeline.md](./rag-pipeline.md) | RAG pipeline: chunking, embedding, retrieval, re-ranking | Done |
| [connectors.md](./connectors.md) | Enterprise connectors: Entra ID, Notion, HiBob | Done |
| [mcp-server.md](./mcp-server.md) | MCP server specification for Claude integration | Done |
| [api.md](./api.md) | FastAPI REST + WebSocket API specification | Done |
| [dashboard.md](./dashboard.md) | Web dashboard UI/UX specification | Done |
| [monitoring.md](./monitoring.md) | Metrics, audit logging, alerting | Done |
| [security.md](./security.md) | Security model, RBAC, data handling | Done |
| [mlops-azure.md](./mlops-azure.md) | Azure MLOps: ML workspace, model registry, endpoints, cost mgmt | Done |
| [github-actions.md](./github-actions.md) | GitHub repo structure, CI/CD pipelines, deployment workflows | Done |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Web Dashboard / CLI                    │
├─────────────────────────────────────────────────────────┤
│                  FastAPI Gateway + MCP                    │
├─────────────────────────────────────────────────────────┤
│              LangGraph Agent Orchestrator                │
├────────┬────────┬────────┬────────┬────────┬────────────┤
│Knowledge│Automate│Identity│   HR   │  Docs  │ Onboarding │
│ Agent   │ Agent  │ Agent  │ Agent  │ Agent  │   Agent    │
├────────┴────────┴────────┴────────┴────────┴────────────┤
│         RAG Pipeline  │  Enterprise Connectors           │
│  ChromaDB · Embeddings│  Entra · Notion · HiBob          │
├─────────────────────────────────────────────────────────┤
│           Monitoring · Audit · Metrics                   │
└─────────────────────────────────────────────────────────┘
```
