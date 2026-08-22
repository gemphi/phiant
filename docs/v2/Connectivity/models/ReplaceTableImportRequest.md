# ReplaceTableImportRequest

ReplaceTableImportRequest

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**import_mode** | TableImportMode | Yes |  |
**display_name** | TableImportDisplayName | Yes |  |
**allow_schema_changes** | Optional[TableImportAllowSchemaChanges] | No | Allow the TableImport to succeed if the schema of imported rows does not match the existing dataset's schema. Defaults to false for new table imports. |
**config** | ReplaceTableImportRequestTableImportConfig | Yes |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
