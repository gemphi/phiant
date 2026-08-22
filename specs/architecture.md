# Architecture Specification

## 1. System Overview

The Phient Agentic Ecosystem is an enterprise multi-agent platform that orchestrates specialized AI agents across global workforce operations. It integrates with enterprise systems (Microsoft Entra ID, Notion, Enterprise HRIS), provides topological ontology governance (**POntologyEngine**), real-time pub/sub event bus (**PhiBus**), and content-addressed topological spatial storage (**PhiOraDB**).

---

## 2. Layered Architecture Diagram

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#334155', 'lineColor': '#94a3b8', 'textColor': '#f1f5f9'}}}%%
graph TD
    subgraph Layer5["Layer 5: Presentation & Interface"]
        UI["AIP Blueprint Dashboard (HTML/JS)"]
        CLI["PhiCLI Toolchain & Terminal (Rich)"]
        MCP["MCP Server (Claude Desktop Integration)"]
    end

    subgraph Layer4["Layer 4: API & Event Transport"]
        API["FastAPI Gateway (REST + SSE)"]
        Bus["PhiBus (Pub/Sub Event Bus Manager)"]
    end

    subgraph Layer3["Layer 3: Orchestration & Topology"]
        Orch["Orchestrator (Palantir 20-Namespace Router)"]
        Onto["POntologyEngine (ObjectTypes, LinkTypes, ActionTypes)"]
        Scen["Scenario Engine (What-If Branching & Transactions)"]
    end

    subgraph Layer2["Layer 2: Canonical Domain Agents (15 Agents)"]
        Agents["phibot | phibrd | phibus | phical | phidoc<br/>phigen | phigit | phigov | phillm | philog<br/>phimen | phione | phiora | phirag | phisec"]
    end

    subgraph Layer1["Layer 1: Storage & Infrastructure"]
        OraDB["PhiOraDB (Topological Spatial Store & CAS)"]
        GitEngine["PhiGit Engine (SHA-1 Tree DAG Lineage)"]
        Audit["PhiLog Telemetry Ring Buffer & Audit Trail"]
    end

    UI & CLI & MCP --> API & Bus
    API & Bus --> Orch
    Orch --> Onto & Scen
    Onto --> Agents
    Agents --> OraDB & GitEngine & Audit
```

---

## 3. End-to-End Request & Event Lifecycle

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'actorBkg': 'transparent', 'actorBorder': '#3b82f6', 'actorTextColor': '#f1f5f9', 'signalColor': '#94a3b8', 'signalTextColor': '#f1f5f9', 'labelBoxBkgColor': 'transparent', 'labelBoxBorderColor': '#334155'}}}%%
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

## 4. Storage Architecture: PhiOraDB (Spatial Store vs Raw Vector)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#334155', 'lineColor': '#94a3b8', 'textColor': '#f1f5f9'}}}%%
graph LR
    subgraph "Legacy Raw Vector Flat Table"
        V1["Unstructured 1D Floats"] --> V2["Flat Cosine Distance"]
        V2 --> V3["Destructive In-Place Overwrites"]
    end

    subgraph "PhiOraDB (Topological Spatial Store)"
        S1["SpatialRecord (Topological Manifold R^N)"] --> S2["Geodesic Nearest Neighbor & Bounding Envelopes"]
        S2 --> S3["GitEngine Immutable SHA-1 CAS DAG"]
        S3 --> S4["Zero-Copy Scenario Branching"]
    end
```


---

## 5. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **LLM Gateway** | Claude 3.5 Sonnet / Multi-Provider Gateway | Agent reasoning, intent classification, generation |
| **Orchestrator** | PhiADK Orchestrator | 20-Namespace Palantir routing & priority queuing |
| **Ontology Engine** | POntologyEngine | Category-theoretic 0/1-simplex state machine |
| **Spatial Store** | **PhiOraDB** | Topological spatial store, coordinate indexing, CAS |
| **Event Bus** | **PhiBus** (`PBusClient`) | High-throughput pub/sub event stream |
| **Git Engine** | **PhiGit** (`GitEngine`) | Content-addressed SHA-1 blobs, trees, and commit lineage |
| **Audit & Telemetry** | **PhiLog** (`StructuredLogger`) | Cryptographic audit trails & ring buffer |
| **API Server** | FastAPI + Uvicorn | REST, SSE streaming, OpenAPI documentation |
| **MCP** | Model Context Protocol | Claude Desktop assistant toolchain |
| **Identity & Admin** | Microsoft Entra ID + HRIS | Employee directory & access management |

---

## 6. Phient Ontologies & Multi-Cloud Architecture (P* Standards)

Phient adheres to the enterprise `P*` naming convention and 1:1 Palantir Foundry API parity:
- **`PClient` / `PAsyncClient`**: Central unified client entry point with modular domain accessors.
- **`POntology` & `POntologyEngine`**: Central graph ontology schema management.
- **`PObjectType`, `PPropertyType`, `PLinkType`, `PActionType`**: Schema definition classes.
- **`POntologyObject`, `POntologyObjectSet`**: Runtime object and collection manipulation.
- **`PAgent`, `PNode`, `PSpace`, `PMorphism`**: Universal foundation abstractions.
- **`POraDB` / `PhiOraDB`**: First-class spatial store and dataset engine.

For complete deployment specifications across Microsoft Azure, AWS, GCP, Snowflake, Databricks, and Palantir Foundry, refer to [specs/MULTI_CLOUD_INTEGRATION_GUIDE.md](file:///c:/Users/phiac/Workspace/gemphi/phient/specs/MULTI_CLOUD_INTEGRATION_GUIDE.md).
