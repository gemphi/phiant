# NearestNeighborsQuery

Queries support either a vector matching the embedding model defined on the property, or text that is 
automatically embedded.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DoubleVector | vector
NearestNeighborsQueryText | text


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
