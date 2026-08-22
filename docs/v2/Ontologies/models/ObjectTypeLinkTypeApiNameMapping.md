# ObjectTypeLinkTypeApiNameMapping

Groups link type API names by the object type they're scoped to. Link type API names are only unique within
an object type, so this pairing is required to identify a link type unambiguously.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**object_type_api_name** | ObjectTypeApiName | Yes |  |
**link_types** | List[LinkTypeApiName] | Yes | The list of link type API names scoped by the object type. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
