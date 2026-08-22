# RenderPageToFitBoundingBoxOperation

Renders a PDF page to maximally fit within a bounding box while preserving aspect ratio.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**page_number** | Optional[int] | No | The zero-indexed page number to render. Defaults to the first page if not specified. |
**width** | int | Yes | The width of the bounding box in pixels. |
**height** | int | Yes | The height of the bounding box in pixels. |
**type** | Literal["renderPageToFitBoundingBox"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
