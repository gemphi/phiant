# InterfacePropertyType

The definition of an interface property type on an interface. An interface property can either be backed by a
shared property type or defined on the interface directly.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
InterfaceDefinedPropertyType | interfaceDefinedPropertyType
InterfaceSharedPropertyType | interfaceSharedPropertyType


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
