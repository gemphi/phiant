# CreateModelStudioConfigVersionRequest

CreateModelStudioConfigVersionRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**name** | ModelStudioConfigVersionName | Yes | Human readable name of the configuration version and experiment. |
**resources** | ResourceConfiguration | Yes | The compute resources allocated for training runs. |
**changelog** | Optional[str] | No | Changelog describing changes in this version. |
**worker_config** | ModelStudioWorkerConfig | Yes | The worker configuration including inputs, outputs, and custom settings. |
**trainer_id** | TrainerId | Yes | The identifier of the trainer to use for this configuration. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
