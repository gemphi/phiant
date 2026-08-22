# InvalidWorkerConfigInputTypeError

A worker config input was provided with a type that does not match the expected type.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**input_alias** | InputAlias | Yes | The alias of the input with the mismatched type. |
**expected_type** | str | Yes | The type the trainer expected for the input. |
**actual_type** | str | Yes | The type that was actually provided. |
**type** | Literal["invalidWorkerConfigInputType"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
