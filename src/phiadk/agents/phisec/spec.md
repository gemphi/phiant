# PhiSec Formal Specification (`spec.md`)

- **Agent ID**: `phisec`
- **Agent Name**: `PhiSec`
- **Domain**: `security`
- **Layer**: `AgentLayer.INFRASTRUCTURE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiSecVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `SCAN_VULNERABILITY`| `"scan_vulnerability"`| `{"target": str}` | `PSecurityScan` dict | Static vulnerability check. |
| `VERIFY_TOKEN` | `"verify_token"` | `{"token": str}` | `PTokenVerification` dict | Authenticate and extract claims. |
| `ENFORCE_POLICY` | `"enforce_policy"` | `{"resource": str, "action": str, "subject": str}` | `dict` | Evaluate access control rule. |
| `AUDIT_ACCESS` | `"audit_access"` | `{"subject": str}` | `dict` | Retrieve access audit log. |
| `QUARANTINE_THREAT` | `"quarantine_threat"` | `{"threat_id": str}` | `dict` | Isolate malicious node or dataset. |

---

## 2. Supported Tasks (`PhiSecTask`)

- `SECURITY_SCAN` (`"security_scan"`)
- `ACCESS_AUDIT` (`"access_audit"`)
- `POLICY_ENFORCEMENT` (`"policy_enforcement"`)

---

## 3. Specifications (`PhiSecSpec`)

- `SECURITY_GOVERNANCE_V1` (`"SECURITY_GOVERNANCE_V1"`)
