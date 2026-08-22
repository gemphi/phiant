# ObjectPropertyType

A union of all the types supported by Ontology Object properties.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
DateType | date
StructType | struct
StringType | string
ByteType | byte
DoubleType | double
GeoPointType | geopoint
GeotimeSeriesReferenceType | geotimeSeriesReference
IntegerType | integer
FloatType | float
GeoShapeType | geoshape
LongType | long
BooleanType | boolean
CipherTextType | cipherText
MarkingType | marking
AttachmentType | attachment
MediaReferenceType | mediaReference
TimeseriesType | timeseries
OntologyObjectArrayType | array
ShortType | short
VectorType | vector
DecimalType | decimal
TimestampType | timestamp


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
