# ImageOperation

An operation to perform on an image.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
RotateImageOperation | rotate
ResizeToFitBoundingBoxOperation | resizeToFitBoundingBox
EncryptImageOperation | encrypt
ContrastImageOperation | contrast
TileImageOperation | tile
ResizeImageOperation | resize
AnnotateImageOperation | annotate
DecryptImageOperation | decrypt
CropImageOperation | crop
GrayscaleImageOperation | grayscale


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
