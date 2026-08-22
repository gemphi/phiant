# VersionId

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/functions/valueTypes/{valueTypeRid}/versionIds/{versionIdVersionId} | Private Beta |

# **get**
Gets a specific version of a value type with the given RID and version ID.


### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**value_type_rid** | ValueTypeRid |  |  |
**version_id_version_id** | ValueTypeVersionId |  |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**VersionId**

### Example

```python
from phiadk import PhiADKClient
import phiadk
from pprint import pprint

client = PhiADKClient()

# ValueTypeRid
value_type_rid = None
# ValueTypeVersionId
version_id_version_id = None
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.functions.ValueType.VersionId.get(
        value_type_rid, version_id_version_id, preview=preview
    )
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling VersionId.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | VersionId  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

