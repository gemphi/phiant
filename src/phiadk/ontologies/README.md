# Phient Ontologies Engine (`src/phiadk/ontologies/`)

> _1:1 Palantir Foundry Symmetrical Ontology Substrate & Topological State Machine._

[![Palantir Parity](https://img.shields.io/badge/Palantir%20Ontologies-100%25%20Symmetrical-purple.svg)](../../../look.md)
[![Submodules](https://img.shields.io/badge/Architecture-Clean%20Singular%20Modules-blue.svg)](./)

---

## 1. Architectural Overview & Category Theory Foundation

The **OntologyEngine** treats the entire enterprise state as a category of sheaves over a simplicial manifold:
- **0-Simplices (Vertices)**: `ObjectType` entities (e.g. `Employee`, `UserIdentity`, `DocumentPage`, `GitCommit`).
- **1-Simplices (Edges / Fiber Bundles)**: `LinkType` relationships (e.g. `employee_identity`, `authored_documents`).
- **State-Mutating Morphisms**: `ActionType` operations (e.g. `promote_employee`, `provision_identity`).
- **What-If Sandboxes**: `Scenario` copy-on-write branches.
- **Atomic Batches**: `Transaction` 2-phase commits producing SHA-1 hashes.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    subgraph "0-Simplices (Object Types)"
        Emp["Employee (0-Simplex)"]
        Ident["UserIdentity (0-Simplex)"]
        Doc["DocumentPage (0-Simplex)"]
        Git["GitCommit (0-Simplex)"]
    end

    subgraph "1-Simplices (Link Types)"
        L1["employee_identity (1-to-1)"]
        L2["employee_documents (1-to-Many)"]
    end

    subgraph "Action Morphisms"
        Act1["Action: promote_employee"]
        Act2["Action: provision_identity"]
    end

    Emp -->|Source| L1 -->|Target| Ident
    Emp -->|Source| L2 -->|Target| Doc
    Act1 -.->|Mutates| Emp
    Act2 -.->|Mutates| Ident
```

---

## 2. Concise Singular Module Mapping

All redundant repeating names have been simplified into clean, self-contained single-topic modules:

| Module File | Exported Classes & Models | Palantir Foundry Reference |
|:---|:---|:---|
| [`engine.py`](./engine.py) | `OntologyEngine`, `POntologyEngine`, `GLOBAL_ONTOLOGY` | `foundry_sdk/v2/ontologies/ontology.py` |
| [`object.py`](./object.py) | `ObjectType`, `PropertyType`, `ObjectProperty`, `OntologyObject`, `OntologyObjectSet`, `ObjectClient` | `foundry_sdk/v2/ontologies/object_type.py` |
| [`link.py`](./link.py) | `LinkType`, `LinkedObjectClient`, `LinkClient` | `foundry_sdk/v2/ontologies/linked_object.py` |
| [`action.py`](./action.py) | `ActionType`, `ActionParameter`, `ActionTypeMetadata`, `ActionClient` | `foundry_sdk/v2/ontologies/action.py` |
| [`interface.py`](./interface.py) | `Interface`, `InterfaceProperty`, `OntologyInterface`, `InterfaceClient` | `foundry_sdk/v2/ontologies/ontology_interface.py` |
| [`scenario.py`](./scenario.py) | `Scenario`, `OntologyScenario`, `ScenarioClient` | `foundry_sdk/v2/ontologies/ontology_scenario.py` |
| [`transaction.py`](./transaction.py) | `Transaction`, `OntologyTransaction`, `TransactionClient` | `foundry_sdk/v2/ontologies/ontology_transaction.py` |
| [`geo.py`](./geo.py) | `GeoProperty`, `GeoPoint`, `GeoShape`, `GeoClient` | `foundry_sdk/v2/ontologies/geotemporal_series_property.py` |
| [`time.py`](./time.py) | `TimeProperty`, `TimeSeriesPoint`, `TimeSeriesClient` | `foundry_sdk/v2/ontologies/time_series_property_v2.py` |
| [`media.py`](./media.py) | `MediaProperty`, `MediaReference`, `MediaClient` | `foundry_sdk/v2/ontologies/media_reference_property.py` |
| [`attachment.py`](./attachment.py) | `Attachment`, `AttachmentProperty`, `AttachmentClient` | `foundry_sdk/v2/ontologies/attachment_property.py` |
| [`cipher.py`](./cipher.py) | `CipherProperty`, `CipherTextProperty`, `CipherClient` (AES-256 Vault) | `foundry_sdk/v2/ontologies/cipher_text_property.py` |
| [`query.py`](./query.py) | `Query`, `QueryType`, `QueryParameter`, `QueryClient` | `foundry_sdk/v2/ontologies/query_type.py` |
| [`value.py`](./value.py) | `ValueType`, `ValueTypeClient` | `foundry_sdk/v2/ontologies/ontology_value_type.py` |

---

## 3. Python SDK Usage Example

```python
from phiadk.ontologies import GLOBAL_ONTOLOGY, ActionClient, ScenarioClient

# 1. Inspect registered ontology
print(f"Loaded {len(GLOBAL_ONTOLOGY.object_types)} ObjectTypes:")
for name, ot in GLOBAL_ONTOLOGY.object_types.items():
    print(f"  • {name} ({len(ot.properties)} properties)")

# 2. Execute an Action Morphism (automatically emits PhiBus event)
act_client = ActionClient(engine=GLOBAL_ONTOLOGY)
receipt = act_client.apply(
    action_type="promote_employee",
    parameters={"employee_id": "EMP-001", "new_title": "Lead Staff Architect"},
    branch="master"
)
print("Mutation Receipt:", receipt)

# 3. Create a What-If Scenario Sandbox
scenario_client = ScenarioClient(engine=GLOBAL_ONTOLOGY)
sandbox = scenario_client.create(name="org_restructure_simulation")
print("Sandbox Active:", sandbox.scenario_id)
```
