# FileSizeFilter

Only import files whose size is between the specified minimum and maximum values.
At least one of `gt` or `lt` should be present.
If both are present, the value specified for `gt` must be strictly less than `lt - 1`.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**gt** | Optional[SizeBytes] | No | File size must be greater than this number for it to be imported. The value specified cannot be a negative number.  |
**lt** | Optional[SizeBytes] | No | File size must be less than this number for it to be imported. The value specified must be at least 1 byte.  |
**type** | Literal["fileSizeFilter"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
