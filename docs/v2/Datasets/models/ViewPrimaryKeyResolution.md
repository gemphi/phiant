# ViewPrimaryKeyResolution

Specifies how primary key conflicts are resolved within the view.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
PrimaryKeyResolutionUnique | unique
PrimaryKeyResolutionDuplicate | duplicate


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
