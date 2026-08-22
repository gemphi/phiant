---
outline: deep
---

# PhiOne

> User identity & SSO, Entra ID synchronization, and HR employee space management authority.

| | |
|---|---|
| **ID** | `phione` |
| **Class** | `PhiOneAgent` / `PhiOneClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Infrastructure |
| **Domain** | `identity_hr` |
| **File** | `phiegg/phione/` |
| **Schema** | `phiegg/phione/schema.json` |

## What PhiOne Does

PhiOne is the **identity and workforce topology authority** for the ecosystem. It manages user accounts, Entra ID groups/licenses, employee records, org-chart traversals, headcount analytics, and leave balances.

## Tasks & Verbs

### `employee_operations` - Employee Directory & Hierarchy
| Verb | Description | Parameters |
|------|-------------|------------|
| `lookup_employee` | Look up employee profile by email | `email: str` |
| `traverse_team` | Traverse department team members | `department: str` |
| `headcount_report` | Generate global/regional headcount breakdown | `group_by: str` |
| `org_structure` | Traverse management reporting tree | - |

### `identity_management` - Microsoft Entra ID Operations
| Verb | Description | Parameters |
|------|-------------|------------|
| `lookup_identity` | Look up Entra ID user identity node | `email: str` |
| `provision_identity` | Provision user account (Approval-gated) | `user_data: dict` |
| `disable_identity` | Disable account (Approval-gated) | `email: str` |
| `add_to_group` | Add identity to security group | `email: str, group_name: str` |
| `remove_from_group` | Remove identity from group | `email: str, group_name: str` |
| `assign_license` | Assign M365/cloud license (Approval-gated) | `email: str, license_name: str` |

### `leave_operations` - Leave & PTO Tracking
| Verb | Description | Parameters |
|------|-------------|------------|
| `get_leave_balance` | Query available, used, and pending leave balances | `email: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `USER_IDENTITY_SSO_V1` | User authentication, SSO, and Entra ID identity management | `identity_management` |
| `HR_EMPLOYEE_DIRECTORY_V1` | Employee directory lookups, org traversals, headcount, and leave balances | `employee_operations`, `leave_operations` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves employee datasets and identity stores |
