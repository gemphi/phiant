---
outline: deep
---

# PhiDoc

> Documentation management, Notion workspace synchronization, and knowledge base page generation.

| | |
|---|---|
| **ID** | `phidoc` |
| **Class** | `PhiDocAgent` / `PhiDocClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Application |
| **Domain** | `documentation` |
| **File** | `phiegg/phidoc/` |
| **Schema** | `phiegg/phidoc/schema.json` |

## What PhiDoc Does

PhiDoc acts as the **workspace documentation bridge**. It queries Notion and knowledge base pages via topological traversals, creates new document nodes, and synchronizes document changes into the vector knowledge space.

## Tasks & Verbs

### `doc_search` - Documentation Query
| Verb | Description | Parameters |
|------|-------------|------------|
| `search_docs` | Search documentation pages by keywords | `query: str` |

### `page_management` - Page Lifecycle & Sync
| Verb | Description | Parameters |
|------|-------------|------------|
| `create_page` | Create a new Notion / Markdown page | `title: str, content: str` |
| `sync_knowledge_base` | Bulk-sync documentation into knowledge space | - |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `DOCS_WORKSPACE_SYNC_V1` | Documentation search, page CRUD, and workspace sync | `doc_search`, `page_management` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves documentation datasets and metadata |
