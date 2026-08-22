# AudioSpecification

Technical specifications for audio media items.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**bit_rate** | int | Yes | Approximate (average) bits per second of the audio, rounded up in case of a fractional average bits per second.  |
**duration_seconds** | float | Yes | Approximate duration of the audio, in seconds with up to two decimal digits (rounded up).  |
**number_of_channels** | Optional[int] | No | Number of audio channels in the audio stream. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
