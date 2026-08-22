# PhiDoc Formal Specification (`spec.md`)

- **Agent ID**: `phidoc`
- **Agent Name**: `PhiDoc`
- **Domain**: `documentation`
- **Layer**: `AgentLayer.APPLICATION`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiDocVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `SEARCH_DOCS` | `"search_docs"` | `{"query": str}` | `List[PageNode]` | Keyword search over documentation nodes. |
| `CREATE_PAGE` | `"create_page"` | `{"title": str, "content": str}` | `PageNode` dict | Node creation in Notion / Markdown space. |
| `GET_TOPOLOGY`| `"get_topology"`| `{"agent_id": str}` | `OntologylogyCard` dict | Read and parse `topo.md` / `topology.mdx`. |
| `LIST_TOPOLOGIES`| `"list_topologies"` | `{}` | `List[str]` | Discover all registered agent topology files. |
| `SYNC_KNOWLEDGE_BASE`| `"sync_knowledge_base"`| `{}` | `{"status": "synced"}` | Push documentation changes to PhiRAG index. |

---

## 2. Supported Tasks (`PhiDocTask`)

- `DOCUMENTATION_SEARCH` (`"documentation_search"`)
- `PAGE_MANAGEMENT` (`"page_management"`)
- `TOPOLOGY_EXPLORATION` (`"topology_exploration"`)

---

## 3. Specifications (`PhiDocSpec`)

- `DOCS_WORKSPACE_SYNC_V1` (`"DOCS_WORKSPACE_SYNC_V1"`)
