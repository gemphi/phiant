# Relational Queries & RQL (`SqlQueries/RelationalRQL.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/sql_queries` (`SqlQuery.md`).
- **Phient Subsystem**: [`src/phiadk/query/rql.py`](./phient/src/phiadk/query/rql.py).

---

## 1. RQL Relational Query Language

RQL allows executing structured SQL-like relational filters, column projections, sorting, and pagination across POntology datasets.

```mermaid
graph LR
    RQL["client.rql('employees')"] --> Filter[".filter('vacation_days > 5')"]
    Filter --> Select[".select(['email', 'title'])"]
    Select --> Execute[".execute() -> Rows"]
```

---

## 2. Python SDK Usage

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Execute relational query
results = (
    client.rql("employees")
    .filter("department == 'Engineering'")
    .select(["email", "title", "vacation_days"])
    .order_by("vacation_days", ascending=False)
    .limit(10)
    .execute()
)
print("Relational Query Results:", results)
```
