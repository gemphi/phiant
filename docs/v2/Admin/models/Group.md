# Group

Group

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**id** | GroupId | Yes |  |
**name** | GroupName | Yes | The name of the Group. |
**description** | Optional[str] | No | A description of the Group. |
**realm** | Realm | Yes |  |
**organizations** | List[OrganizationRid] | Yes | The RIDs of the Organizations whose members can see this group. At least one Organization RID must be listed.  |
**attributes** | Dict[AttributeName, AttributeValues] | Yes | A map of the Group's attributes. Attributes prefixed with "multipass:" are reserved for internal use by Foundry and are subject to change. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
