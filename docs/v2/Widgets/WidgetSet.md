# WidgetSet

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/widgets/widgetSets/{widgetSetRid} | Private Beta |

# **get**
Get the WidgetSet with the specified rid.

### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**widget_set_rid** | WidgetSetRid | A Resource Identifier (RID) identifying a widget set. |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**WidgetSet**

### Example

```python
from phiadk import PhiADKClient
import phiadk
from pprint import pprint

client = PhiADKClient()

# WidgetSetRid | A Resource Identifier (RID) identifying a widget set.
widget_set_rid = "ri.widgetregistry..widget-set.21dt2c42-b7df-4b23-880b-1436a3dred2e"
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.widgets.WidgetSet.get(widget_set_rid, preview=preview)
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling WidgetSet.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | WidgetSet  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

