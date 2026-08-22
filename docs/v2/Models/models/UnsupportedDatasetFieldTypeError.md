# UnsupportedDatasetFieldTypeError

A dataset field has a type that is not supported by the trainer.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**dataset_rid** | DatasetRid | Yes | The RID of the dataset containing the unsupported field. |
**field_name** | Optional[str] | No | The name of the dataset field, if known. |
**field_type** | str | Yes | The unsupported field type. |
**type** | Literal["unsupportedDatasetFieldType"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
