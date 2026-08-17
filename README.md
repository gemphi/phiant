# Phiant — Enterprise AI Operations Platform

> _Turning dark data into decisions. Eliminating dashboard graveyards. Delivering self-service intelligence._

Production-grade multi-agent ecosystem designed to automate internal operations at scale across enterprise organisations. Phiant bridges the gap between **data that exists but isn't understood** (dark data) and **reports that get built but never used** (dashboard graveyards) — delivering actionable, self-service intelligence directly to the people who need it.

---

## The Problem Phiant Solves

Most enterprises sit between two costly extremes:

**Dark Data** — Valuable data scattered across systems (HR, identity, knowledge bases, collaboration tools) that nobody knows how to find, access, or make sense of. It exists, but it generates zero business value.

**Dashboard Graveyards** — Well-intentioned reporting initiatives that produce dashboard after dashboard. Nobody tracks whether they're actually used. Executives want dashboards built, but don't want to learn that nobody opens them. The result: long development backlogs of reports that end up in a list nobody ever visits.

**Phiant takes a different approach.** Instead of building more dashboards, it puts intelligent AI agents directly into the operational workflow — agents that retrieve, synthesise, and act on enterprise data in real time. Business users get answers through natural conversation, not by navigating a reporting tool. When a dashboard _is_ needed, Phiant tracks its actual usage so you know what's delivering value and what's waste.

---

## How It Works

### Self-Service Intelligence, Not More Reports

Traditional BI creates a backlog: business users request reports → developers queue them → reports ship weeks later → half are never opened. Phiant flips this by enabling **self-service data access through AI agents** that understand your enterprise systems:

- **Ask, don't search.** Natural language queries against HR data, identity systems, knowledge bases, and internal documentation — no SQL, no dashboard navigation, no waiting for a developer.
- **Agents that act, not just answer.** Automated playbook execution for common operational tasks (onboarding, access provisioning, policy lookups) that currently consume hours of manual work.
- **Usage-aware intelligence.** Built-in metrics tracking on every query, every agent interaction, and every dashboard view — so you know exactly what's generating value and what's sitting idle.

### The Agent Architecture

Phiant deploys **6 specialised AI agents**, each responsible for a distinct operational domain, coordinated by an intelligent orchestrator:

| Agent | Domain | What It Does |
|:------|:-------|:-------------|
| **Knowledge Agent** | RAG / Institutional Knowledge | Semantic search across internal documents, policies, and tribal knowledge using chunked embeddings and hybrid retrieval |
| **Automation Agent** | Operational Playbooks | Executes multi-step automated workflows for repetitive operational tasks |
| **Identity Agent** | Microsoft Entra ID | User provisioning, access reviews, group management, and identity governance |
| **HR Agent** | HiBob HRIS | Employee data lookups, leave management, org chart traversal, and people analytics |
| **Docs Agent** | Notion / Knowledge Management | Page search, content retrieval, and documentation management across Notion workspaces |
| **Onboarding Agent** | New Hire Operations | End-to-end orchestration of employee onboarding across identity, HR, docs, and access systems |

### Data Governance Built In

The gap between dark data and dashboard graveyards is **governance** — knowing where your data lives, who owns it, what it means, and whether anyone actually uses the outputs built from it.

Phiant enforces this at the platform level:

- **System-of-record clarity.** Every data source connected to Phiant has explicit ownership. The platform knows which system is authoritative for which fields — no conflicting copies, no stale mirrors.
- **PII-aware processing.** All agent interactions pass through a compliance audit layer with automatic PII redaction. Sensitive data is handled safely by default, not by policy alone.
- **Usage metrics on everything.** Every agent query, every dashboard view, every report generation is tracked. If something isn't being used, you'll know — and you can redirect engineering effort to what actually matters.
- **Audit trail.** Full execution logging for compliance, traceability, and incident investigation.

---

## Platform Components

### Core Engine
- **LangGraph Orchestrator** — Intent classification, priority scoring, context-aware routing across agents, and multi-agent execution chains
- **RAG Pipeline** — Semantic chunking, ChromaDB vector store, hybrid retrieval (dense + sparse), and contextual re-ranking
- **Enterprise Connectors** — Microsoft Entra ID, Notion API, HiBob HRIS, with a pluggable connector framework for additional systems

### Integration & Access
- **MCP Server** — Claude Desktop / Claude Code tool integration for developer and power-user access
- **FastAPI Gateway** — REST API, WebSocket real-time chat, and dashboard serving
- **CLI** — Interactive terminal interface and demo mode for rapid testing

### Observability & Governance
- **Metrics Collector** — Counters, gauges, and histograms tracking agent performance, query latency, connector health, and dashboard/report usage
- **Compliance Audit Logger** — Structured audit trail with automatic PII redaction
- **Web Dashboard** — Premium dark-mode UI with live system status, agent performance cards, interactive chat, and audit viewer

---

## Setup & Running

```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate

# Install package
pip install -e ".[dev]"

# Run tests
pytest

# Run interactive CLI demo
python -m src.cli --demo

# Start API server & Web Dashboard
python -m src.cli serve
```

Open `http://localhost:8000` to access the Web Dashboard.

---

## Project Structure

```
phiant/
├── src/
│   ├── agents/          # 6 specialised AI agents + base agent framework
│   ├── orchestrator/    # LangGraph intent routing and multi-agent coordination
│   ├── rag/             # Semantic chunking, vector store, hybrid retrieval
│   ├── connectors/      # Enterprise system integrations (Entra ID, Notion, HiBob)
│   ├── mcp/             # Model Context Protocol server for Claude integration
│   ├── api/             # FastAPI gateway, WebSocket chat, dashboard serving
│   ├── monitoring/      # Metrics collector, compliance audit logging
│   └── cli.py           # Interactive CLI and demo mode
├── dashboard/           # Web dashboard frontend
├── specs/               # Architecture docs, API specs, deployment guides
├── tests/               # Test suite
└── data/                # Local data and vector store
```

---

## Documentation

Detailed specifications are available in [`specs/`](specs/):

- [Architecture Overview](specs/architecture.md)
- [Agent Specifications](specs/agents.md)
- [RAG Pipeline](specs/rag-pipeline.md)
- [Orchestrator](specs/orchestrator.md)
- [API Reference](specs/api.md)
- [Connectors](specs/connectors.md)
- [MCP Server](specs/mcp-server.md)
- [Monitoring & Observability](specs/monitoring.md)
- [Security & Compliance](specs/security.md)
- [Dashboard](specs/dashboard.md)
- [CI/CD & GitHub Actions](specs/github-actions.md)
- [MLOps on Azure](specs/mlops-azure.md)
