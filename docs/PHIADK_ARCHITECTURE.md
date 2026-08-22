# PhiADK Architecture & SDK Guide

> **Ecosystem Paradigm**: Repackaged from `phient` into `phiadk` inspired by Palantir's `foundry_sdk`, utilizing **Topology-based AI abstractions** over legacy Ontology jargon, strict **Data-as-Sets separation**, and a **Recursive Fractal Lifecycle** (`envision → apply → eval → iterate/scale`).

---

## 1. Architectural Philosophy

### 1.1 Topology over Ontology
Traditional enterprise systems (like Palantir Foundry) model domain objects as an *Ontology*. PhiADK modernizes this into a **Topological Framework** aligned with modern topological deep learning, Persistent Homology, and Simplicial Complex reasoning.

| Palantir Ontology | PhiADK Topology | Mathematical / Structural Meaning |
|---|---|---|
| `Ontology` | **`Topology`** | The complete connected space of all domain objects and relations |
| `OntologyObject` | **`Node`** | Discrete point / 0-simplex in topology carrying typed properties |
| `ObjectSet` | **`Space`** | Connected subspace / simplicial complex of nodes |
| `ObjectType` | **`SimplexType`** | Simplex dimensionality classification (0-simplex, 1-simplex, 2-simplex...) |
| `Action` | **`Morphism`** | Structure-preserving transformation between spaces |
| `LinkedObject` | **`Edge`** | 1-simplex connection between nodes |
| `Query` | **`Traversal`** | Directed path-finding through the simplicial network |
| `Transaction` | **`Fiber`** | Fiber bundle of ordered morphisms executed atomically |
| `Interface` | **`Manifold`** | Local coordinate chart / projected view over topology |

```
                ┌─────────────────────────────────────────┐
                │          Topology (Ecosystem)           │
                └────────────────────┬────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
   │ EmployeeSpace │◄───────►│ IdentitySpace │◄───────►│ QuantumSpace  │
   │    (phione)   │  Fiber  │    (phione)   │ Search  │   (phical)    │
   └───────┬───────┘         └───────┬───────┘         └───────┬───────┘
           │                         │                         │
     Node (Jane)               Node (UPN)               Qubit (|0⟩+|1⟩)
```

---

## 2. Universal Agent Lifecycle: Fractal & Recursive

All domain agents extend a single base: `PhiAgent`. No agent redefines the abstract layer.
Every agent operates on the recursive four-phase cycle:

$$\text{Lifecycle} = \text{Envision} \longrightarrow \text{Apply} \longrightarrow \text{Eval} \longrightarrow \text{Iterate / Scale}$$

```
                ┌──────────────────────────────────┐
                │         1. ENVISION              │
                │ Define intent, plan spaces       │
                └────────────────┬─────────────────┘
                                 │
                                 ▼
                ┌──────────────────────────────────┐
                │          2. APPLY                │
                │ Execute morphisms & traversals   │
                └────────────────┬─────────────────┘
                                 │
                                 ▼
                ┌──────────────────────────────────┐
                │          3. EVAL                 │
                │ Measure confidence & metrics     │
                └────────────────┬─────────────────┘
                                 │
                                 ▼
                ┌──────────────────────────────────┐
                │        4. ITERATE / SCALE        │
                │ Recurse (depth+1) or conclude    │
                └──────────────────────────────────┘
```

At any phase, an agent can spawn a sub-cycle (`ctx.descend()`) to refine or delegate tasks recursively.

---

## 3. Strict Data-as-Sets Separation (`phiora`)

**Rule**: Agents NEVER embed or mix datasets directly in executable logic.
All data is treated as immutable mathematical sets referenced by `DataSet(set_id, source)` and resolved dynamically by the data layer agent: `phiora`.

```
                    ┌─────────────────────────┐
                    │      Domain Agent       │
                    │ (phione, phirag, etc.)  │
                    └────────────┬────────────┘
                                 │ references DataSet(source="hr_mock.json")
                                 ▼
                    ┌─────────────────────────┐
                    │      phiora Resolver    │
                    │ (Store, Git-KV, Disk)   │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
  Git-KV Records          Vector Index             Disk Datasets
  (Content-Addressed)     (Embeddings)             (phient/data/)
```

---

## 4. The 8 Domain Agents (`phi*` 3-letter naming)

| Agent ID | Class Name | Layer | Domain / Purpose | Specs |
|---|---|---|---|---|
| **`phione`** | `PhiOneAgent` / `PhiOneClient` | Infrastructure | Identity SSO, Entra ID, HR Employee Directory, Leave | `USER_IDENTITY_SSO_V1`, `HR_EMPLOYEE_DIRECTORY_V1` |
| **`phical`** | `PhiCalAgent` / `PhiCalClient` | Engine | Quantum Learning, Superposition Search, Circuit Simulation | `QUANTUM_SEMANTIC_SEARCH_V1`, `QUANTUM_CIRCUIT_SIMULATION_V1` |
| **`phirag`** | `PhiRAGAgent` / `PhiRAGClient` | Data | Retrieval Augmented Generation, Vector Search, Prompt Context | `RAG_VECTOR_STORE_V1` |
| **`phidoc`** | `PhiDocAgent` / `PhiDocClient` | Application | Documentation, Notion / Confluence sync, Workspace Knowledge | `DOCS_WORKSPACE_SYNC_V1` |
| **`phibot`** | `PhiBotAgent` / `PhiBotClient` | Application | Automation Playbooks, Webhooks, CI/CD Workflow Execution | `AUTOMATION_PLAYBOOK_EXEC_V1` |
| **`phibrd`** | `PhiBrdAgent` / `PhiBrdClient` | Application | Onboarding Orchestration, Multi-Domain Employee Lifecycle | `EMPLOYEE_ONBOARDING_LIFECYCLE_V1` |
| **`phiora`** | `PhiOraAgent` / `PhiOraClient` | Data | Vector & Git-style Content-Addressed KV, DataSet Resolution | `CONTENT_ADDRESSED_KV_V1`, `VECTOR_EMBEDDING_STORE_V1` |
| **`phillm`** | `PhiLLMAgent` / `PhiLLMClient` | Engine | Multi-Provider LLM Inference, Embeddings, Token Counting | `LLM_MODEL_ACCESS_V1` |
| **`phimen`** | `PhiMenAgent` / `PhiMenClient` | Executive | Virtual CEO, Enterprise Cross-Domain Strategy, Recursive Delegation | `EXECUTIVE_STRATEGY_ORCHESTRATION_V1` |

---

## 5. SDK Quickstart & Usage

```python
from phiadk import PhiADKClient, TokenAuth, Config

# Initialize Unified Client
client = PhiADKClient(
    auth=TokenAuth("phi_secret_token_123"),
    hostname="api.phient.com",
)

# 1. Traversal through HR Employee space
employee = await client.phione.Employee.lookup("jane@company.com")
print(f"Employee: {employee.display_name} - {employee.title}")

# 2. Quantum Superposition Semantic Search
results = await client.phical.SemanticSearch.query("distributed state consensus", top_k=3)
for r in results:
    print(f"Score: {r.score:.3f} (P={r.probability:.3f}) | Source: {r.source}")

# 3. Virtual CEO Strategic Assessment (Fractal Lifecycle)
strategy_ctx = await client.phimen.Strategy.assess("Expand AI operations into APAC region")
print(f"Executive Decision: {strategy_ctx.results.get('decision')}")
```

---

## 6. Enterprise `P*` Standard Classes & Ontologies Layer

PhiADK exposes enterprise-grade `P*` standard classes that provide 1:1 parity with Palantir Foundry SDK conventions:

```python
from phiadk import (
    PClient,
    PAsyncClient,
    POntology,
    POntologyType,
    PObjectType,
    PPropertyType,
    PLinkType,
    PActionType,
    PActionParameter,
    POntologyObject,
    POntologyObjectSet,
    POntologyInterface,
    POntologyTransaction,
    POntologyScenario,
    POntologyEngine,
    PAgent,
    PNode,
    PSpace,
    PMorphism,
)

# 1. Initialize PClient
client = PClient()

# 2. Query Ontology Schema & Objects
emp_type = client.ontologies.Ontology.ObjectType.get("Employee")
employees = client.ontologies.Ontology.ObjectSet.of_type("Employee")

# 3. Execute Validated Mutation Action
receipt = client.ontologies.Ontology.Action.apply(
    action_type="onboard_employee",
    parameters={"email": "alex.chen@phient.com", "name": "Alex Chen"},
)
print("Action Applied SHA:", receipt["commit_sha1"])
```

