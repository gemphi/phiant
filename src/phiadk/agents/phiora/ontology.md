# PhiOra: Data Layer & Content-Addressed Ontologylogy

PhiOra is the single point of data I/O for the entire ecosystem. It enforces strict mathematical data-as-sets separation, key-value storage, vector indexing, and Git-backed tree state resolution.

## 1. Storage Ontologylogy & DataSet Resolution

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    subgraph ClientLayer["Calling Domain Agents"]
        A1["PhiOne (HR/Identity)"]
        A2["PhiRAG (Knowledge)"]
        A3["PhiMen (Executive)"]
        A4["PhiBrd (Onboarding)"]
        A5["PhiBot (Automation)"]
    end

    subgraph PhiOraEngine["PhiOra Data Engine"]
        Resolver["ResolverClient (DataSet Resolution)"]
        Store["StoreClient (Collections & KV)"]
        Vector["VectorClient (Cosine Index)"]
        POntologyReg["POntology Registry (Object/Link/Action Types)"]
    end

    subgraph StorageBacking["Storage Layer"]
        GitEngine["PhiGit (Blobs, Trees, Commits)"]
        DiskFiles["Local Filesystem (Data Sets)"]
        LogEngine["PhiLog (Immutable Audit Log)"]
    end

    ClientLayer -->|DataSet Reference| Resolver
    Resolver --> DiskFiles
    Resolver --> Store
    Store --> GitEngine
    Store --> LogEngine
    Vector --> StorageBacking
    POntologyReg --> Store
```

### Key-Value & Tree Mapping
```
[ Key/Value Store ] ──► [ Collection Tree ] ──► [ SHA-1 Blobs ]
        │                       │                     │
        ├─► put(k, v)           ├─► TreeEntry(k, sha) ├─► Blob(content, sha)
        ├─► get(k)              └─► Commit Lineage    └─► Immutable
        └─► keys(), values()
```

## 2. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: `phigit` (Object & tree persistence), `philog` (Audit trail)
- **Feeds into**: All domain agents (`phione`, `phical`, `phirag`, `phidoc`, `phibot`, `phibrd`, `phillm`, `phimen`) and `topos` ontology engine.
