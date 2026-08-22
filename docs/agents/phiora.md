---
outline: deep
---

# PhiOra

> Content-addressed key-value storage (git-style SHA-1), vector embeddings, and DataSet resolution authority.

| | |
|---|---|
| **ID** | `phiora` |
| **Class** | `PhiOraAgent` / `PhiOraClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Data |
| **Domain** | `data_storage` |
| **File** | `phiadk/phiora/` |
| **Schema** | `phiadk/phiora/schema.json` |

## What PhiOra Does

PhiOra is the **foundational data layer** for the PhiADK platform. It enforces strict separation of data and code by providing content-addressed immutable records (keyed by SHA-1 hashes with version ancestry like Git), vector embedding indices with cosine search, and the universal `ResolverClient` used by all agents to resolve `DataSet` references.

## Storage Hierarchy

$$\text{Store Space} \longrightarrow \text{Collection Space} \longrightarrow \text{Record Node (SHA-1)}$$

## Tasks & Verbs

### `store_operations` - Content-Addressed Key-Value Store
| Verb | Description | Parameters |
|------|-------------|------------|
| `put_record` | Put key-value pair, computing content SHA-1 and linking parent version | `collection: str, key: str, value: any` |
| `get_record` | Retrieve latest record by key with lineage metadata | `collection: str, key: str` |
| `list_keys` | List all keys in a collection | `collection: str` |
| `snapshot_collection` | Create an immutable `DataSet` snapshot of collection | `collection: str` |

### `dataset_resolution` - Universal Data Resolution
| Verb | Description | Parameters |
|------|-------------|------------|
| `resolve_dataset` | Resolve `DataSet` source from memory collections or disk | `source: str` |

### `vector_operations` - Embedding Storage & Search
| Verb | Description | Parameters |
|------|-------------|------------|
| `index_vector` | Index content string with high-dimensional embedding | `key: str, content: str, embedding: list` |
| `search_vector` | Cosine similarity nearest neighbor search | `query_embedding: list, top_k: int` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `CONTENT_ADDRESSED_KV_V1` | Git-style content-addressed storage with SHA-1 hashing, parent lineage, and snapshotting | `store_operations`, `dataset_resolution` |
| `VECTOR_EMBEDDING_STORE_V1` | Dense vector indexing and cosine similarity search | `vector_operations` |
