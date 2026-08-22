# PhiBot Formal Specification (`spec.md`)

- **Agent ID**: `phibot`
- **Agent Name**: `PhiBot`
- **Domain**: `automation`
- **Layer**: `AgentLayer.APPLICATION`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiBotVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `LIST_PLAYBOOKS` | `"list_playbooks"` | `{"category": Optional[str]}` | `Traversal` dict | Traversal over registered playbook nodes. |
| `EXECUTE_PLAYBOOK`| `"execute_playbook"`| `{"playbook_id": str}` | `Morphism` dict | Execute DAG state transitions. |
| `CHECK_STATUS` | `"check_status"` | `{"execution_id": str}` | `{"status": str}` | Query playbook run outcome. |

---

## 2. Supported Tasks (`PhiBotTask`)

- `PLAYBOOK_EXECUTION` (`"playbook_execution"`)
- `STATUS_MONITORING` (`"status_monitoring"`)

---

## 3. Specifications (`PhiBotSpec`)

- `AUTOMATION_WORKFLOW_V1` (`"AUTOMATION_WORKFLOW_V1"`)
