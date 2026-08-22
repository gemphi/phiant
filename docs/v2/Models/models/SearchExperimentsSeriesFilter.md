# SearchExperimentsSeriesFilter

Filter that atomically binds a series name to a metric comparison,
ensuring all conditions are evaluated on the same series.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**series_name** | SeriesName | Yes | The name of the series to filter on. |
**field** | SearchExperimentsSeriesFilterField | Yes | The series metric to compare. |
**operator** | SearchExperimentsNumericFilterOperator | Yes | The comparison operator (EQ, GT, or LT). |
**value** | Any | Yes | The value to compare against. |
**type** | Literal["seriesFilter"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
