# ActionParameterType

A union of all the types supported by Ontology Action parameters.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DateType | date
OntologyInterfaceObjectType | interfaceObject
OntologyStructType | struct
StringType | string
DoubleType | double
IntegerType | integer
GeoShapeType | geoshape
LongType | long
OntologyObjectTypeReferenceType | objectType
BooleanType | boolean
MarkingType | marking
ScenarioReferenceType | scenarioReference
AttachmentType | attachment
MediaReferenceType | mediaReference
ActionParameterArrayType | array
OntologyObjectSetType | objectSet
GeohashType | geohash
VectorType | vector
OntologyObjectType | object
TimestampType | timestamp


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
