# CbacBanner

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/admin/cbacBanner | Public Beta |

# **get**
Returns a classification banner string and colors for the given set of marking IDs.

### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**display_type** | Optional[ClassificationBannerDisplayType] | The display type of the banner. Defaults to PORTION_MARKING. BANNER_LINE is the long classification string used in the header of a document; PORTION_MARKING is a short classification string used for individual paragraphs | [optional] |
**marking_ids** | Optional[List[MarkingId]] | The marking IDs for which to generate a banner. | [optional] |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**CbacBanner**

### Example

```python
from phiadk import PhiADKClient
import phiadk
from pprint import pprint

client = PhiADKClient()

# Optional[ClassificationBannerDisplayType] | The display type of the banner. Defaults to PORTION_MARKING. BANNER_LINE is the long classification string used in the header of a document; PORTION_MARKING is a short classification string used for individual paragraphs
display_type = None
# Optional[List[MarkingId]] | The marking IDs for which to generate a banner.
marking_ids = ["MTS", "MNF"]
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.admin.CbacBanner.get(
        display_type=display_type, marking_ids=marking_ids, preview=preview
    )
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling CbacBanner.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | CbacBanner  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

