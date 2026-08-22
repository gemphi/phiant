---
outline: deep
---

# PhiCal

> Quantum-inspired learning, superposition semantic search, circuit simulation, and training morphisms.

| | |
|---|---|
| **ID** | `phical` |
| **Class** | `PhiCalAgent` / `PhiCalClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Engine |
| **Domain** | `quantum_learning` |
| **File** | `phiegg/phical/` |
| **Schema** | `phiegg/phical/schema.json` |

## What PhiCal Does

PhiCal brings **quantum-inspired algorithms and simulation** to the agent layer. It performs amplitude superposition semantic search using the Born rule ($P = |\alpha|^2$), simulates quantum circuits (Hadamard, Pauli-X, CNOT gates), and coordinates state-space training morphisms.

## Tasks & Verbs

### `quantum_semantic_search` - Superposition Knowledge Retrieval
| Verb | Description | Parameters |
|------|-------------|------------|
| `query` | Search knowledge spaces in quantum superposition with amplitude ranking | `text: str, top_k: int` |
| `fiber_search` | Search across multiple topological spaces via fiber bundles | `text: str, spaces: list` |

### `circuit_operations` - Quantum Circuit Topology
| Verb | Description | Parameters |
|------|-------------|------------|
| `create_circuit` | Create a new quantum circuit node | `name: str, num_qubits: int` |
| `simulate_circuit` | Apply gate chains and measure state probabilities | `circuit_id: str` |
| `compose_circuits` | Concatenate multiple circuit topological chains | `circuit_ids: list` |
| `list_circuits` | Traverse all registered circuits in the space | - |

### `training_morphisms` - State-Space Parameter Transformation
| Verb | Description | Parameters |
|------|-------------|------------|
| `train_model` | Run gradient-descent morphism over data space | `model_name: str, epochs: int` |
| `get_history` | Retrieve training loss and metric trajectories | `model_name: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `QUANTUM_SEMANTIC_SEARCH_V1` | Superposition-based semantic search with amplitude Born rule scoring | `quantum_semantic_search` |
| `QUANTUM_CIRCUIT_SIMULATION_V1` | Topological quantum circuit gate chaining, simulation, and measurement | `circuit_operations`, `training_morphisms` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves training datasets and vector embeddings |
