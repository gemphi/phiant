# Role

Role

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**id** | RoleId | Yes |  |
**display_name** | RoleDisplayName | Yes |  |
**description** | RoleDescription | Yes |  |
**operations** | List[str] | Yes | A list of permissions that this role has. |
**can_assigns** | List[RoleId] | Yes | A list of roles that this role inherits. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
