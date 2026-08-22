# RenderPageOperation

Renders a PDF page as an image.
If only one dimension is specified, the other is calculated to preserve aspect ratio.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**page_number** | Optional[int] | No | The zero-indexed page number to render. Defaults to the first page if not specified. |
**height** | Optional[int] | No | The desired height in pixels. |
**width** | Optional[int] | No | The desired width in pixels. |
**type** | Literal["renderPage"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
