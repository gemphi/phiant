# PhiOne Formal Specification (`spec.md`)

- **Agent ID**: `phione`
- **Agent Name**: `PhiOne`
- **Domain**: `identity_hr`
- **Layer**: `AgentLayer.INFRASTRUCTURE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiOneVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `LOOKUP_EMPLOYEE` | `"lookup_employee"` | `{"email": str}` | `EmployeeNode` dict | 0-simplex resolution in Enterprise HRIS dataset. |
| `LOOKUP_IDENTITY` | `"lookup_identity"` | `{"email": str}` | `UserIdentity` dict | 0-simplex resolution in Entra ID space. |
| `TRAVERSE_TEAM` | `"traverse_team"` | `{"department": str}` | `Traversal` dict | 1-simplex tree traversal of org hierarchy. |
| `GET_HEADCOUNT` | `"get_headcount"` | `{"department": Optional[str]}` | `{"headcount": int}` | Aggregation over workforce manifold. |
| `PROVISION_IDENTITY`| `"provision_identity"`| `{"email": str, "display_name": str}` | `UserIdentity` | Mutating morphism adding user to Entra ID. |
| `DISABLE_IDENTITY` | `"disable_identity"` | `{"email": str}` | `{"status": "disabled"}` | State transition flag set to inactive. |
| `ADD_TO_GROUP` | `"add_to_group"` | `{"email": str, "group": str}` | `{"status": "added"}` | 1-simplex edge creation to security group. |
| `ASSIGN_LICENSE` | `"assign_license"` | `{"email": str, "sku": str}` | `{"status": "assigned"}` | 1-simplex edge creation to license node. |
| `GET_LEAVE_BALANCE`| `"get_leave_balance"`| `{"email": str}` | `List[LeaveBalance]` | Query over leave ledger space. |

---

## 2. Supported Tasks (`PhiOneTask`)

- `EMPLOYEE_LIFECYCLE` (`"employee_lifecycle"`)
- `IDENTITY_GOVERNANCE` (`"identity_governance"`)
- `LEAVE_MANAGEMENT` (`"leave_management"`)

---

## 3. Specifications (`PhiOneSpec`)

- `IDENTITY_HR_LIFECYCLE_V1` (`"IDENTITY_HR_LIFECYCLE_V1"`)
