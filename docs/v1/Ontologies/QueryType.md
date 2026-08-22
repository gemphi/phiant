# QueryType (POntology Query Definitions & Signatures)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/queryTypes/{queryTypeApiName}` | Stable |
[**list**](#list) | **GET** `/v2/topos/queryTypes` | Stable |

---

# **get**

Retrieves the schema signature, input parameters, and return type of a registered POntology query type.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

qt = client.v2.topos.QueryType.get("find_collaborators")
print(f"Query: {qt.id} | Inputs: {list(qt.parameters.keys())}")
```
