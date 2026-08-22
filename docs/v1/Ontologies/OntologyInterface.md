# OntologyInterface / POntologyInterface (Polymorphic Contracts)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/interfaces/{interfaceApiName}` | Stable |
[**list**](#list) | **GET** `/v2/topos/interfaces` | Stable |
[**get_implementations**](#get_implementations) | **GET** `/v2/topos/interfaces/{interfaceApiName}/implementations` | Stable |

---

# **get_implementations**

Returns all 0-simplex instances implementing the specified interface across heterogeneous object types.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

interface = client.v2.topos.Interface.get("SearchableDocument")
implementations = interface.get_implementations()

for obj in implementations:
    print(f"[{obj.object_type_id}] ID: {obj.id} | Title: {obj.properties.get('title')}")
```
