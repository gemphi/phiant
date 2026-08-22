# RAG Pipeline Specification

## 1. Overview

The Retrieval-Augmented Generation (RAG) pipeline grounds M-KOPA's Knowledge Agent in real organisational context. It ingests documents from Notion, internal wikis, and uploaded files — then chunks, embeds, stores, and retrieves them for contextual LLM responses.

## 2. Pipeline Stages

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Ingest  │───►│  Chunk   │───►│  Embed   │───►│  Store   │───►│ Retrieve │
│          │    │          │    │          │    │ ChromaDB │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                                     │
                                                               ┌─────▼─────┐
                                                               │  Re-rank  │
                                                               └─────┬─────┘
                                                                     │
                                                               ┌─────▼─────┐
                                                               │ Generate  │
                                                               └───────────┘
```

## 3. Document Ingestion

### Supported Sources

| Source | Connector | Sync Method |
|--------|-----------|-------------|
| Notion | Notion API | Incremental (last_edited_time) |
| Markdown files | File system | File watcher |
| PDF documents | PyPDF2 | Manual upload |
| Google Docs | (future) | OAuth sync |

### Ingestion Schema

```python
@dataclass
class IngestedDocument:
    doc_id: str              # UUID
    source: str              # "notion", "file", "pdf"
    source_id: str           # Original ID in source system
    title: str               # Document title
    content: str             # Raw text content
    content_type: str        # "markdown", "plain", "html"
    metadata: dict           # Source-specific metadata
    ingested_at: datetime
    last_modified: datetime
    checksum: str            # SHA-256 for dedup
```

## 4. Chunking Strategy

### Semantic Chunking

```python
class ChunkingConfig:
    strategy: str = "semantic"       # "semantic" | "fixed" | "recursive"
    chunk_size: int = 512            # Target tokens per chunk
    chunk_overlap: int = 50          # Overlap tokens between chunks
    min_chunk_size: int = 100        # Minimum viable chunk
    separators: list = [             # Split boundaries (priority order)
        "\n## ",                     # H2 headers
        "\n### ",                    # H3 headers
        "\n\n",                      # Paragraph breaks
        "\n",                        # Line breaks
        ". ",                        # Sentences
    ]
```

### Chunk Schema

```python
@dataclass
class DocumentChunk:
    chunk_id: str            # UUID
    doc_id: str              # Parent document
    content: str             # Chunk text
    chunk_index: int         # Position in document
    token_count: int         # Actual token count
    metadata: dict           # Inherited from document
    # Enrichments
    heading_hierarchy: list  # ["Section", "Subsection"]
    summary: str             # Optional LLM-generated summary
```

### Chunking Rules

1. Never split mid-sentence
2. Preserve heading hierarchy in metadata
3. Tables kept as single chunks (even if > chunk_size)
4. Code blocks kept as single chunks
5. Lists kept together when possible

## 5. Embedding

### Configuration

```python
class EmbeddingConfig:
    # Primary: OpenAI (best quality for English)
    provider: str = "openai"
    model: str = "text-embedding-3-small"
    dimensions: int = 1536
    batch_size: int = 100

    # Fallback: Local model (no API dependency)
    fallback_provider: str = "sentence-transformers"
    fallback_model: str = "all-MiniLM-L6-v2"
    fallback_dimensions: int = 384
```

### Embedding Cache

- Embeddings cached by `chunk_id + checksum`
- Re-embed only when content changes
- Batch processing for bulk ingestion

## 6. Vector Store (ChromaDB)

### Collections

| Collection | Contents | Embedding Model |
|-----------|----------|----------------|
| `phient_policies` | HR, IT, Security policies | text-embedding-3-small |
| `phient_technical` | Technical documentation, runbooks | text-embedding-3-small |
| `phient_processes` | Business processes, SOPs | text-embedding-3-small |
| `phient_general` | General knowledge, FAQs | text-embedding-3-small |

### Metadata Fields

```python
metadata_schema = {
    "source": str,           # "notion", "file", "pdf"
    "source_id": str,        # Original document ID
    "title": str,            # Document title
    "section": str,          # Section heading
    "department": str,       # "engineering", "hr", "finance"
    "country": str,          # "KE", "UG", "NG", "GH", "ZA", "GB"
    "last_modified": str,    # ISO timestamp
    "access_level": str,     # "public", "internal", "restricted"
}
```

## 7. Retrieval

### Hybrid Search

```python
class RetrievalConfig:
    search_type: str = "hybrid"      # "semantic" | "keyword" | "hybrid"
    semantic_weight: float = 0.7     # Weight for semantic similarity
    keyword_weight: float = 0.3      # Weight for BM25 keyword match
    top_k: int = 10                  # Initial retrieval count
    similarity_threshold: float = 0.3 # Minimum similarity score
    metadata_filters: dict = {}      # Optional metadata filtering
```

### Query Enhancement

1. **Query expansion**: LLM rewrites query for better retrieval
2. **Multi-query**: Generate 3 query variants, merge results
3. **Metadata filtering**: Filter by department, country, access level

## 8. Re-ranking

### Cross-Encoder Re-ranking

```python
class RerankConfig:
    enabled: bool = True
    model: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"  # or LLM-based
    top_k: int = 5              # Final number of chunks after re-rank
    min_score: float = 0.1      # Minimum re-rank score
```

### LLM-based Re-ranking (Alternative)

```
Given the query: "{query}"

Rank these passages by relevance (most relevant first):
[1] {passage_1}
[2] {passage_2}
...

Return ranked list with relevance scores.
```

## 9. Response Generation

### Context Template

```
You are answering a question about M-KOPA's internal knowledge.

Context (retrieved from internal documents):
---
{chunk_1.content}
Source: {chunk_1.title} | Section: {chunk_1.section}
---
{chunk_2.content}
Source: {chunk_2.title} | Section: {chunk_2.section}
---

Question: {user_query}

Instructions:
1. Answer ONLY based on the provided context
2. Cite sources using [Source: document_title]
3. If the context doesn't contain the answer, say "I don't have information about this in our knowledge base."
4. Be specific and quote relevant text when applicable
```

## 10. Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Retrieval latency | < 500ms | P95 |
| Re-rank latency | < 200ms | P95 |
| End-to-end RAG | < 3s | P95 |
| Retrieval recall | > 0.85 | Evaluation set |
| Answer faithfulness | > 0.90 | LLM-as-judge |
| Chunk coverage | > 95% | Ingested vs total docs |
