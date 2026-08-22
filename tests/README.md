# Automated Test Suite (`tests/`)

> _132 Unit and Integration Tests with 100% Pass Rate._

---

## 1. Test Modules Matrix

| Test File | Target Subsystem | Test Coverage & Scope |
|:---|:---|:---|
| [`test_agents.py`](./test_agents.py) | `phiadk.agents` | All 15 canonical 6-letter domain agents executing verbs and returning valid outputs. |
| [`test_event_bus_and_ontology.py`](./test_event_bus_and_ontology.py) | `phiadk.agents.phibus` & `phiadk.ontologies` | End-to-end event broadcasting, Action Type event hooks, and whole ontology graph integrity. |
| [`test_phiora_spatial_db.py`](./test_phiora_spatial_db.py) | `phiadk.agents.phiora` | Spatial coordinate insertion, geodesic $k$-NN, bounding-box containment, and `SpatialRecord`. |
| [`test_ontologies.py`](./test_ontologies.py) | `phiadk.ontologies` | ObjectTypes, LinkTypes, ActionTypes, Interfaces, Scenarios, and Transactions. |
| [`test_orchestrator.py`](./test_orchestrator.py) | `phiadk.orchestrator` | Palantir 20-namespace routing, Priority scoring (`P1` to `P4`), and multi-agent execution. |
| [`test_phiadk.py`](./test_phiadk.py) | `phiadk.client` | Master `PhiADKClient` initialization, subclient accessors, and health checks. |
| [`test_phiapi.py`](./test_phiapi.py) | `phiadk.phiapi` | FastAPI REST endpoints, SSE telemetry streams, and schema endpoints. |
| [`test_mcp.py`](./test_mcp.py) | `phiadk.mcp` | Model Context Protocol tool declarations and execution handlers. |
| [`test_phigen.py`](./test_phigen.py) | `phiadk.agents.phigen` | Autonomous type generation and 100% Palantir parity auditor. |
| [`test_phigit_and_query.py`](./test_phigit_and_query.py) | `phiadk.agents.phigit` & `phiadk.query` | Content-addressed SHA-1 CAS DAGs, `RQL`, `OQL`, `QML`, `VQL`. |
| [`test_phisec_phigov_phibus.py`](./test_phisec_phigov_phibus.py) | Security / Governance | Security scans, JWT verification, policy enforcement, compliance checks. |
| [`test_qml_and_toolchain.py`](./test_qml_and_toolchain.py) | Quantum / Toolchain | Quantum circuits, Born rule probability, and CLI scaffolding. |
| [`test_rag.py`](./test_rag.py) | `phiadk.agents.phirag` | Semantic document chunker, embedding generation, and hybrid retrieval. |
| [`test_p_standards.py`](./test_p_standards.py) | P* Standards | `PClient`, `POntologyEngine`, `PObjectType`, `PActionType` symmetry. |

---

## 2. Running Tests

```bash
# Run all 132 tests
pytest --no-cov

# Run specific test file
pytest tests/test_event_bus_and_ontology.py -v
```
