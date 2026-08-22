---
outline: deep
---

# PhiRAG

> Knowledge retrieval, semantic vector search, document indexing, and context augmentation.

| | |
|---|---|
| **ID** | `phirag` |
| **Class** | `PhiRAGAgent` / `PhiRAGClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Data |
| **Domain** | `knowledge_rag` |
| **File** | `phiadk/phirag/` |
| **Schema** | `phiadk/phirag/schema.json` |

## What PhiRAG Does

PhiRAG executes **retrieval-augmented generation** across enterprise knowledge bases. It indexes unstructured documents, executes similarity traversals, and transforms relevant contexts into grounded LLM responses using structure-preserving morphisms.

## Tasks & Verbs

### `vector_search` - Semantic Search
| Verb | Description | Parameters |
|------|-------------|------------|
| `retrieve` | Retrieve top-k semantic chunks matching query | `query: str, top_k: int` |
| `search` | Search specific collection within knowledge space | `query: str, collection: str` |

### `context_augmentation` - Prompt & Context Synthesis
| Verb | Description | Parameters |
|------|-------------|------------|
| `generate_answer` | Execute context→answer generation morphism | `query: str, context: list` |
| `answer_query` | Retrieve context and generate grounded answer in single cycle | `query: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `RAG_VECTOR_STORE_V1` | Semantic vector search with document chunking, embedding, and context augmentation | `vector_search`, `context_augmentation` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves underlying vector indices and fallback datasets |
