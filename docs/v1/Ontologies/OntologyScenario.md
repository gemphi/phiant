# OntologyScenario / POntologyScenario (What-If Branch Simulations)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**create**](#create) | **POST** `/v2/topos/scenarios` | Stable |
[**get**](#get) | **GET** `/v2/topos/scenarios/{scenarioRid}` | Stable |
[**apply**](#apply) | **POST** `/v2/topos/scenarios/{scenarioRid}/apply` | Stable |
[**delete**](#delete) | **DELETE** `/v2/topos/scenarios/{scenarioRid}` | Stable |

---

# **create**

Creates an isolated branch sandbox for evaluating tentative state mutations without affecting production manifolds.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Create what-if scenario
scenario = client.v2.topos.Scenario.create("reorganization_q1")
scenario.apply("transfer_department", {"employee_id": "jane@phient.com", "to_dept": "AI Research"})

print("Scenario Draft Commit:", scenario.commit_sha1)
```
