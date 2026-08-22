# SecretsWithPlaintextValues

A map representing secret name to plaintext secret value pairs.
This should be used when creating or updating additional secrets for a REST connection.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**secrets** | Dict[SecretName, PlaintextValue] | Yes | The additional secrets that can be referenced in code and webhook configurations. |
**type** | Literal["asSecretsWithPlaintextValues"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
