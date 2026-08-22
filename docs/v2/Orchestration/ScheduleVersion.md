# ScheduleVersion

Method | HTTP request | Release Stage |
------------- | ------------- | ----- |
[**get**](#get) | **GET** /v2/orchestration/scheduleVersions/{scheduleVersionRid} | Public Beta |
[**schedule**](#schedule) | **GET** /v2/orchestration/scheduleVersions/{scheduleVersionRid}/schedule | Public Beta |

# **get**
Get the ScheduleVersion with the specified rid.

### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**schedule_version_rid** | ScheduleVersionRid | The RID of a schedule version |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**ScheduleVersion**

### Example

```python
from phiegg import PhiEggClient
import phiegg
from pprint import pprint

client = PhiEggClient()

# ScheduleVersionRid | The RID of a schedule version
schedule_version_rid = "ri.scheduler.main.schedule-version.4d1eb55f-6c13-411c-a911-5d84e08d8017"
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.orchestration.ScheduleVersion.get(schedule_version_rid, preview=preview)
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling ScheduleVersion.get: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | ScheduleVersion  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

# **schedule**


### Parameters

Name | Type | Description  | Notes |
------------- | ------------- | ------------- | ------------- |
**schedule_version_rid** | ScheduleVersionRid | The RID of a schedule version |  |
**preview** | Optional[PreviewMode] | Enables the use of preview functionality. | [optional] |

### Return type
**Optional[Schedule]**

### Example

```python
from phiegg import PhiEggClient
import phiegg
from pprint import pprint

client = PhiEggClient()

# ScheduleVersionRid | The RID of a schedule version
schedule_version_rid = "ri.scheduler.main.schedule-version.4d1eb55f-6c13-411c-a911-5d84e08d8017"
# Optional[PreviewMode] | Enables the use of preview functionality.
preview = None


try:
    api_response = client.orchestration.ScheduleVersion.schedule(
        schedule_version_rid, preview=preview
    )
    print("The schedule response:\n")
    pprint(api_response)
except Exception as e:
    print("HTTP error when calling ScheduleVersion.schedule: %s\n" % e)

```



### Authorization

See [README](../../../README.md#authorization)

### HTTP response details
| Status Code | Type        | Description | Content Type |
|-------------|-------------|-------------|------------------|
**200** | Optional[Schedule]  |  | application/json |

[[Back to top]](#) [[Back to API list]](../README.md) [[Back to Model list]](./models/README.md) [[Back to README]](../../README.md)

