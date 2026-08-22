# ImageSpec

Specification for image processing parameters used in vision-based extraction.
Controls how document pages are converted to images before being sent to vision models.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**resizing_mode** | ResizingMode | Yes |  |
**height** | Optional[int] | No | Target height in pixels. |
**width** | Optional[int] | No | Target width in pixels. |
**mime_type** | ImageryDecodeFormat | Yes |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
