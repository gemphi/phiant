# PhiRAG: Knowledge Retrieval & Augmentation Ontologylogy

PhiRAG maps unstructured document chunks into high-dimensional embedding spaces, executes semantic nearest-neighbor traversals, and applies structure-preserving morphisms to generate grounded LLM contexts.

## 1. RAG Ontologylogical Pipeline

```mermaid
graph TD
    Query["User Query String"] --> Embedding["Vector Embedding Space"]
    Embedding --> CosineTraversal["kNN Cosine Traversal"]
    
    subgraph KnowledgeSpace["Knowledge Base Space"]
        Chunk1["Document Chunk A"]
        Chunk2["Document Chunk B"]
        Chunk3["Document Chunk C"]
    end
    
    CosineTraversal --> KnowledgeSpace
    KnowledgeSpace --> ContextManifold["Ranked Context Manifold"]
    ContextManifold --> MorphismGen["Morphism: generate_answer"]
    MorphismGen --> GroundedAnswer["Grounded LLM Answer Node"]
```

### Space Representation
```
[ Query ] ──► [ Dense Vector ] ──(kNN Cosine)──► [ Knowledge Space (Collections) ]
                                                              │
                                                              ▼
[ Grounded Answer ] ◄──(LLM Generation Morphism)── [ Context Manifold ]
```

## 2. Morphism Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant PhiRAG as PhiRAGAgent
    participant Phiora as PhiOra (Vector & Datasets)
    participant PhiLLM as PhiLLM (Inference)

    Client->>PhiRAG: execute_verb('answer_query', query)
    PhiRAG->>Phiora: retrieve(query, top_k=5)
    Phiora-->>PhiRAG: [Chunk 1, Chunk 2, Chunk 3]
    PhiRAG->>PhiLLM: complete(prompt=context + query)
    PhiLLM-->>PhiRAG: Response Text
    PhiRAG-->>Client: { answer, sources }
```

## 3. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: `phiora` (Vector similarity search), `phillm` (Model generation)
- **Feeds into**: `phimen` (Executive decision context), `phidoc` (Doc generation)
