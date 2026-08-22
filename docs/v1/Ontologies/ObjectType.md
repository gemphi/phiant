# ObjectType

Method | HTTP request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/objectTypes/{objectType}` | Stable |
[**get_by_rid_batch**](#get_by_rid_batch) | **POST** `/v2/topos/objectTypes/getByRidBatch` | Public Beta |
[**get_edits_history**](#get_edits_history) | **POST** `/v2/topos/objectTypes/{objectType}/editsHistory` | Stable |
[**get_full_metadata**](#get_full_metadata) | **GET** `/v2/topos/objectTypes/{objectType}/fullMetadata` | Public Beta |
[**get_outgoing_link_type**](#get_outgoing_link_type) | **GET** `/v2/topos/objectTypes/{objectType}/outgoingLinkTypes/{linkType}` | Stable |
[**list**](#list) | **GET** `/v2/topos/objectTypes` | Stable |
[**list_outgoing_link_types**](#list_outgoing_link_types) | **GET** `/v2/topos/objectTypes/{objectType}/outgoingLinkTypes` | Stable |

---

# **get**

Gets a specific 0-simplex ObjectType with the given API name from the POntology manifold.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | The API name of the object type (e.g. `'Employee'`, `'DocumentPage'`). | **Required** |
| **branch** | `Optional[str]` | The branch to load the object type definition from (defaults to `'master'`). | Optional |
| **include_datasources** | `Optional[bool]` | When set to `True`, includes backing data sources and sync mappings. | Optional (default: `False`) |

### Return type

**ObjectType** (`api_name`, `display_name`, `description`, `primary_key`, `properties`, `icon`, `version`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

object_type = "Employee"

try:
    api_response = client.v2.topos.ObjectType.get(object_type)
    print("The get response:\n")
    pprint(api_response)
    print(f"Primary Key Property: {api_response.primary_key}")
    for prop_name, prop_meta in api_response.properties.items():
        print(f" - {prop_name}: {prop_meta.data_type} (indexed={prop_meta.is_indexed})")
except Exception as e:
    print(f"POntology error when calling ObjectType.get: {e}\n")
```

### Authorization

Requires Bearer token authentication via `UserTokenAuth` or `ServiceAccountAuth`.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `ObjectType` | Success schema response. | `application/json` |
| **404** | `POntologyError` | ObjectType API name not found in manifold registry. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **list**

Lists all 0-simplex ObjectTypes registered in the POntology simplicial complex.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **page_size** | `Optional[int]` | Maximum number of object types per page. | Optional (default: `100`) |
| **page_token** | `Optional[str]` | Pagination cursor token for subsequent pages. | Optional |

### Return type

**ListObjectTypesResponse** (`data: List[ObjectType]`, `next_page_token: Optional[str]`)

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

try:
    all_types = client.v2.topos.ObjectType.list()
    for ot in all_types:
        print(f"[{ot.api_name}] {ot.display_name} — Primary: {ot.primary_key}")
except Exception as e:
    print(f"POntology error when calling ObjectType.list: {e}\n")
```

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `ListObjectTypesResponse` | List of registered object types. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **get_outgoing_link_type**

Gets a specific outgoing 1-simplex LinkType connecting this object type to a target vertex.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Source object type API identifier. | **Required** |
| **link_type** | `str` | Link type API name. | **Required** |

### Return type

**LinkType** (`api_name`, `display_name`, `source_object_type`, `target_object_type`, `cardinality`)

### Example

```python
from phiadk import PhiADKClient
from pprint import pprint

client = PhiADKClient()

link = client.v2.topos.ObjectType.get_outgoing_link_type("Employee", "employee_identity")
pprint(link)
```

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **list_outgoing_link_types**

Lists all outgoing 1-simplex fiber link relations originating from this ObjectType.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **object_type** | `str` | Source object type API identifier. | **Required** |

### Return type

**List[LinkType]**

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

links = client.v2.topos.ObjectType.list_outgoing_link_types("Employee")
for link in links:
    print(f"Link: {link.api_name} -> Target: {link.target_object_type} ({link.cardinality})")
```

[[Back to top]](#) [[Back to API list]](../../../README.md)
