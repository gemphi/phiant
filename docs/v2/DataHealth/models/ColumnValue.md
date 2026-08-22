# ColumnValue

A column value that can be of different types.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DateColumnValue | date
BooleanColumnValue | boolean
StringColumnValue | string
NumericColumnValue | numeric


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
