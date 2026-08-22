# Multi-Model Query Paradigms Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for all 5 query paradigms in Phient: **ORM**, **RQL** (Relational), **VQL** (Vector), **OQL** (Graph), and **QML** (Quantum).

---

## 1. Object-Ontologylogy Mapping (ORM)

```python
from phiegg import PhiEggClient
from phiegg.query import Repository, StringField, IntegerField

class EmployeeModel:
    email = StringField(primary_key=True)
    department = StringField()
    vacation_days = IntegerField()

repo = Repository(EmployeeModel)
engineers = repo.filter(department="Engineering")
print(f"Engineers Count: {len(engineers)}")
```

---

## 2. Relational Query Language (RQL)

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Relational filtering, projection, and ordering
results = (
    client.rql("employees")
    .filter("vacation_days > 10")
    .select(["email", "department", "vacation_days"])
    .order_by("vacation_days", ascending=False)
    .limit(5)
    .execute()
)
print("RQL Results:", results)
```

---

## 3. Vector Query Language (VQL)

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Dense semantic vector similarity query
matches = (
    client.vql("knowledge_embeddings")
    .similarity_search([0.15, -0.42, 0.88, 0.12])
    .top_k(3)
    .threshold(0.7)
    .execute()
)
print("VQL Matches:", matches)
```

---

## 4. Object Query Language (OQL - Graph Traversals)

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Graph node and edge multi-hop traversals
path = (
    client.oql("jane@phient.com")
    .traverse("reports_to")
    .traverse("department_leads")
    .execute()
)
print("Graph Traversal Path:", path)
```

---

## 5. Quantum Model Language (QML)

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Complex quantum parameter superposition and measurement
qml_res = (
    client.v2.qml("classifier_space")
    .superposition(["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
    .apply_gate("H", qubit=0)
    .entangle(0, 1)
    .decoherence_filter(0.15)
    .born_measurement(0.05)
    .execute()
)
print("QML Observed State:", qml_res.observed_state)
print("Born Probabilities:", qml_res.probabilities)
```
