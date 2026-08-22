# Core Topological Primitives (`Core/TopologyPrimitives.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/core`.
- **Phient Subsystem**: [`src/phiegg/_core/`](./phient/src/phiegg/_core/).

---

## 1. Simplicial Complex Elements

The foundation of Phient replaces relational silos with continuous topological manifolds:

| Primitive | Mathematical Concept | Phient Class | Description |
| :--- | :--- | :--- | :--- |
| **Node** | 0-Simplex (Vertex) | `Node` / `PNode` | Individual state vertex in a topological space. |
| **Edge** | 1-Simplex (Link) | `Edge` / `PEdge` | Directional link or relational fiber between nodes. |
| **Space** | Manifold | `Space` / `PSpace` | Geometric or semantic collection of connected nodes and morphisms. |
| **Morphism** | Mapping Function | `Morphism` / `PMorphism` | Structure-preserving transformation across spaces. |
| **Fiber Bundle** | Projection Space | `Fiber` / `PFiber` | Bundle projection linking disparate agent domains. |

---

## 2. Python SDK Usage

```python
from phiegg import Node, Space, Morphism, SimplexType

# Create a space and populate nodes
space = Space(space_id="knowledge_space", dimension=4)
node_a = Node(node_id="concept_quantum", simplex=SimplexType.POINT)
node_b = Node(node_id="concept_topos", simplex=SimplexType.POINT)

space.add_node(node_a)
space.add_node(node_b)

# Define morphism between nodes
morphism = Morphism(
    source_space="knowledge_space",
    target_space="knowledge_space",
    mapping_fn=lambda x: f"transformed_{x}"
)
result = morphism.execute("concept_quantum")
print("Transformed Output:", result)
```
