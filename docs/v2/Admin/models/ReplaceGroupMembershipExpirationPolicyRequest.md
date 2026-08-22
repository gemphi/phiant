# ReplaceGroupMembershipExpirationPolicyRequest

ReplaceGroupMembershipExpirationPolicyRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**maximum_duration** | Optional[DurationSeconds] | No | Members in this group must be added with expirations that are less than this duration in seconds into the future from the time they are added.  |
**maximum_value** | Optional[GroupMembershipExpiration] | No | Members in this group must be added with expiration times that occur before this value. |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
