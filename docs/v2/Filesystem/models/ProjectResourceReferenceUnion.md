# ProjectResourceReferenceUnion

A [reference](https://palantir.com/docs/foundry/security/projects-and-roles/#references) represents a resource from outside of 
the current project that has been imported to the given project.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
ProjectExternalResourceReference | external
ProjectFilesystemResourceReference | filesystem


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
