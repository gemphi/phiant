# TransactionPolicy

The transaction policy for a media set, determining how writes are handled.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
BatchTransactionsTransactionPolicy | batchTransactions
NoTransactionsTransactionPolicy | noTransactions


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
