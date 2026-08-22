# SelectedPropertyOperation

Operation on a selected property, can be an aggregation function or retrieval of a single selected property


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
SelectedPropertyApproximateDistinctAggregation | approximateDistinct
SelectedPropertyMinAggregation | min
SelectedPropertyAvgAggregation | avg
SelectedPropertyMaxAggregation | max
SelectedPropertyApproximatePercentileAggregation | approximatePercentile
GetSelectedPropertyOperation | get
SelectedPropertyCountAggregation | count
SelectedPropertySumAggregation | sum
SelectedPropertyCollectListAggregation | collectList
SelectedPropertyExactDistinctAggregation | exactDistinct
SelectedPropertyCollectSetAggregation | collectSet


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
