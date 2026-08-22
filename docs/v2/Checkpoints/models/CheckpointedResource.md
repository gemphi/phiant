# CheckpointedResource

A Foundry resource that was captured as part of a checkpoint.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**rid** | RID | Yes |  |
**resource_type** | CheckpointedResourceType | Yes |  |
**name** | Optional[RedactableString] | No |  |
**project_rid** | Optional[ProjectRid] | No |  |
**namespace_rid** | Optional[NamespaceRid] | No |  |
**compass_path** | RedactableString | Yes |  |
**org_markings** | List[str] | Yes |  |
**type** | Literal["checkpointedResource"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
