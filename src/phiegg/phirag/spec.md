# PhiRAG Formal Specification (`spec.md`)

- **Agent ID**: `phirag`
- **Agent Name**: `PhiRAG`
- **Domain**: `knowledge_rag`
- **Layer**: `AgentLayer.DATA`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiRAGVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `RETRIEVE` | `"retrieve"` | `{"query": str, "top_k": int}` | `List[Dict]` | Cosine nearest-neighbor vector traversal. |
| `GENERATE` | `"generate"` | `{"query": str, "chunks": List}` | `{"answer": str}` | LLM prompt augmentation and response synthesis. |
| `ANSWER_QUERY` | `"answer_query"` | `{"query": str, "top_k": int}` | `{"answer": str, "sources": List}` | Composite retrieval + generation morphism. |
| `INDEX` | `"index"` | `{"text": str, "doc_id": str}` | `{"indexed": int}` | Chunking and vector insertion into `PhiOra`. |

---

## 2. Supported Tasks (`PhiRAGTask`)

- `KNOWLEDGE_RETRIEVAL` (`"knowledge_retrieval"`)
- `CONTEXT_AUGMENTATION` (`"context_augmentation"`)

---

## 3. Specifications (`PhiRAGSpec`)

- `RAG_KNOWLEDGE_PIPELINE_V1` (`"RAG_KNOWLEDGE_PIPELINE_V1"`)
