# PublishRecordToStreamRequest

PublishRecordToStreamRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**record** | Record | Yes | The record to publish to the stream  |
**view_rid** | Optional[ViewRid] | No | If provided, this endpoint will only write to the stream corresponding to the specified view RID. If not provided, this endpoint will write the latest stream on the branch.  Providing this value is an advanced configuration, to be used when additional control over the underlying streaming data structures is needed.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
