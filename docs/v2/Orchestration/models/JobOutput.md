# JobOutput

Other types of Job Outputs exist in Foundry. Currently, only Dataset and Media Set are supported by the API.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DatasetJobOutput | datasetJobOutput
TransactionalMediaSetJobOutput | transactionalMediaSetJobOutput


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
