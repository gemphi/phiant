# PhiMen Formal Specification (`spec.md`)

- **Agent ID**: `phimen`
- **Agent Name**: `PhiMen`
- **Domain**: `executive_strategy`
- **Layer**: `AgentLayer.EXECUTIVE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiMenVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `ASSESS_OBJECTIVE` | `"assess_objective"` | `{"objective": str}` | `Fiber` dict | Multi-domain survey and readiness assessment. |
| `DELEGATE_STRATEGY`| `"delegate_strategy"`| `{"strategy": str, "domains": List}` | `Fiber` dict | Construct and dispatch strategic morphism bundle. |
| `SYNTHESIZE_REPORT`| `"synthesize_report"`| `{"fiber_id": str}` | `{"report": str}` | Executive summary synthesis across domain results. |

---

## 2. Supported Tasks (`PhiMenTask`)

- `STRATEGIC_ASSESSMENT` (`"strategic_assessment"`)
- `EXECUTIVE_ORCHESTRATION` (`"executive_orchestration"`)

---

## 3. Specifications (`PhiMenSpec`)

- `EXECUTIVE_STRATEGY_ORCHESTRATION_V1` (`"EXECUTIVE_STRATEGY_ORCHESTRATION_V1"`)
