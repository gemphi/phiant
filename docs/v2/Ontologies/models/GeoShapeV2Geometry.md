# GeoShapeV2Geometry

Geometry specification for a GeoShapeV2Query. Supports bounding box envelopes and arbitrary GeoJSON geometries.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
BoundingBoxValue | envelope
GeoJsonString | geoJson


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
