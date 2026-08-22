# PhiGen Code Examples (`uses.md`)

### 1. Generating Strongly-Typed POntology Classes
```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Generate typed dataclasses for all ObjectTypes in POntology
res = client.phigen.generate_types()
print(f"Generated {res['count']} classes.")

# View generated python module code
with open("src/phiegg/topos/generated.py", "w", encoding="utf-8") as f:
    f.write(res["code"])
```

### 2. Auditing Parity with Palantir Reference Architecture
```python
from phiegg import PhiEggClient

client = PhiEggClient()

report = client.phigen.audit_parity()
print(f"Palantir Modules Checked: {report.total_palantir_modules}")
print(f"Matching POntology Modules: {report.matching_phient_modules}")
print(f"Parity Rate: {report.parity_percentage}%")
print(f"Domain Agents Validated: {report.agents_healthy}/{report.total_domain_agents}")
```
