# CancelSessionRequest

CancelSessionRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**message_id** | MessageId | Yes | The identifier for the in-progress exchange to cancel. This should match the `messageId` which was provided when initiating the exchange with `streamingContinue`.  |
**response** | Optional[AgentMarkdownResponse] | No | When specified, the exchange is added to the session with the client-provided response as the result. When omitted, the exchange is not added to the session.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
