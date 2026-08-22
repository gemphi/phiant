# PhiGit: Cryptographic Git-Core Storage Engine Agent

`PhiGit` provides content-addressable storage, cryptographic SHA-1 hashing, immutable `Blob` storage, hierarchical `Tree` construction, and parent-linked `Commit` lineage graphs.

---

## 1. Cryptographic DAG Architecture & Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Commit2["Commit 2 (sha1: 8f2c... parent: a1b2...)"] --> Commit1["Commit 1 (sha1: a1b2...)"]
    Commit2 --> Tree2["Tree 2 (sha1: 3e4f...)"]
    Commit1 --> Tree1["Tree 1 (sha1: 9d8c...)"]

    Tree2 --> Blob1Mod["Blob: employee_alice (Updated)"]
    Tree2 --> Blob2["Blob: settings (Unchanged)"]
    Tree1 --> Blob1Orig["Blob: employee_alice (Original)"]
    Tree1 --> Blob2
```

### Flow Diagram
```
[ Write Payload / Raw Content ]
                │
                ▼
[ PhiGitAgent.envision() ] ──► (Verify payload type: bytes or string)
                │
                ▼
[ PhiGitAgent.apply() ]
                ├─► (STORE_BLOB) ──► Compute SHA-1 & persist Blob
                ├─► (STORE_TREE) ──► Construct deterministic Tree entries
                ├─► (COMMIT)     ──► Link tree to parent commit hash
                └─► (DIFF)       ──► Compute delta between two tree SHAs
                │
                ▼
[ PhiGitAgent.eval() ] ──► (Verify hash integrity)
                │
                ▼
[ PhiGitAgent.iterate() ] ──► (Advance branch reference: refs/heads/main)
```

---

## 2. Key Components

- **`agent.py`**: `PhiGitAgent` lifecycle implementation.
- **`engine.py`**: `GitEngine` with blob, tree, commit, and ref storage.
- **`models.py`**: `Blob`, `Tree`, `TreeEntry`, `Commit`, `Ref`.
- **`verbs.py`**: `PhiGitVerb` typed enum constants.
- **`spec.md`**: Formal specification contract.
