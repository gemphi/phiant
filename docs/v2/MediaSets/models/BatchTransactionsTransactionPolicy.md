# BatchTransactionsTransactionPolicy

All writes must be part of a transaction. Transactions are branch-scoped and created by calling
create transaction. Writes are not visible until commit transaction is called.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**type** | Literal["batchTransactions"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
