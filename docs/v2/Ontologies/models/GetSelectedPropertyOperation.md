# GetSelectedPropertyOperation

Gets a single value of a property. Throws if the target object set is on the MANY side of the link and could
explode the cardinality.

Use collectList or collectSet which will return a list of values in that case.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**selected_property_api_name** | PropertyApiName | Yes |  |
**type** | Literal["get"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
