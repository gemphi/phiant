# AIP Blueprint Dashboard (`dashboard/`)

> _Standalone Enterprise Blueprint Web Console for Agent Operations & Telemetry._

---

## 1. Features

- **Real-Time Agent Grid**: Live latency, status, and health cards for all 15 canonical domain agents.
- **Interactive Multi-Turn Chat**: Natural language query interface with streaming tokens and audit receipts.
- **POntology Graph Visualizer**: Live rendering of Object Types, Link Types, and Action Morphisms.
- **PhiBus Live Stream Monitor**: Real-time event tailing via Server-Sent Events (SSE).
- **Compliance Audit Viewer**: PII-redacted cryptographic audit log table.

---

## 2. Usage

The dashboard is served directly by the FastAPI server at **`http://localhost:8000`** or can be opened directly in any modern browser via [`index.html`](./index.html).
