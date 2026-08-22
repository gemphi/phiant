# NoTransactionsTransactionPolicy

Writes are not part of a transaction and are immediately visible.
Calls to create transaction or commit transaction will error.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**type** | Literal["noTransactions"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
