# UpstreamTarget

Target the specified datasets along with all upstream datasets except the ignored datasets.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**target_rids** | List[BuildableRid] | Yes | The target datasets. |
**ignored_rids** | List[BuildableRid] | Yes | The datasets to ignore when calculating the final set of dataset to build. |
**type** | Literal["upstream"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
