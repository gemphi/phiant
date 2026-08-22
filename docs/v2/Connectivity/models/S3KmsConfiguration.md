# S3KmsConfiguration

S3KmsConfiguration

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**kms_key** | str | Yes | The client-side KMS key to use for encryption and decryption of data in the S3 bucket. If not specified, the default KMS key for the bucket is used.  |
**kms_region** | Optional[Region] | No | The region of the client-side KMS key to use for encryption and decryption of data in the S3 bucket. If not specified, the default KMS key region for the bucket is used.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
