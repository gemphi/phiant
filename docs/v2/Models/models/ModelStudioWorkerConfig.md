# ModelStudioWorkerConfig

Configuration for the Model Studio worker.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**custom_config** | Optional[Dict[str, Any]] | No | Custom configuration matching the trainer's JSON schema. |
**inputs** | Dict[InputAlias, ModelStudioInput] | Yes | Input configurations keyed by alias. |
**outputs** | Dict[OutputAlias, ModelStudioOutput] | Yes | Output configurations keyed by alias. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
