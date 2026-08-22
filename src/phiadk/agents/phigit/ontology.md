# PhiGit: Git-Core Storage Engine Ontologylogy

PhiGit implements a content-addressable object store. Every piece of state is stored as an immutable `Blob`, structured into `Tree` hierarchies, and snapshotted as `Commit` nodes in a cryptographic lineage graph.

## 1. Cryptographic DAG & Object Tree

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Commit2["Commit 2 (sha1: 8f2c... parent: a1b2...)"] --> Commit1["Commit 1 (sha1: a1b2...)"]
    Commit2 --> Tree2["Tree Node (sha1: 3e4f...)"]
    Commit1 --> Tree1["Tree Node (sha1: 9d8c...)"]

    Tree2 --> BlobA["Blob A' (Modified Key)"]
    Tree2 --> BlobB["Blob B (Unchanged Key)"]
    Tree1 --> BlobA_Old["Blob A (Original)"]
    Tree1 --> BlobB

    RefMain["Ref: refs/heads/main"] -.-> Commit2
```

### Graph Lineage
```
[ refs/heads/main ] ──► (Commit B: sha1=7c2e...) ──► (Commit A: sha1=1f4a...)
                              │                              │
                              ▼                              ▼
                         [ Tree B ]                     [ Tree A ]
                         /        \                     /        \
                    [ Blob 1' ]  [ Blob 2 ]        [ Blob 1 ]  [ Blob 2 ]
```

## 2. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: None (Foundational primitive)
- **Feeds into**: `phiora`, `philog`, `phidoc`, `phimen`
