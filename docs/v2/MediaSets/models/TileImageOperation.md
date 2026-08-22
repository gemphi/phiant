# TileImageOperation

Generates Slippy map tiles (EPSG 3857) from a geo-embedded image.
Only supported for geo-embedded TIFF and NITF images with at most 100M square pixels.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**zoom** | int | Yes | The zoom level of the tile. |
**x** | int | Yes | The x coordinate of the tile. |
**y** | int | Yes | The y coordinate of the tile. |
**type** | Literal["tile"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
