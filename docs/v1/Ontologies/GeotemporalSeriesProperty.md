# GeotemporalSeriesProperty (Spatial-Temporal Trajectories)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get_points**](#get_points) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/geotemporal/{property}` | Stable |

---

# **get_points**

Retrieves the continuous series of latitude/longitude coordinate points and timestamps associated with a mobile 0-simplex entity.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **start_time** | `Optional[str]` | ISO-8601 start timestamp filter. | Optional |
| **end_time** | `Optional[str]` | ISO-8601 end timestamp filter. | Optional |

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

vehicle = client.v2.topos.object("DeliveryDrone", "drone-882")
trajectory = vehicle.properties["flight_path"]

for lat, lon, ts in trajectory.points:
    print(f"[{ts}] Position: ({lat:.4f}, {lon:.4f})")
```
