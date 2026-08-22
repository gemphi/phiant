# POntology Queries & Query Types (v2)

POntology Queries execute deterministic graph evaluations, continuous distance traversals, and custom aggregation pipelines.

---

## 1. Executing Named POntology Queries

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Execute registered Ontologys query
result = client.v2.topos.queries.execute(
    query_type="find_collaborators",
    parameters={"employee_id": "jane@phient.com", "max_hops": 2}
)

print(f"Discovered {len(result['collaborators'])} network vertices.")
```
