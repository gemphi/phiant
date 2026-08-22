# PhiGit Formal Specification (`spec.md`)

- **Agent ID**: `phigit`
- **Agent Name**: `PhiGit`
- **Domain**: `git_engine`
- **Layer**: `AgentLayer.DATA`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiGitVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `STORE_BLOB` | `"store_blob"` | `{"data": bytes}` | `{"sha1": str, "size": int}` | Immutable content-addressed blob write. |
| `GET_BLOB` | `"get_blob"` | `{"sha1": str}` | `{"data": bytes}` | Retrieve blob by SHA-1. |
| `STORE_TREE` | `"store_tree"` | `{"entries": List[Dict]}` | `{"sha1": str}` | Create sorted, deterministic tree node. |
| `COMMIT` | `"commit"` | `{"tree_sha1": str, "message": str, "parent": Optional[str]}` | `Commit` dict | Snapshot tree state into commit lineage. |
| `LOG` | `"log"` | `{"limit": int}` | `List[Commit]` | Commit history graph traversal. |
| `DIFF` | `"diff"` | `{"old_tree": str, "new_tree": str}` | `{"added": List, "modified": List, "deleted": List}` | Compute tree delta. |

---

## 2. Supported Tasks (`PhiGitTask`)

- `OBJECT_STORAGE` (`"object_storage"`)
- `VERSION_CONTROL` (`"version_control"`)

---

## 3. Specifications (`PhiGitSpec`)

- `GIT_STORAGE_ENGINE_V1` (`"GIT_STORAGE_ENGINE_V1"`)
