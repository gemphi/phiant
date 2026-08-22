# QueryTypeV2

Represents a query type in the Ontology.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**api_name** | QueryApiName | Yes |  |
**description** | Optional[str] | No |  |
**display_name** | Optional[DisplayName] | No |  |
**parameters** | Dict[ParameterId, QueryParameterV2] | Yes |  |
**output** | QueryDataType | Yes |  |
**rid** | FunctionRid | Yes |  |
**version** | FunctionVersion | Yes |  |
**type_references** | Dict[TypeReferenceIdentifier, QueryDataType] | Yes |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
