# S3ProxyConfiguration

S3ProxyConfiguration

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**host** | str | Yes | Domain name, IPv4, or IPv6 address.  `protocol` and `port` must be specified separately.  |
**port** | int | Yes |  |
**non_proxy_hosts** | Optional[List[str]] | No | A list of hosts that can bypass the proxy, such as those used for STS Role. You can also use "*" wildcards. |
**protocol** | Optional[Protocol] | No | If defined, must be "HTTP" or "HTTPS". Defaults to "HTTPS".  |
**credentials** | Optional[BasicCredentials] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
