# DicomMediaItemMetadata

Metadata for DICOM (Digital Imaging and Communications in Medicine) media items.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**meta_information** | DicomMetaInformation | Yes |  |
**media_type** | DicomMediaType | Yes |  |
**common_data_elements** | CommonDicomDataElements | Yes |  |
**other_data_elements** | Dict[DicomDataElementKey, Any] | Yes | The data elements for a particular DICOM file outside of the media contained within it and the data elements within the commonDataElements field.  |
**size_bytes** | int | Yes | The size of the media item in bytes. |
**type** | Literal["dicom"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
