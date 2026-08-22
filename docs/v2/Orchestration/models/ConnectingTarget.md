# ConnectingTarget

All datasets between the input datasets (exclusive) and the
target datasets (inclusive) except for the datasets to ignore.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**input_rids** | List[BuildableRid] | Yes | The upstream input datasets (exclusive). |
**target_rids** | List[BuildableRid] | Yes | The downstream target datasets (inclusive). |
**ignored_rids** | List[BuildableRid] | Yes | The datasets between the input datasets and target datasets to exclude. |
**type** | Literal["connecting"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
