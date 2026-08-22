# ActionType (Morphism Schema & Descriptors)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/actionTypes/{actionType}` | Stable |
[**list**](#list) | **GET** `/v2/topos/actionTypes` | Stable |
[**search**](#search) | **POST** `/v2/topos/actionTypes/search` | Public Beta |

---

# **get**

Gets a specific ActionType morphism definition by API name or ID.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **action_type** | `str` | The action type API name (e.g. `'promote_employee'`). | **Required** |
| **branch** | `Optional[str]` | The branch to read the definition from. | Optional |

### Return Type
`ActionType` (contains `id`, `display_name`, `description`, `parameters`, `status`)

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

action_type = client.v2.topos.ActionType.get("promote_employee")
print(f"Action: {action_type.display_name}")
print("Parameters:", action_type.parameters)
```

---

# **list**

Lists all available ActionType morphisms registered in the active POntology complex.

### Return Type
`List[ActionType]`

### Example

```python
actions = client.v2.topos.ActionType.list()
for action in actions:
    print(f"- {action.id}: {action.description}")
```
