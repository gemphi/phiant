# NumberFormatDuration

Format numeric values representing time durations.
- Human readable: 3661 seconds displays as "1h 1m 1s"
- Timecode: 3661 seconds displays as "01:01:01"


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**format_style** | DurationFormatStyle | Yes |  |
**precision** | Optional[DurationPrecision] | No |  |
**base_value** | DurationBaseValue | Yes |  |
**type** | Literal["duration"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
