# SelectedPropertyCollectListAggregation

Lists all values of a property up to the specified limit. The maximum supported limit is 100, by default.

NOTE: A separate count aggregation should be used to determine the total count of values, to account for
a possible truncation of the returned list.

Ignores objects for which a property is absent, so the returned list will contain non-null values only.
Returns an empty list when none of the objects have values for a provided property.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**selected_property_api_name** | PropertyApiName | Yes |  |
**limit** | int | Yes | Maximum number of values to collect. The maximum supported limit is 100.  |
**type** | Literal["collectList"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
