# OntologyObjectArrayType

OntologyObjectArrayType

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**sub_type** | ObjectPropertyType | Yes |  |
**reducers** | List[OntologyObjectArrayTypeReducer] | Yes | If non-empty, this property can be reduced to a single value of the subtype. The reducers are applied in order to determine a winning value. The array can be loaded as a reduced value or as the full array in an object set.  |
**type** | Literal["array"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
