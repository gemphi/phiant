# GeotemporalSeriesEntry

A single geotemporal data point. Each entry is a map from property API names to property values. Standard
entries include "time" (ISO 8601 timestamp) and "position" (GeoPoint), and may include additional geotemporal
series metadata fields such as speed, heading, or altitude.


## Type
```python
Dict[PropertyApiName, PropertyValue]
```


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
