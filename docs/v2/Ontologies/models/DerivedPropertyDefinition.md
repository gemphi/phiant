# DerivedPropertyDefinition

Definition of a derived property.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
AddPropertyExpression | add
AbsoluteValuePropertyExpression | absoluteValue
ExtractPropertyExpression | extract
SelectedPropertyExpression | selection
NegatePropertyExpression | negate
SubtractPropertyExpression | subtract
PropertyApiNameSelector | property
LeastPropertyExpression | least
DividePropertyExpression | divide
MultiplyPropertyExpression | multiply
GreatestPropertyExpression | greatest


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
