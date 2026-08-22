# LinkedObject (1-Simplex Relational Fiber Traversal)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**list_linked_objects**](#list_linked_objects) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/links/{linkType}` | Stable |
[**get_linked_object**](#get_linked_object) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/links/{linkType}/{targetKey}` | Stable |

---

# **list_linked_objects**

Traverses the 1-simplex fiber relations emanating from a source 0-simplex vertex to retrieve all connected target vertices.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Source object type ID. | **Required** |
| **primary_key** | `str` | Source object primary key. | **Required** |
| **link_type** | `str` | Link type API identifier. | **Required** |

### Return Type
`List[POntologyObject]`

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# List all documents authored by employee
docs = client.v2.topos.LinkedObject.list_linked_objects(
    object_type="Employee",
    primary_key="jane@phient.com",
    link_type="author_documents"
)

for doc in docs:
    print(f"Authored Doc: {doc.id} | Title: {doc.properties['title']}")
```
