# RelativePointInTime

A point in time specified relative to query execution time.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**value** | int | Yes | The numeric value of the time offset. Negative values indicate the past, positive values the future.  |
**time_unit** | RelativeTimeUnit | Yes | The unit of time for the value. |
**type** | Literal["relativePoint"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
