# PropertyIdentifier

An identifier used to select properties or struct fields.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
PropertyApiNameSelector | property
StructFieldSelector | structField
PropertyWithLoadLevelSelector | propertyWithLoadLevel
TitlePropertySelector | titleProperty
PrimaryKeyPropertySelector | primaryKeyProperty


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
