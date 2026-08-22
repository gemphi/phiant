# OntologyObject / POntologyObject (Runtime Vertices)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}` | Stable |
[**list**](#list) | **GET** `/v2/topos/objects/{objectType}` | Stable |
[**search**](#search) | **POST** `/v2/topos/objects/{objectType}/search` | Stable |

---

# **get**

Retrieves a single 0-simplex object by primary key.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | The object type API name. | **Required** |
| **primary_key** | `str` | Primary key value. | **Required** |

### Return Type
`POntologyObject`

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

emp = client.v2.topos.Object.get("Employee", "jane@phient.com")
print("Properties:", emp.properties)
```
