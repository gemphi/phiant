# PhiOra Formal Specification (`spec.md`)

- **Agent ID**: `phiora`
- **Agent Name**: `PhiOra`
- **Domain**: `data_storage`
- **Layer**: `AgentLayer.DATA`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiOraVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `PUT_RECORD` | `"put_record"` | `{"collection": str, "key": str, "value": Any}` | `Record` dict | Write blob & commit tree to `PhiGit`. |
| `GET_RECORD` | `"get_record"` | `{"collection": str, "key": str}` | `Record` dict | Content-addressed key lookup. |
| `LIST_KEYS` | `"list_keys"` | `{"collection": str}` | `List[str]` | List all keys in a collection tree. |
| `INDEX_VECTOR` | `"index_vector"` | `{"vector_id": str, "vector": List[float]}` | `{"status": "indexed"}` | Insert vector into embedding index. |
| `SEARCH_VECTOR`| `"search_vector"`| `{"vector": List[float], "top_k": int}` | `List[VectorRecord]` | Cosine similarity ranking. |
| `RESOLVE_DATASET`| `"resolve_dataset"`| `{"source": str}` | `Any` | File / dataset path resolution. |

---

## 2. Supported Tasks (`PhiOraTask`)

- `DATA_STORAGE` (`"data_storage"`)
- `VECTOR_INDEXING` (`"vector_indexing"`)
- `DATASET_RESOLUTION` (`"dataset_resolution"`)

---

## 3. Specifications (`PhiOraSpec`)

- `CONTENT_ADDRESSED_STORAGE_V1` (`"CONTENT_ADDRESSED_STORAGE_V1"`)
