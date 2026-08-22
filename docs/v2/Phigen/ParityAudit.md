# ParityAudit (Palantir Architecture & Documentation Audit)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**audit_parity**](#audit_parity) | **POST** `/v2/phigen/parity` | Stable |

---

# **audit_parity**

Scans the Phient codebase and evaluates full 100% structural and documentation parity against the Palantir Foundry Python SDK reference (`REFS/palantir/foundry-platform-python/`).

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **strict_mode** | `Optional[bool]` | When `True`, fails on missing optional documentation sections. | Optional (default: `False`) |

### Return type

**ParityReport** (`total_palantir_modules`, `matching_phient_modules`, `parity_percentage`, `total_domain_agents`, `agents_healthy`, `status`)

### Example

```python
from phiegg import PhiEggClient
from pprint import pprint

client = PhiEggClient()

try:
    report = client.phigen.audit_parity()
    print("Palantir Parity Audit Report:\n")
    pprint(report.to_dict())
    print(f"\nOverall Health: {report.status} ({report.parity_percentage}%)")
except Exception as e:
    print(f"PhiGen parity audit error: {e}\n")
```

### Authorization

Requires developer role.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `ParityReport` | Parity audit successfully computed. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)
