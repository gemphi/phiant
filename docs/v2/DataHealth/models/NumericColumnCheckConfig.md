# NumericColumnCheckConfig

Configuration for numeric column-based checks (such as mean or median). At least one of numericBounds or trend must be specified. Both may be provided to validate both the absolute value range and the trend behavior over time.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**column_name** | ColumnName | Yes |  |
**numeric_bounds** | Optional[NumericBoundsConfig] | No |  |
**trend** | Optional[TrendConfig] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
