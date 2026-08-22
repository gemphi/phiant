# IsNullQueryV2

Returns objects based on the existence of the specified field. Allows you to specify a property to query on
by a variety of means. Either `field` or `propertyIdentifier` must be supplied, but not both.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**field** | Optional[PropertyApiName] | No |  |
**property_identifier** | Optional[PropertyIdentifier] | No |  |
**value** | bool | Yes |  |
**type** | Literal["isNull"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
