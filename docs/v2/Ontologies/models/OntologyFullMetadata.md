# OntologyFullMetadata

OntologyFullMetadata

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**ontology** | OntologyV2 | Yes |  |
**object_types** | Dict[ObjectTypeApiName, ObjectTypeFullMetadata] | Yes |  |
**action_types** | Dict[ActionTypeApiName, ActionTypeV2] | Yes |  |
**query_types** | Dict[VersionedQueryTypeApiName, QueryTypeV2] | Yes |  |
**interface_types** | Dict[InterfaceTypeApiName, InterfaceType] | Yes |  |
**shared_property_types** | Dict[SharedPropertyTypeApiName, SharedPropertyType] | Yes |  |
**branch** | Optional[BranchMetadata] | No |  |
**value_types** | Dict[ValueTypeApiName, OntologyValueType] | Yes |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
