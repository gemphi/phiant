# ActionTypeFullMetadata (Introspection & Full Descriptors)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/actionTypes/{actionType}/fullMetadata` | Stable |

---

# **get**

Retrieves the complete structural metadata of an action morphism, including type constraints, rules, and affected 0-simplex object types.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **action_type** | `str` | The action morphism identifier. | **Required** |

### Return Type
`ActionTypeFullMetadata`

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

metadata = client.v2.topos.ActionTypeFullMetadata.get("promote_employee")
print(f"Affected Object Types: {metadata.affected_object_types}")
print(f"Status: {metadata.status}")
```
