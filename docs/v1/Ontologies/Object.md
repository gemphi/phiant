# POntologyObject / Object

Method | HTTP request | Release Stage |
:--- | :--- | :--- |
[**aggregate**](#aggregate) | **POST** `/v2/topos/objects/{objectType}/aggregate` | Stable |
[**count**](#count) | **POST** `/v2/topos/objects/{objectType}/count` | Private Beta |
[**get**](#get) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}` | Stable |
[**list**](#list) | **GET** `/v2/topos/objects/{objectType}` | Stable |
[**search**](#search) | **POST** `/v2/topos/objects/{objectType}/search` | Stable |

---

# **get**

Gets a single 0-simplex POntologyObject instance by its primary key from the manifold.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | The object type API identifier (e.g. `'Employee'`). | **Required** |
| **primary_key** | `str` | The unique primary key value for the vertex entity. | **Required** |
| **select** | `Optional[List[str]]` | Specific property fields to select in the projection. | Optional |

### Return type

**POntologyObject** (`object_type`, `primary_key`, `properties`, `version`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

object_type = "Employee"
primary_key = "jane.smith@phient.com"

try:
    emp = client.v2.topos.Object.get(object_type, primary_key)
    print("Retrieved 0-simplex object:\n")
    pprint(emp.to_dict())
    print(f"Name: {emp.properties.get('name')}")
    print(f"Department: {emp.properties.get('department')}")
except Exception as e:
    print(f"POntology error when calling Object.get: {e}\n")
```

### Authorization

Requires Bearer token authentication with entity read scopes.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `POntologyObject` | The requested object instance. | `application/json` |
| **404** | `ObjectNotFoundError` | No object with the specified primary key exists. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **list**

Lists objects of the specified ObjectType with pagination and property projections.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | The object type API identifier. | **Required** |
| **page_size** | `Optional[int]` | Maximum number of items per page. | Optional (default: `100`) |
| **page_token** | `Optional[str]` | Pagination cursor token. | Optional |
| **order_by** | `Optional[str]` | Property field to sort by. | Optional |

### Return type

**ListObjectsResponse** (`data: List[POntologyObject]`, `next_page_token: Optional[str]`)

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

objects = client.v2.topos.Object.list("Employee", page_size=25)
for obj in objects:
    print(f"- [{obj.primary_key}] {obj.properties.get('name')} ({obj.properties.get('role')})")
```

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `ListObjectsResponse` | Paginated list of object instances. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **search**

Searches for 0-simplex objects using structured JSON filters, exact match predicates, and range queries.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Target object type. | **Required** |
| **where** | `Dict[str, Any]` | Search filter query dictionary. | **Required** |
| **page_size** | `Optional[int]` | Maximum results to return. | Optional (default: `50`) |

### Return type

**SearchObjectsResponse** (`data: List[POntologyObject]`, `total_count: int`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

search_query = {
    "type": "and",
    "value": [
        {"type": "eq", "field": "department", "value": "Engineering"},
        {"type": "gte", "field": "tenure_years", "value": 3}
    ]
}

try:
    results = client.v2.topos.Object.search("Employee", where=search_query)
    print(f"Found {len(results)} matching employees:\n")
    pprint(results)
except Exception as e:
    print(f"POntology search error: {e}\n")
```

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **aggregate**

Computes aggregations (count, min, max, avg, sum) grouped by discrete fields or continuous numeric/date ranges.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Target object type. | **Required** |
| **aggregation** | `List[Dict[str, str]]` | List of aggregation metric definitions. | **Required** |
| **group_by** | `List[Dict[str, Any]]` | List of grouping specifications. | **Required** |

### Return type

**AggregateObjectsResponse** (`metrics: Dict[str, Any]`, `groups: List[Dict[str, Any]]`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

aggs = client.v2.topos.Object.aggregate(
    object_type="Employee",
    aggregation=[{"type": "avg", "field": "salary", "name": "avg_salary"}],
    group_by=[{"field": "department", "type": "exact"}]
)
pprint(aggs)
```

[[Back to top]](#) [[Back to API list]](../../../README.md)
