# CreateBuildRequest

CreateBuildRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**target** | BuildTarget | Yes | The targets of the schedule. |
**branch_name** | Optional[BranchName] | No | The target branch the build should run on. |
**fallback_branches** | FallbackBranches | Yes |  |
**force_build** | Optional[ForceBuild] | No |  |
**retry_count** | Optional[RetryCount] | No | The number of retry attempts for failed jobs. |
**retry_backoff_duration** | Optional[RetryBackoffDuration] | No |  |
**abort_on_failure** | Optional[AbortOnFailure] | No |  |
**notifications_enabled** | Optional[NotificationsEnabled] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
