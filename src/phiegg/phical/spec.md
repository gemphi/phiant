# PhiCal Formal Specification (`spec.md`)

- **Agent ID**: `phical`
- **Agent Name**: `PhiCal`
- **Domain**: `quantum_learning`
- **Layer**: `AgentLayer.ENGINE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiCalVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `SEMANTIC_SEARCH` | `"semantic_search"` | `{"query": str, "top_k": int}` | `List[SuperpositionNode]` | Born-rule filtered document ranking. |
| `CREATE_CIRCUIT` | `"create_circuit"` | `{"circuit_id": str, "qubits": int}` | `CircuitState` | Allocate qubit manifold in $\mathbb{C}^{2^N}$. |
| `SIMULATE_CIRCUIT`| `"simulate_circuit"`| `{"circuit_id": str}` | `QMLResult` dict | Matrix multiplication & state collapse. |
| `ADD_GATE` | `"add_gate"` | `{"gate": str, "qubit": int}` | `{"status": "applied"}` | Apply unitary operator ($H, X, Z, R_y, \text{CNOT}$). |
| `MEASURE` | `"measure"` | `{"threshold": float}` | `Dict[str, float]` | Calculate Born probabilities $P = |\alpha|^2$. |
| `TRAIN_MODEL` | `"train_model"` | `{"epochs": int, "lr": float}` | `{"loss_history": List}` | Gradient descent $\theta_{t+1} = \theta_t - \eta \nabla L$. |

---

## 2. Supported Tasks (`PhiCalTask`)

- `QUANTUM_SEARCH` (`"quantum_search"`)
- `CIRCUIT_SIMULATION` (`"circuit_simulation"`)
- `MODEL_TRAINING` (`"model_training"`)

---

## 3. Specifications (`PhiCalSpec`)

- `QUANTUM_LEARNING_V1` (`"QUANTUM_LEARNING_V1"`)
