# PhiRAG Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiRAG** (Retrieval-Augmented Generation and Context Retrieval).

---

## 1. Document Ingestion & Contextual Chunking

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Ingest and chunk markdown technical specifications
doc_text = """
# Architecture Specification
PhiEgg uses simplicial complexes to model enterprise relationships.
## 0-Simplices
0-simplices represent vertices like Employee, GitCommit, Document.
"""

chunks = client.phirag.chunker.chunk_markdown(doc_text, max_chunk_size=200)
for idx, chunk in enumerate(chunks):
    print(f"Chunk #{idx}: Heading '{chunk.heading}' -> {chunk.text[:50]}...")
```

---

## 2. Vector Retrieval & Similarity Search

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Retrieve top relevant context chunks for a user query
search_results = client.phirag.retriever.search_knowledge(
    query="How are 0-simplices defined in the topology?",
    top_k=3,
    min_score=0.75
)

for res in search_results:
    print(f"Score: {res['score']:.3f} | Title: {res['title']} | Snippet: {res['content'][:80]}...")
```

---

## 3. RAG-Augmented Agent Answering

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Answer question using retrieved context + LLM synthesis
response = client.phirag.ask_rag(
    question="What is the policy for requesting annual leave?",
    knowledge_space="hr_policies"
)

print("Answer:", response["answer"])
print("Citations / Source Chunks:", response["citations"])
```
