# CreateConfigValidationFailureReason

A specific reason why configuration validation failed.

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
JsonSchemaValidationError | jsonSchemaValidationFailure
OutputResourceInDifferentProjectError | outputResourceInDifferentProject
OtherValidationError | other
MissingWorkerConfigOutputError | missingWorkerConfigOutput
MissingRequiredDatasetColumnError | missingRequiredDatasetColumn
MultiplePropertiesNotAllowedForTrainerError | multiplePropertiesNotAllowedForTrainer
FieldValidationError | fieldValidationFailure
UnsupportedDatasetFieldTypeError | unsupportedDatasetFieldType
ChangelogTooLongError | changelogTooLong
UnknownColumnSpecIdInConfigColumnMappingError | unknownColumnSpecIdInConfigColumnMapping
MultipleColumnsNotAllowedForTrainerError | multipleColumnsNotAllowedForTrainer
MissingWorkerConfigInputDatasetColumnMappingError | missingWorkerConfigInputDatasetColumnMapping
DatasetSchemaNotFoundError | datasetSchemaNotFound
InvalidWorkerConfigInputTypeError | invalidWorkerConfigInputType
MissingWorkerConfigInputError | missingWorkerConfigInput
MissingWorkerConfigInputObjectSetPropertyMappingError | missingWorkerConfigInputObjectSetPropertyMapping
OutputResourceNotFoundError | outputResourceNotFound
InvalidResourceConfigurationError | invalidResourceConfiguration


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
