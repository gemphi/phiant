# StructFieldSelector

A combination of a property identifier and the load level to apply to the property. You can select a reduced
value for arrays and the main value for structs. If the provided load level cannot be applied to the property
type, then it will be ignored. This selector is experimental and may not work in filters or sorts.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**property_api_name** | PropertyApiName | Yes |  |
**struct_field_api_name** | StructFieldApiName | Yes |  |
**type** | Literal["structField"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
