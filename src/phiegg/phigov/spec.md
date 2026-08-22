# PhiGov Formal Specification (`spec.md`)

- **Agent ID**: `phigov`
- **Agent Name**: `PhiGov`
- **Domain**: `governance`
- **Layer**: `AgentLayer.EXECUTIVE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiGovVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `CHECK_COMPLIANCE` | `"check_compliance"` | `{"regulation": str}` | `PComplianceReport` dict | Evaluate compliance against regulation. |
| `AUDIT_LINEAGE` | `"audit_lineage"` | `{"asset_id": str}` | `PLineageAudit` dict | Trace asset provenance through commit tree. |
| `GET_COMPLIANCE_SCORE`| `"get_compliance_score"`| `{}` | `dict` | Overall enterprise regulatory scores. |
| `EVALUATE_POLICY` | `"evaluate_policy"` | `{"policy_id": str}` | `dict` | Validate specific policy criteria. |
| `REGISTER_REGULATION`| `"register_regulation"`| `{"regulation": str}` | `dict` | Register new compliance standard. |

---

## 2. Supported Tasks (`PhiGovTask`)

- `COMPLIANCE_CHECK` (`"compliance_check"`)
- `LINEAGE_AUDIT` (`"lineage_audit"`)
- `REGULATION_REGISTRY` (`"regulation_registry"`)

---

## 3. Specifications (`PhiGovSpec`)

- `ENTERPRISE_GOVERNANCE_V1` (`"ENTERPRISE_GOVERNANCE_V1"`)
