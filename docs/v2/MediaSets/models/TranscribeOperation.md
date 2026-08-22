# TranscribeOperation

Transcribes speech in audio to text.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**language** | Optional[TranscriptionLanguage] | No |  |
**diarize** | Optional[bool] | No | Whether to perform speaker diarization. Defaults to false. Not supported in economical performance mode.  |
**output_format** | Optional[TranscribeTextEncodeFormat] | No |  |
**performance_mode** | Optional[PerformanceMode] | No |  |
**type** | Literal["transcribe"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
