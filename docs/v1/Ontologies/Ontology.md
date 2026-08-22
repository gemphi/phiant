# POntology / Ontology (Simplicial Complex Namespace)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos` | Stable |
[**get_schema**](#get_schema) | **GET** `/v2/topos/schema` | Stable |
[**get_mermaid**](#get_mermaid) | **GET** `/v2/topos/mermaid` | Stable |

---

# **get_schema**

Retrieves the complete simplicial complex schema definitions including all 0-simplices (ObjectTypes), 1-simplices (LinkTypes), and state morphisms (ActionTypes).

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

schema = client.v2.topos.get_schema()
print(f"Registered 0-Simplices: {list(schema['object_types'].keys())}")
print(f"Registered 1-Simplices: {list(schema['link_types'].keys())}")
print(f"Registered Action Morphisms: {list(schema['action_types'].keys())}")
```
