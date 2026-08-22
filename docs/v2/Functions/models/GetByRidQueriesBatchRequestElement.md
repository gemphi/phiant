# GetByRidQueriesBatchRequestElement

GetByRidQueriesBatchRequestElement

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**include_prerelease** | Optional[bool] | No | When no version is specified and this flag is set to true, the latest version resolution will consider prerelease versions (e.g., 1.2.3-beta could be returned as the latest). When false, only stable versions are considered when determining the latest version.  Defaults to false.  |
**rid** | FunctionRid | Yes |  |
**version** | Optional[FunctionVersion] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
