# Action

Method | HTTP request | Release Stage |
:--- | :--- | :--- |
[**apply**](#apply) | **POST** `/v2/topos/actions/{action}/apply` | Stable |
[**apply_batch**](#apply_batch) | **POST** `/v2/topos/actions/{action}/applyBatch` | Stable |
[**apply_batch_with_overrides**](#apply_batch_with_overrides) | **POST** `/v2/topos/actions/{action}/applyBatchWithOverrides` | Private Beta |
[**apply_with_overrides**](#apply_with_overrides) | **POST** `/v2/topos/actions/{action}/applyWithOverrides` | Private Beta |
[**validate**](#validate) | **POST** `/v2/topos/actions/{action}/validate` | Stable |

---

# **apply**

Applies an action morphism against the POntology manifold using the given typed parameters.

Edits to 0-simplices (objects) or 1-simplices (links) in POntology are immediately consistent across all registered simplicial subcomplexes and emit a SHA-1 content-addressed commit transaction receipt.

Note that a 200 HTTP status code indicates that the request was accepted and processed by the engine. Inspect the `validation_result` in the response body to determine if side-effect state constraints passed.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **action** | `str` | The API identifier of the action morphism to apply. | **Required** |
| **parameters** | `Dict[str, Any]` | Typed parameter dictionary matching the `ActionType` schema definition. | **Required** |
| **branch** | `Optional[str]` | The target DAG branch (defaults to `'master'`). | Optional |
| **scenario_rid** | `Optional[str]` | The RID of an isolated `POntologyScenario` sandbox to execute within. | Optional |
| **transaction_id** | `Optional[str]` | The ID of an active `POntologyTransaction` for multi-action atomic commits. | Optional |
| **return_edits** | `Optional[bool]` | Whether to return modified 0-simplex entity snapshots in response. | Optional (default: `True`) |

### Return type

**SyncApplyActionResponse** (`action_type`, `status`, `parameters`, `commit_sha1`, `affected_objects`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

# ActionTypeApiName | The API name of the action to apply
action = "onboard_employee"

# Parameters matching the action schema
parameters = {
    "email": "jane.smith@phient.com",
    "name": "Jane Smith",
    "department": "Engineering",
    "role": "AI Systems Engineer",
    "start_date": "2026-09-01"
}

branch = "master"
scenario_rid = None
transaction_id = None

try:
    api_response = client.v2.topos.Action.apply(
        action=action,
        parameters=parameters,
        branch=branch,
        scenario_rid=scenario_rid,
        transaction_id=transaction_id,
    )
    print("Action applied successfully. Morphism commit:\n")
    pprint(api_response)
except Exception as e:
    print(f"POntology error when applying action: {e}\n")
```

### Authorization

Requires write permissions on the affected object types in the POntology manifold.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `SyncApplyActionResponse` | Action successfully validated, applied, and committed. | `application/json` |
| **400** | `ActionValidationError` | Input parameters failed schema type or value constraint validation. | `application/json` |
| **404** | `ActionNotFoundError` | Action type identifier not registered in POntology. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **apply_batch**

Applies multiple action morphism invocations (of the same Action Type) atomically in a single network request.

Up to 50 actions may be applied in one batch call. All side-effects are verified against topological invariants before atomic state emission.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **action** | `str` | The API name of the action type. | **Required** |
| **requests** | `List[Dict[str, Any]]` | List of parameter dictionaries for each individual action invocation. | **Required** |
| **branch** | `Optional[str]` | The target branch. | Optional |

### Return type

**BatchApplyActionResponse** (`status`, `applied_count`, `commit_sha1`, `results`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

action = "update_security_badge"
batch_requests = [
    {"employee_id": "emp_101", "badge_level": "LEVEL_3"},
    {"employee_id": "emp_102", "badge_level": "LEVEL_4"},
    {"employee_id": "emp_103", "badge_level": "LEVEL_2"},
]

try:
    response = client.v2.topos.Action.apply_batch(
        action=action,
        requests=batch_requests,
        branch="master"
    )
    print("Batch apply response:\n")
    pprint(response)
except Exception as e:
    print(f"POntology error when calling Action.apply_batch: {e}\n")
```

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `BatchApplyActionResponse` | All batch items successfully validated and committed. | `application/json` |
| **400** | `BatchValidationError` | One or more items failed schema checks. Transaction aborted. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **validate**

Validates action parameters against schema contracts and topological security constraints without committing state changes.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **action** | `str` | Action type API name. | **Required** |
| **parameters** | `Dict[str, Any]` | Parameters to validate. | **Required** |

### Return type

**ValidationResult** (`result: "VALID" | "INVALID"`, `validation_errors: List[str]`)

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

check = client.v2.topos.Action.validate(
    action="onboard_employee",
    parameters={"email": "invalid-email-format"}
)

if check["result"] == "VALID":
    print("Validation passed. Safe to apply.")
else:
    print(f"Validation errors: {check['validation_errors']}")
```

[[Back to top]](#) [[Back to API list]](../../../README.md)
