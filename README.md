# Phient / PhiADK — Enterprise Autonomous Agentic AI Platform

> _Enterprise Multi-Agent SDK & Palantir Foundry-Symmetrical Ontology Substrate._

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Architecture](https://img.shields.io/badge/architecture-Palantir_Foundry_%26_AIP-purple.svg)](./docs/v2/README.md)
[![Tests Passing](https://img.shields.io/badge/tests-132%20passed-success.svg)](./tests/)
[![Parity](https://img.shields.io/badge/parity-100%25-brightgreen.svg)](./look.md)

---

## 1. System Overview

**Phient (PhiADK)** is a production-grade enterprise multi-agent operating platform. Built with full **1:1 architectural parity to Palantir Foundry & AIP**, Phient coordinates **15 canonical domain agents** over a shared **Topological Ontology Substrate (`POntologyEngine`)**, real-time **Pub/Sub Event Bus (`PhiBus`)**, and a **Content-Addressed Spatial Store (`PhiOraDB`)**.

```mermaid
graph TD
    subgraph "AIP Presentation Layer"
        UI["AIP Blueprint Console & Dashboard (HTML5/JS)"]
        CLI["PhiCLI Developer Toolchain & Interactive Shell"]
        MCP["Model Context Protocol (Claude Desktop Integration)"]
    end

    subgraph "Ontology & Orchestration Substrate"
        Orch["20-Namespace Intent Orchestrator & Priority Router"]
        Onto["POntologyEngine (0-Simplex Objects, 1-Simplex Links, Morphisms)"]
        Scen["Scenario Engine (Zero-Copy What-If Branching & Transactions)"]
    end

    subgraph "Fleet of 15 Canonical 6-Letter Domain Agents"
        Agents["phibot | phibrd | phibus | phical | phidoc<br/>phigen | phigit | phigov | phillm | philog<br/>phimen | phione | phiora | phirag | phisec"]
    end

    subgraph "Storage & Streaming Infrastructure"
        OraDB["PhiOraDB: Topological Spatial Store (Manifold R^N)"]
        Bus["PhiBus: Universal Pub/Sub Event Stream (PBusEvent)"]
        Git["PhiGit: Content-Addressed SHA-1 CAS DAG Engine"]
        Log["PhiLog: Cryptographic Audit Ring Buffer & Telemetry"]
    end

    UI & CLI & MCP --> Orch
    Orch --> Onto & Scen
    Onto --> Agents
    Agents --> OraDB & Bus & Git & Log
```

---

## 2. The 15 Canonical 6-Letter Domain Agents

Every domain agent implements the universal 4-phase topological lifecycle: **`envision → apply → eval → iterate`**.

| Agent | Domain | Palantir Namespace | Primary Responsibility |
|:------|:-------|:-------------------|:-----------------------|
| [`phibot`](./src/phiadk/agents/phibot/) | Automation | `orchestration` | Playbook DAG execution & automated operational workflows |
| [`phibrd`](./src/phiadk/agents/phibrd/) | Onboarding | `third_party_applications` | Employee lifecycle onboarding & cross-system provisioning |
| [`phibus`](./src/phiadk/agents/phibus/) | Event Bus | `connectivity` | Universal pub/sub event broadcasting & stream routing (`PBusEvent`) |
| [`phical`](./src/phiadk/agents/phical/) | Compute | `functions` | Strongly-typed logic functions & Quantum Model Language (`QML`) |
| [`phidoc`](./src/phiadk/agents/phidoc/) | Docs | `filesystem` | Notion workspaces, documentation sync & knowledge indexing |
| [`phigen`](./src/phiadk/agents/phigen/) | Synthesis | `models` | Autonomous type generation & 100% Palantir parity auditing |
| [`phigit`](./src/phiadk/agents/phigit/) | Version Control | `filesystem` | Content-addressed SHA-1 blobs, trees, and commit lineage |
| [`phigov`](./src/phiadk/agents/phigov/) | Governance | `checkpoints` | AI safety guardrails, policy enforcement & compliance checks |
| [`phillm`](./src/phiadk/agents/phillm/) | LLM Gateway | `language_models` | Multi-model token streaming (SSE) & reasoning dispatch |
| [`philog`](./src/phiadk/agents/philog/) | Telemetry | `audit` | Distributed structured logging, audit trails & ring buffers |
| [`phimen`](./src/phiadk/agents/phimen/) | Executive | `aip_agents` | Virtual CEO strategic planning & recursive goal decomposition |
| [`phione`](./src/phiadk/agents/phione/) | Identity & HR | `admin` | Microsoft Entra ID & HRIS workforce directory operations |
| [`phiora`](./src/phiadk/agents/phiora/) | Storage | `datasets` | **PhiOraDB** Topological Spatial Store & immutable datasets |
| [`phirag`](./src/phiadk/agents/phirag/) | RAG | `media_sets` | Semantic chunking, vector embeddings & hybrid retrieval |
| [`phisec`](./src/phiadk/agents/phisec/) | Security | `data_health` | Automated vulnerability scans & JWT token verification |

---

## 3. Storage Architecture: PhiOraDB (Topological Spatial Store)

`PhiOraDB` operates as a true **Spatial Store** rather than a flat vector table:

```mermaid
graph LR
    subgraph "Legacy Flat Vector Table"
        V1["1D Float Array: [0.12, 0.98, ...]"] --> S1["Flat Cosine Distance"]
        S1 --> D1["Destructive In-Place Overwrite"]
    end

    subgraph "PhiOraDB (Topological Spatial Store)"
        SP1["SpatialRecord (Topological Manifold R^N)"] --> S2["Geodesic Nearest Neighbor & Bounding Envelopes"]
        S2 --> D2["Git-Backed Immutable SHA-1 CAS DAG"]
        D2 --> D3["Zero-Copy Scenario Branching"]
    end
```

- **Spatial Manifolds**: Entities possess Riemannian/Euclidean coordinates ($R^2, R^3, R^N$), spatial bounds, and geodesic metrics.
- **Topological Queries**: Supports geodesic $k$-nearest spatial neighbors and multi-dimensional bounding-box queries.
- **Git-Backed CAS**: Every state transition produces an immutable SHA-1 content hash with complete parent commit lineage.

---

## 4. End-to-End Event Stream Flow

```mermaid
sequenceDiagram
    autonumber
    participant User as User / Client
    participant Gateway as FastAPI / Orchestrator
    participant Ontology as POntologyEngine
    participant Agent as Target Domain Agent
    participant Bus as PhiBus (Event Stream)
    participant Store as PhiOraDB (Spatial Store)
    participant Log as PhiLog (Audit Telemetry)

    User->>Gateway: Submit Request / Action Type
    Gateway->>Ontology: Validate Parameters & Markings
    Ontology-->>Gateway: Action Validated
    Gateway->>Agent: execute_verb(verb, parameters)
    Agent->>Store: Spatial Coordinate / CAS Mutation
    Store-->>Agent: Receipt & Commit SHA-1
    Agent->>Bus: pub(topic="ontology.action.*", PBusEvent)
    Bus->>Log: Broadcast event for audit logging
    Log-->>Log: Write to structured audit ring buffer
    Agent-->>Gateway: AgentContext (Results, Confidence, Sources)
    Gateway-->>User: Final Response + Audit Receipt
```

---

## 5. Python SDK Quickstart

### Installation
```bash
# Clone repository
git clone https://github.com/gemphi/phient.git
cd phient


# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate

# Install in editable mode with dev dependencies
pip install -e ".[dev]"
```

### Running Tests
```bash
pytest --no-cov
```

### SDK Usage Example
```python
import asyncio
from phiadk.client import PhiADKClient
from phiadk.agents.phibus.models import PBusEvent

async def main():
    # 1. Initialize master client
    client = PhiADKClient()

    # 2. Query Workforce via PhiOne
    ctx = await client.agents["phione"].execute_verb(
        "lookup_employee",
        {"email": "jane@phient.com"}
    )
    print("Employee:", ctx.results.get("output"))

    # 3. Publish Event via PhiBus
    client.phibus.pub(
        "workforce.promoted",
        PBusEvent(
            topic="workforce.promoted",
            payload={"employee": "Jane Muthoni", "new_title": "Staff Architect"},
            source_agent="phione",
        )
    )

    # 4. Query Spatial Store (PhiOraDB)
    neighbors = client.phiora.query_nearest(
        target_coords=[10.0, 20.0, 5.0],
        k=3
    )
    print("Spatial Neighbors:", neighbors)

asyncio.run(main())
```

### Running Server & Dashboard
```bash
# Start AIP FastAPI server & Blueprint Dashboard
python -m src.cli serve
```
Open **`http://localhost:8000`** in your browser to access the AIP Interactive Console.

---

## 6. Repository Layout

```
phient/
├── src/
│   ├── phiadk/               # Unified Master Enterprise SDK Package
│   │   ├── _core/            # Auth, Config, ModelBase, Connectors (Entra, Notion)
│   │   ├── _errors/          # Error Hierarchy (PhiADKException, etc.)
│   │   ├── agents/           # 15 Canonical 6-Letter Domain Agents
│   │   │   ├── phibot/       # Automation & Build DAGs
│   │   │   ├── phibrd/       # Onboarding & Third-Party Apps
│   │   │   ├── phibus/       # Pub/Sub Event Bus Manager (PBusClient)
│   │   │   ├── phical/       # Quantum Compute & Function Circuits
│   │   │   ├── phidoc/       # Notion & Documentation
│   │   │   ├── phigen/       # CodeGen & 100% Parity Auditor
│   │   │   ├── phigit/       # Content-Addressed Git Engine
│   │   │   ├── phigov/       # AI Safety Governance & Checkpoints
│   │   │   ├── phillm/       # Multi-Model LLM Gateway
│   │   │   ├── philog/       # Telemetry & Structured Audit Trails
│   │   │   ├── phimen/       # Virtual CEO & AIP Agents
│   │   │   ├── phione/       # Admin Identity & HR Operations
│   │   │   ├── phiora/       # PhiOraDB Spatial Store & Datasets
│   │   │   ├── phirag/       # Vector RAG & Document Chunker
│   │   │   └── phisec/       # DataHealth Security & Policy Scanner
│   │   ├── mcp/              # Model Context Protocol (MCP) Server
│   │   ├── ontologies/       # Palantir Symmetrical Ontologies Engine
│   │   ├── orchestrator/     # 20-Namespace Intent Orchestrator
│   │   ├── phiapi/           # AIP FastAPI Server & Blueprint Console
│   │   ├── phicli/           # Developer Toolchain CLI
│   │   ├── query/            # RQL, OQL, QML Query Runtime
│   │   ├── client.py         # Master SDK Client (PhiADKClient / PClient)
│   │   └── __init__.py       # Top-Level SDK Exports
│   ├── cli.py                # Standalone Entrypoint CLI
│   ├── cli_demo.py           # Terminal Playground Demo
│   ├── config.py             # Global Environment Settings
│   └── utils.py              # Shared Utilities
├── docs/v2/                  # 106 Symmetrical Markdown Docs across 20 Modules
├── specs/                    # Architecture, API & Multi-Cloud Specs
├── tests/                    # 132 Automated Unit & Integration Tests
└── data/                     # Mock fixtures & dataset schemas
```

---

## 7. License & Compliance

Distributed under the MIT Enterprise License. Built for SOC2 Type II, GDPR, and enterprise cryptographic audit standards.
