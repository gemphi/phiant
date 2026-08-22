# POntologyObjectSet / ObjectSet

Method | HTTP request | Release Stage |
:--- | :--- | :--- |
[**aggregate**](#aggregate) | **POST** `/v2/topos/objectSets/aggregate` | Stable |
[**create_temporary**](#create_temporary) | **POST** `/v2/topos/objectSets/createTemporary` | Public Beta |
[**filter**](#filter) | **POST** `/v2/topos/objectSets/filter` | Stable |
[**load**](#load) | **POST** `/v2/topos/objectSets/loadObjects` | Stable |
[**union**](#union) | **POST** `/v2/topos/objectSets/union` | Stable |
[**intersect**](#intersect) | **POST** `/v2/topos/objectSets/intersect` | Stable |
[**subtract**](#subtract) | **POST** `/v2/topos/objectSets/subtract` | Stable |

---

# **filter**

Filters a collection of 0-simplices using chained predicates producing an immutable topological submanifold.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Target object type. | **Required** |
| **where** | `Dict[str, Any]` | Filter query dictionary (e.g. `{"type": "eq", "field": "dept", "value": "AI"}`). | **Required** |

### Return type

**POntologyObjectSet**

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Get filtered object set
active_engineers = (
    client.v2.topos.ObjectSet.of_type("Employee")
    .filter(lambda e: e.get("department") == "Engineering" and e.get("status") == "active")
)

print(f"Total matching active engineers: {active_engineers.count()}")
for emp in active_engineers.to_list():
    print(f" - {emp['primary_key']}: {emp['properties'].get('name')}")
```

### Authorization

Requires read permissions on the target object manifold.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `POntologyObjectSet` | Evaluated submanifold subset. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **aggregate**

Aggregates objects present in the `POntologyObjectSet` by computing statistical summaries across continuous property dimensions.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **aggregation** | `List[Dict[str, str]]` | Metric aggregations (e.g. `[{"type": "avg", "field": "tenure"}]`). | **Required** |
| **group_by** | `List[Dict[str, Any]]` | Grouping buckets (ranges, exact values, date histograms). | **Required** |

### Return type

**AggregateObjectsResponse**

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

results = (
    client.v2.topos.ObjectSet.of_type("Employee")
    .aggregate(
        aggregation=[{"type": "avg", "field": "salary", "name": "mean_salary"}],
        group_by=[{"field": "department", "type": "exact"}]
    )
)
pprint(results)
```

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **union**

Computes the topological union manifold of two disjoint or overlapping ObjectSets.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **other_set** | `POntologyObjectSet` | ObjectSet to combine with. | **Required** |

### Return type

**POntologyObjectSet**

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

ny_staff = client.v2.topos.ObjectSet.of_type("Employee").filter(lambda e: e.get("city") == "NYC")
sf_staff = client.v2.topos.ObjectSet.of_type("Employee").filter(lambda e: e.get("city") == "SF")

all_metro = ny_staff.union(sf_staff)
print(f"Total Metro Staff: {all_metro.count()}")
```

[[Back to top]](#) [[Back to API list]](../../../README.md)
