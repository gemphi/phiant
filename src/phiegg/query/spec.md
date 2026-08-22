# Query Paradigms Formal Specification (`spec.md`)

- **Package**: `phiegg.query`
- **Standard**: `MULTI_MODEL_QUERY_ENGINE_V1`
- **Version**: `1.0.0`

---

## 1. Supported Query Paradigms

| Paradigm | Builder Class | Method Chain Example | Storage Target |
| :--- | :--- | :--- | :--- |
| **ORM** | `Repository(T)` | `repo.save(entity)`, `repo.filter(department="Engineering")` | Git-backed KV |
| **RQL** | `RQL` | `client.rql("employees").select(["name"]).where("status == 'active'").execute()` | Tabular Datasets |
| **VQL** | `VQL` | `client.vql("knowledge").near_vector(v).top_k(3).execute()` | High-D Vector Index |
| **OQL** | `OQL` | `client.oql("alice@phient.com").traverse("reports_to").execute()` | POntology Simplicial Graph |
| **QML** | `QML` | `client.qml("circ").superposition([...]).apply_gate("H").born_measurement().execute()` | Complex Amplitude Space |
