# TimeSeriesPropertyV2 (Continuous Temporal Series)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get_first_point**](#get_first_point) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/timeseries/{property}/firstPoint` | Stable |
[**get_last_point**](#get_last_point) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/timeseries/{property}/lastPoint` | Stable |
[**stream**](#stream) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/timeseries/{property}/stream` | Stable |

---

# **stream**

Streams continuous timestamped numeric observations for a 0-simplex metric property.

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

sensor = client.v2.topos.object("ServerNode", "node-cluster-east-1")
series = sensor.properties["cpu_utilization"]

for ts, val in series.data_points:
    print(f"[{ts}] Utilization: {val:.2f}%")
```
