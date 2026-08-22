# Domain

The domain that the connection is allowed to access.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**scheme** | Optional[UriScheme] | No | The scheme of the domain that the connection is allowed to access. If not specified, defaults to HTTPS.  |
**host** | str | Yes | The domain name, IPv4, or IPv6 address. |
**port** | Optional[int] | No | The port number of the domain that the connection is allowed to access. |
**auth** | Optional[RestAuthenticationMode] | No | The URI scheme must be HTTPS if using any authentication. If not specified, no authentication is required.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
