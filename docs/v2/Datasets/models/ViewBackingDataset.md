# ViewBackingDataset

One of the Datasets backing a View.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**branch** | Optional[BranchName] | No | The branch of the backing dataset. If not specified, defaults to the branch of the View. |
**dataset_rid** | DatasetRid | Yes |  |
**stop_propagating_marking_ids** | List[MarkingId] | Yes | Markings listed here will not be inherited from this backing dataset. The caller must have the DECLASSIFY  permission on each marking listed here. If multiple backing datasets have the same marking applied, the marking must be listed for each backing dataset or it will still be inherited.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
