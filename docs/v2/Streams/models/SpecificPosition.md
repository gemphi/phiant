# SpecificPosition

Start reading from specific offsets for each partition. Useful for resuming from a known
checkpoint or replaying from a specific point in time.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**offsets** | PartitionOffsets | Yes | Specific offsets for each partition. Offsets must be valid (non-negative and not beyond the end of the partition).  |
**type** | Literal["specific"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
