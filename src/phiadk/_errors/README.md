# Exception & Error Taxonomy (`src/phiadk/_errors/`)

> _Strongly-Typed Error Hierarchy for PhiADK & Palantir Symmetrical Operations._

---

## 1. Error Hierarchy

```
PhiADKException (Base)
├── OntologyError
│   ├── ObjectNotFoundError
│   ├── LinkTypeNotFoundError
│   └── ActionExecutionError
├── AgentExecutionError
│   ├── UnsupportedVerbError
│   └── AgentTimeoutError
├── AuthenticationError
│   ├── TokenExpiredError
│   └── InvalidCredentialsError
└── SpatialStoreError
    ├── OutOfBoundsError
    └── ManifoldDimensionMismatchError
```

---

## 2. Usage Example

```python
from phiadk._errors import PhiADKException, OntologyError

try:
    # Execute ontology action or agent verb
    ...
except OntologyError as exc:
    print(f"Ontology Error: {exc.message} (Status: {exc.status_code})")
except PhiADKException as exc:
    print(f"Platform Error: {exc}")
```
