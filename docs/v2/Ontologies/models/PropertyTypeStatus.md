# PropertyTypeStatus

The status to indicate whether the PropertyType is either Experimental, Active, Deprecated, or Example.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DeprecatedPropertyTypeStatus | deprecated
ActivePropertyTypeStatus | active
ExperimentalPropertyTypeStatus | experimental
ExamplePropertyTypeStatus | example


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
