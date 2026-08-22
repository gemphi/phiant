# CheckpointedPrincipal

A user or group principal that was captured as part of a checkpoint.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**id** | str | Yes |  |
**username** | RedactableString | Yes |  |
**organization_rid** | Optional[OrganizationRid] | No |  |
**role** | CheckpointedPrincipalRole | Yes |  |
**type** | Literal["checkpointedPrincipal"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
