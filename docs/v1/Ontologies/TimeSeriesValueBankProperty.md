# TimeSeriesValueBankProperty (High-Throughput Value Bank Streams)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get_points**](#get_points) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/timeSeriesValueBank/{property}` | Stable |

---

# **get_points**

Retrieves compressed binary stream blocks from the high-throughput time-series value bank.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

telemetry_node = client.v2.topos.object("ClusterMonitor", "prod-eu-central")
points = telemetry_node.properties["network_io"]
print(f"Retrieved {len(points.data_points)} value bank points.")
```
