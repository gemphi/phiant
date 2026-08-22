# Role

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/admin/roles/{roleId} | Private Beta |
[**get_batch**](#get_batch) | **POST** /v2/admin/roles/getBatch | Private Beta |

# **get**
Get the Role with the specified id.

### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**role_id** | RoleId |  |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**Role**

### Example

```python
from phiegg import PhiEggClient
import phiegg
from pprint import pprint

client = PhiEggClient()

# RoleId
role_id = None
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.admin.Role.get(role_id, preview=preview)
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling Role.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | Role  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

# **get_batch**
Execute multiple get requests on Role.

The maximum batch size for this endpoint is 500.

### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**body** | List[GetRolesBatchRequestElement] | Body of the request |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**GetRolesBatchResponse**

### Example

```python
from phiegg import PhiEggClient
import phiegg
from pprint import pprint

client = PhiEggClient()

# List[GetRolesBatchRequestElement] | Body of the request
body = [{"roleId": "8bf49052-dc37-4528-8bf0-b551cfb71268"}]
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.admin.Role.get_batch(body, preview=preview)
    print("The get_batch response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling Role.get_batch: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | GetRolesBatchResponse  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

