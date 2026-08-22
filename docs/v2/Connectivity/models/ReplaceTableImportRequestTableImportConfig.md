# ReplaceTableImportRequestTableImportConfig

The import configuration for a specific [connector type](https://palantir.com/docs/foundry/data-integration/source-type-overview).


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
ReplaceTableImportRequestDatabricksTableImportConfig | databricksImportConfig
ReplaceTableImportRequestJdbcTableImportConfig | jdbcImportConfig
ReplaceTableImportRequestMicrosoftSqlServerTableImportConfig | microsoftSqlServerImportConfig
ReplaceTableImportRequestPostgreSqlTableImportConfig | postgreSqlImportConfig
ReplaceTableImportRequestMicrosoftAccessTableImportConfig | microsoftAccessImportConfig
ReplaceTableImportRequestSnowflakeTableImportConfig | snowflakeImportConfig
ReplaceTableImportRequestOracleTableImportConfig | oracleImportConfig


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
