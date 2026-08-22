# NumberFormatRatio

Display the value as a ratio with different scaling factors and suffixes:
- PERCENTAGE: Multiply by 100 and add "%" suffix (0.15 → "15%")
- PER_MILLE: Multiply by 1000 and add "‰" suffix (0.015 → "15‰")
- BASIS_POINTS: Multiply by 10000 and add "bps" suffix (0.0015 → "15bps")


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**ratio_type** | NumberRatioType | Yes |  |
**base_format_options** | NumberFormatOptions | Yes |  |
**type** | Literal["ratio"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
