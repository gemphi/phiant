---
outline: deep
---

# PhiGit

> Internal git-core engine — content-addressable storage, SHA-1 object store, refs, trees, commits.

| | |
|---|---|
| **ID** | `phigit` |
| **Class** | `PhiGitAgent` / `PhiGitClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Data |
| **Domain** | `git_engine` |
| **File** | `phiegg/phigit/` |
| **Schema** | `phiegg/phigit/schema.json` |
| **Topology** | `phiegg/phigit/topo/topology.mdx` |

## What PhiGit Does

PhiGit is the **immutable cryptographic storage engine**. It implements a git-like content-addressable object store: every piece of state is stored as an immutable `Blob`, organized into hierarchical `Tree` objects, and snapshots are recorded as `Commit` nodes in an append-only directed acyclic graph (DAG) identified by SHA-1 hashes.

## Tasks & Verbs

### `object_operations` — Content-Addressed Objects
| Verb | Description | Parameters |
|------|-------------|------------|
| `store_blob` | Store raw content and compute SHA-1 hash | `content: Any` |
| `get_blob` | Retrieve blob by SHA-1 hash | `sha1: str` |
| `store_tree` | Store directory-like tree from named entries | `entries: list` |
| `get_tree` | Retrieve tree by SHA-1 hash | `sha1: str` |

### `ref_operations` — Branches & Named References
| Verb | Description | Parameters |
|------|-------------|------------|
| `set_ref` | Point named reference to a commit SHA-1 | `name: str, commit_sha1: str` |
| `get_ref` | Resolve reference to commit SHA-1 | `name: str` |
| `list_refs` | List all active repository references | - |

### `commit_operations` — Snapshots & Delta Calculation
| Verb | Description | Parameters |
|------|-------------|------------|
| `commit` | Create a commit snapshot and advance ref | `tree_sha1: str, message: str, version: str` |
| `get_commit` | Retrieve commit metadata by SHA-1 | `sha1: str` |
| `log` | Walk commit history backwards | `ref: str, max_count: int` |
| `diff` | Compute added/modified/deleted keys between commits | `ref_a: str, ref_b: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `CONTENT_ADDRESSABLE_STORAGE_V1` | Immutable SHA-1 content-addressable object store with BLOB, TREE, COMMIT, REF types and branch diffing | `object_operations`, `ref_operations`, `commit_operations` |

## Dependencies

None — PhiGit is a foundational storage primitive.
