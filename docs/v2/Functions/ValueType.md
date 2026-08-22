# ValueType

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/functions/valueTypes/{valueTypeRid} | Private Beta |

# **get**
Gets a specific value type with the given RID. The latest version is returned.


### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**value_type_rid** | ValueTypeRid |  |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**ValueType**

### Example

```python
from phiegg import PhiEggClient
import phiegg
from pprint import pprint

client = PhiEggClient()

# ValueTypeRid
value_type_rid = None
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.functions.ValueType.get(value_type_rid, preview=preview)
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling ValueType.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | ValueType  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

