# 1-Simplices: Link Types & Relational Fibers (v2)

A **LinkType** represents a directional 1-simplex edge $e = (v_{\text{src}}, v_{\text{target}}) \in \mathcal{K}^1$ linking two 0-simplices.

---

## 1. Defining & Traversing Link Types

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# List active 1-simplex link types
link_types = client.v2.topos.link_types()
for link in link_types:
    print(f"1-Simplex: {link.id} ({link.source_object_type} ──► {link.target_object_type})")
```

---

## 2. Fiber Bundle Traversal
$$\pi: E \rightarrow B \quad \text{where} \quad \pi^{-1}(b) = F_b$$
1-simplex traversal maps a base object $b \in B$ to its fiber bundle elements $F_b$.
