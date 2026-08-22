# OntologyValueType / POntologyValueType (Custom Value Constraints)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/valueTypes/{valueTypeApiName}` | Stable |
[**list**](#list) | **GET** `/v2/topos/valueTypes` | Stable |

---

# **get**

Gets the validation rules and regex/range constraints for a custom value type (e.g. `EmailAddress`, `CurrencyAmount`, `SemVerString`).

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

vt = client.v2.topos.ValueType.get("EmailAddress")
print(f"Base Type: {vt.base_type} | Regex: {vt.constraints.get('regex')}")
```
