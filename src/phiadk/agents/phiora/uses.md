# PhiOra Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiOra** (Content-Addressed Data Layer, DataSet Resolution, and Vector Search).

---

## 1. Content-Addressed KV Storage

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Store and retrieve unstructured/structured objects by cryptographic hash
key = "employee:jane:profile"
data = {"email": "jane@phient.com", "role": "Principal Scientist", "level": "L7"}

put_res = client.phiora.kv.put(key, data)
print(f"Stored with Git SHA-1 Tree Hash: {put_res['commit_sha1']}")

# Retrieve value
retrieved = client.phiora.kv.get(key)
print("Retrieved Data:", retrieved)
```

---

## 2. Strict DataSet Separation (Data vs. Code)

```python
from phiadk import PhiADKClient
from phiadk._core import DataSet

client = PhiADKClient()

# Agents reference DataSets rather than embedding raw memory payloads
dataset_ref = DataSet(set_id="raw_telemetry_2026_08")

# Resolve DataSet via PhiOra Resolver
resolved_path = client.phiora.Resolver.resolve(dataset_ref)
print("Local Resolved Path:", resolved_path)
```

---

## 3. Vector Embeddings & Similarity Indexing

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Index dense vectors in geometric manifold space
client.phiora.Vector.insert(
    vector_id="vec_001",
    embedding=[0.12, -0.45, 0.88, 0.33],
    metadata={"entity": "Employee", "id": "jane@phient.com"}
)

# Perform nearest neighbor search
matches = client.phiora.Vector.query(
    query_vector=[0.10, -0.40, 0.85, 0.30],
    top_k=5
)

for m in matches:
    print(f"Matched: {m['vector_id']}, Distance: {m['distance']:.4f}")
```
