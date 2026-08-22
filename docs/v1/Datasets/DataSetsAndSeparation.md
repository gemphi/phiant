# Datasets & Strict Data Separation (`Datasets/DataSetsAndSeparation.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/datasets` (`Dataset.md`, `Branch.md`, `File.md`, `Transaction.md`, `View.md`).
- **Phient Subsystem**: [`src/phiegg/phiora/store.py`](./phient/src/phiegg/phiora/store.py) (`DataSet`, `ResolverClient`).

---

## 1. Strict Separation of Data and Code

In Phient, agents and morphisms **never inline raw data in memory**. Instead, they pass `DataSet` references that are resolved on demand via `phiora`:

```mermaid
graph LR
    Agent["PhiAgent Code"] -->|references| SetRef["DataSet(set_id='telemetry_q4')"]
    SetRef --> Resolver["PhiOra.Resolver"]
    Resolver --> Storage["Content-Addressed Disk Storage"]
```

---

## 2. Python SDK Usage

```python
from phiegg import PhiEggClient
from phiegg._core import DataSet

client = PhiEggClient()

# 1. Create DataSet reference
ds_ref = DataSet(set_id="workforce_salaries")

# 2. Resolve to physical file path
path = client.phiora.Resolver.resolve(ds_ref)
print("Physical Storage Path:", path)
```
