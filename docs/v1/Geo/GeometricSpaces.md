# Geo & High-Dimensional Geometric Spaces (`Geo/GeometricSpaces.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/geo`.
- **Phient Subsystem**: [`src/phiegg/phical/semantic_search.py`](./phient/src/phiegg/phical/semantic_search.py) & [`src/phiegg/phiora/store.py`](./phient/src/phiegg/phiora/store.py).

---

## 1. High-Dimensional Geometric Manifolds

Entities in Phient are projected into high-dimensional geometric spaces where distances represent semantic, organizational, or geospatial proximity.

```mermaid
graph TD
    QueryVector["Query Point [x0, x1, ..., xN]"] --> Manifold["Continuous Manifold Distance Probe"]
    Manifold --> NearestNeighbors["Top-K Projected Simplex Vertices"]
```

---

## 2. Python SDK Usage

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# High-dimensional geometric search
results = client.phical.search.superposition_search(
    query="security compliance policy for data centers",
    top_k=3
)
for r in results:
    print(f"Vertex: {r['id']} | Amplitude: {r['amplitude']}")
```
