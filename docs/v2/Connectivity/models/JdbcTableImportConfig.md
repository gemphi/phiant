# JdbcTableImportConfig

The import configuration for a [custom JDBC connection](https://palantir.com/docs/foundry/available-connectors/custom-jdbc-sources).


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**query** | TableImportQuery | Yes |  |
**initial_incremental_state** | Optional[TableImportInitialIncrementalState] | No |  |
**type** | Literal["jdbcImportConfig"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
