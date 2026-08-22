# Functions & Morphisms (`Functions/MorphismsAndQueries.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/functions` (`Execution.md`, `Query.md`, `ValueType.md`).
- **Phient Subsystem**: [`src/phiegg/_core/topology.py`](./phient/src/phiegg/_core/topology.py) & [`src/phiegg/topos/action.py`](./phient/src/phiegg/topos/action.py).

---

## 1. Structure-Preserving Morphisms

In topological systems, business functions are represented as **Morphisms** ($f: A \rightarrow B$) that map an input space $A$ to an output space $B$ while preserving algebraic and state invariants.

```mermaid
graph LR
    SourceSpace["Source Space (A)"] -->|Morphism f(x)| TargetSpace["Target Space (B)"]
```

---

## 2. Python SDK Usage

```python
from phiegg import Morphism

# Define pure transformation morphism
calculate_bonus = Morphism(
    source_space="employee_space",
    target_space="compensation_space",
    mapping_fn=lambda salary: salary * 0.15
)

bonus = calculate_bonus.execute(150000)
print(f"Calculated Bonus: ${bonus:,.2f}")
```
