# LogicRuleArgument

Represents an argument for a logic rule operation. An argument can be passed in via the action parameters, as a static value, or as some other value.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
CurrentTimeArgument | currentTime
StaticArgument | staticValue
CurrentUserArgument | currentUser
ParameterIdArgument | parameterId
InterfaceParameterPropertyArgument | interfaceParameterPropertyValue
SynchronousWebhookOutputArgument | synchronousWebhookOutput
ObjectParameterPropertyArgument | objectParameterPropertyValue
UniqueIdentifierArgument | uniqueIdentifier


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
