# LiveDeployment

LiveDeployment

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**rid** | LiveDeploymentRid | Yes |  |
**model_version** | LiveDeploymentModelVersion | Yes | The currently deployed model version.  |
**branch** | Optional[BranchName] | No | The model branch this deployment tracks. Present for direct deployments that follow the latest model version on a branch; absent for deployment types that are not branch-scoped.  |
**runtime_configuration** | LiveDeploymentRuntimeConfiguration | Yes | The compute resource configuration for the deployment. |
**status** | LiveDeploymentStatus | Yes | The current operational status of the deployment. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
