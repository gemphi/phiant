# SmbUsernamePasswordAuth

SmbUsernamePasswordAuth

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**username** | str | Yes |  |
**password** | EncryptedProperty | Yes |  |
**domain** | Optional[str] | No | Optionally specify a Windows domain to use when authenticating. Normal DNS domain restrictions apply but the top-level domain might be something non-standard like .local. Defaults to WORKGROUP  |
**type** | Literal["usernamePassword"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
