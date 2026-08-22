# SeriesAggregations

Series with precomputed aggregation values.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**name** | SeriesName | Yes | The series name |
**length** | Optional[Long] | No | Number of values in the series. This field may be absent when series aggregations are derived from summary metrics rather than the full series data.  |
**value** | SeriesAggregationsValue | Yes | Aggregated values for this series |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
