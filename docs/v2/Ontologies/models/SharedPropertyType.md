# SharedPropertyType

A property type that can be shared across object types.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**rid** | SharedPropertyTypeRid | Yes |  |
**api_name** | SharedPropertyTypeApiName | Yes |  |
**display_name** | DisplayName | Yes |  |
**description** | Optional[str] | No | A short text that describes the SharedPropertyType. |
**data_type** | ObjectPropertyType | Yes |  |
**value_type_api_name** | Optional[ValueTypeApiName] | No |  |
**value_formatting** | Optional[PropertyValueFormattingRule] | No |  |
**type_classes** | Optional[List[TypeClass]] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
