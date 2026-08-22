# ApproximateDistinctAggregationV2

Computes an approximate number of distinct values for the provided field.
Either `field` or `propertyIdentifier` must be supplied, but not both.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**field** | Optional[PropertyApiName] | No |  |
**property_identifier** | Optional[PropertyIdentifier] | No |  |
**name** | Optional[AggregationMetricName] | No |  |
**direction** | Optional[OrderByDirection] | No |  |
**type** | Literal["approximateDistinct"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
