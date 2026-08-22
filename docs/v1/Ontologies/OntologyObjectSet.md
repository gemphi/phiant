# OntologyObjectSet / POntologyObjectSet (Submanifold Operations)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**filter**](#filter) | **POST** `/v2/topos/objectSets/filter` | Stable |
[**aggregate**](#aggregate) | **POST** `/v2/topos/objectSets/aggregate` | Stable |
[**union**](#union) | **POST** `/v2/topos/objectSets/union` | Stable |
[**intersect**](#intersect) | **POST** `/v2/topos/objectSets/intersect` | Stable |

---

# **filter**

Filters a collection of 0-simplices producing a continuous topological submanifold.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

active_staff = (
    client.v2.topos.ObjectSet.get("Employee")
    .filter(department="Engineering", status="active")
    .order_by("start_date", ascending=False)
    .take(25)
)

for staff in active_staff:
    print(f"- {staff.id}: {staff.properties['title']}")
```
