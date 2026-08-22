# PhiBrd Formal Specification (`spec.md`)

- **Agent ID**: `phibrd`
- **Agent Name**: `PhiBrd`
- **Domain**: `onboarding`
- **Layer**: `AgentLayer.APPLICATION`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiBrdVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `ONBOARD_EMPLOYEE`| `"onboard_employee"`| `{"full_name": str, "email": str, "department": str, ...}` | `Fiber` dict | Multi-domain fiber bundle orchestration. |
| `GET_STATUS` | `"get_status"` | `{"onboarding_id": str}` | `{"status": str}` | Query progress across all domain fibers. |
| `GET_CHECKLIST` | `"get_checklist"` | `{}` | `{"checklist": List}` | Predefined 6-step onboarding task list. |

---

## 2. Supported Tasks (`PhiBrdTask`)

- `EMPLOYEE_ONBOARDING` (`"employee_onboarding"`)
- `ONBOARDING_STATUS` (`"onboarding_status"`)

---

## 3. Specifications (`PhiBrdSpec`)

- `CROSS_DOMAIN_ONBOARDING_V1` (`"CROSS_DOMAIN_ONBOARDING_V1"`)
