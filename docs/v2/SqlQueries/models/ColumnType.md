# ColumnType

The type of a column in a SQL query result or parameter.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DateType | date
StructColumnType | struct
StringType | string
DoubleType | double
IntegerType | integer
FloatType | float
ListColumnType | list
AnyColumnType | any
LongType | long
BooleanType | boolean
BinaryType | binary
ShortType | short
DecimalColumnType | decimal
MapColumnType | map
TimestampType | timestamp


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
