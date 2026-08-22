# FileImportFilter

[Filters](https://palantir.com/docs/foundry/data-connection/file-based-syncs/#filters) allow you to filter source files
before they are imported into Foundry.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
FilePathNotMatchesFilter | pathNotMatchesFilter
FileAnyPathMatchesFilter | anyPathMatchesFilter
FilesCountLimitFilter | filesCountLimitFilter
FileChangedSinceLastUploadFilter | changedSinceLastUploadFilter
FileImportCustomFilter | customFilter
FileLastModifiedAfterFilter | lastModifiedAfterFilter
FilePathMatchesFilter | pathMatchesFilter
FileAtLeastCountFilter | atLeastCountFilter
FileSizeFilter | fileSizeFilter


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
