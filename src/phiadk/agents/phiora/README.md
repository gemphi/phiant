# PhiOra: Spatial & Content-Addressed Storage Layer Agent (PhiOraDB)

`PhiOra` is the single point of truth for data resolution, topological spatial storage (**PhiOraDB**), and content-addressed immutable dataset lineage.

---

## 1. Architectural & Spatial Store Diagram

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#334155', 'lineColor': '#94a3b8', 'textColor': '#f1f5f9'}}}%%
graph TD
    subgraph Callers["Domain Agents & Applications"]
        A1["PhiOne (Identity & Admin)"]
        A2["PhiDoc (Documentation)"]
        A3["PhiRAG (Unstructured Media)"]
        A4["PhiCal (Quantum Compute)"]
    end

    subgraph PhiOraCore["PhiOra Storage Layer"]
        SpatialDB["PhiOraDB: Spatial Store (Manifold R^3 / R^N)"]
        Store["StoreClient: Content-Addressed KV"]
        Resolver["ResolverClient: DataSet Path Routing"]
        Vector["VectorClient: Embedding Index"]
    end

    subgraph StorageEngine["PhiGit Engine"]
        Blob["SHA-1 Blob DAG"]
        Commit["Tree Commit Lineage"]
        Branches["Dataset Branches: main / scenario"]
    end

    A1 & A2 --> Store & Resolver
    A3 --> Vector
    A4 --> SpatialDB
    SpatialDB --> Blob & Branches
    Store --> Blob & Commit
```

---

## 2. Spatial Store vs Raw Vector Store

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#334155', 'lineColor': '#94a3b8', 'textColor': '#f1f5f9'}}}%%
graph LR
    subgraph "Raw Vector Table (Legacy)"
        V1["1D Float Array: [0.12, 0.98, ...]"] --> S1["Flat Cosine Distance"]
        S1 --> D1["Destructive In-Place Overwrite"]
    end

    subgraph "PhiOraDB (Spatial Store)"
        SP1["SpatialRecord (Topological Manifold R^N)"] --> S2["Geodesic Nearest Neighbor & Bounding Box"]

        S2 --> D2["Git-Backed Immutable SHA-1 CAS DAG"]
    end
```

---

## 3. Execution Lifecycle

```
[ Spatial Record Mutation / Dataset Write ]
                 │
                 ▼
[ PhiOraAgent.envision() ] ──► (Verify spatial coordinates, manifold & schema)
                 │
                 ▼
[ PhiOraAgent.apply() ]
                 ├─► (SPATIAL_INSERT)   ──► Insert coordinate entity into spatial manifold
                 ├─► (SPATIAL_QUERY)    ──► Geodesic k-NN & bounding box containment
                 ├─► (PUT_RECORD)       ──► Hash blob & commit via PhiGit engine
                 ├─► (RESOLVE_DATASET)  ──► Resolve immutable file system / remote snapshot
                 │
                 ▼
[ PhiOraAgent.eval() ] ──► (Verify SHA-1 integrity & spatial bounds)
                 │
                 ▼
[ PhiOraAgent.iterate() ] ──► (Emit storage telemetry to PhiLog & PhiBus)
```

---

## 4. Key Components

- **`agent.py`**: `PhiOraAgent` lifecycle implementation (`envision` $\rightarrow$ `apply` $\rightarrow$ `eval` $\rightarrow$ `iterate`).
- **`store.py`**: `PhiOraDB`, `SpatialStore`, `StoreClient`, `ResolverClient`, `VectorClient`.
- **`models.py`**: `SpatialRecord`, `Record`, `DataSet`, `Collection`, `Store`.
- **`card.py`**: Agent metadata registration (`AgentLayer.STORAGE`).
