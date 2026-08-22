# ObjectTypeTimeSeriesDatasource

An object type datasource backed by a time series sync, providing values for time-dependent properties.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**time_series_sync_rid** | TimeseriesSyncRid | Yes |  |
**properties** | List[PropertyApiName] | Yes | The set of properties that are bound to the time series.  |
**type** | Literal["timeSeries"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
