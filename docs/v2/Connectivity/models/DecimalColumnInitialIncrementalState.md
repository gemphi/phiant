# DecimalColumnInitialIncrementalState

The state for an incremental table import using a column with a decimal data type.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**column_name** | str | Yes |  |
**current_value** | decimal.Decimal | Yes | The initial incremental state value for the decimal column to reference in the query.  |
**type** | Literal["decimalColumnInitialIncrementalState"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
