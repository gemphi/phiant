# TimeSeriesAggregationStrategy

CUMULATIVE aggregates all points up to the current point.
ROLLING aggregates all points in a rolling window whose size is either the specified number of points or
time duration.
PERIODIC aggregates all points in specified time windows.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
TimeSeriesRollingAggregate | rolling
TimeSeriesPeriodicAggregate | periodic
TimeSeriesCumulativeAggregate | cumulative


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
