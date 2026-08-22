# ToolInputValue

A tool input value, which can be either a string or a Resource Identifier (RID).

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
StringToolInputValue | string
RidToolInputValue | rid


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
