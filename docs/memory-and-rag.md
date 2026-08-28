---
title: Memory & Semantic RAG
description: Context fabric, episodic recall, dense and sparse hybrid retrieval, vector indexing, and memory graph management.
---

# Memory & Semantic RAG Fabric

Large context windows alone cannot solve enterprise knowledge retrieval. Phient implements a layered memory hierarchy combining **working context memory**, **episodic recall**, and **hybrid dense/sparse Retrieval-Augmented Generation (RAG)**.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#38bdf8', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#818cf8', 'textColor': '#f8fafc', 'primaryTextColor': '#f8fafc', 'nodeTextColor': '#f8fafc', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Query[Incoming Task Query] --> Decomp[Query Decomposition & HyDE]
    
    subgraph Search ["Hybrid Retrieval Engine (PhiRAG)"]
        Decomp --> Dense[Dense Vector Search (ChromaDB / Qdrant)]
        Decomp --> Sparse[Sparse Lexical Search (BM25)]
        Dense --> Reciprocal[Reciprocal Rank Fusion (RRF)]
        Sparse --> Reciprocal
        Reciprocal --> ReRanker[Cross-Encoder Re-Ranker]
    end

    subgraph MemoryLayer ["Memory Fabric (PhiMen)"]
        ReRanker --> WorkingMem[Working Context Assembly]
        Episodic[Episodic Memory Graph] --> WorkingMem
    end

    WorkingMem --> Prompt[Optimized Context Window]
```

---

## 1. Hybrid Dense-Sparse Retrieval

Pure vector search often fails on exact keyword identifiers, version numbers, or code identifiers. Phient combines:
1. **Dense Vector Embeddings**: Semantics and conceptual meaning via high-dimensional embeddings (`text-embedding-3-large` or self-hosted models).
2. **BM25 Sparse Retrieval**: Precise keyword matching for symbols, IDs, and domain-specific acronyms.
3. **Cross-Encoder Re-Ranking**: Deep multi-vector scoring to discard irrelevant passages and surface the top precision context.

---

## 2. Episodic & Long-Term Memory Graphs

Managed by `phimen`, long-term memory tracks agent decisions and operator feedback across sessions:
- **Conversation Distillation**: Inactive threads are summarized into hierarchical semantic nodes.
- **Entity Knowledge Graphs**: Key entities (users, systems, policies, repositories) are tracked as interconnected graph vertices.
- **Zero Hallucination Anchors**: All retrieved knowledge chunks include cryptographic lineage back to the primary source document.
