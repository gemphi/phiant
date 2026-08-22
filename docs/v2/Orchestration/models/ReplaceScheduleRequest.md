# ReplaceScheduleRequest

ReplaceScheduleRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**display_name** | Optional[str] | No |  |
**description** | Optional[str] | No |  |
**action** | ReplaceScheduleRequestAction | Yes |  |
**trigger** | Optional[Trigger] | No | The schedule trigger. If the requesting user does not have permission to see the trigger, this will be empty.  |
**scope_mode** | Optional[ReplaceScheduleRequestScopeMode] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
