# LongColumnInitialIncrementalState

The state for an incremental table import using a column with a numeric long datatype.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**column_name** | str | Yes |  |
**current_value** | Long | Yes | The initial incremental state value for the long column to reference in the query.  |
**type** | Literal["longColumnInitialIncrementalState"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
