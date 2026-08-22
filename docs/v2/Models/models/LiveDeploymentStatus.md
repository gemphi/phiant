# LiveDeploymentStatus

The current operational status of a live deployment.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**state** | LiveDeploymentState | Yes | The current operational state of the deployment. |
**is_ready** | bool | Yes | Whether the deployment is ready to serve inference requests. A deployment may be active but not ready if it has been autoscaled to zero replicas.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
