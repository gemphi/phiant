# ReplaceScheduleRequestConnectingTarget

ReplaceScheduleRequestConnectingTarget

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**ignored_rids** | Optional[List[BuildableRid]] | No | The datasets between the input datasets and target datasets to exclude. |
**target_rids** | List[BuildableRid] | Yes | The downstream target datasets (inclusive). |
**input_rids** | List[BuildableRid] | Yes | The upstream input datasets (exclusive). |
**type** | Literal["connecting"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
