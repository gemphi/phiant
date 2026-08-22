# PhiCal Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiCal** (Quantum Math, Semantic Superposition, and QML).

---

## 1. High-Dimensional Superposition Semantic Search

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Perform semantic superposition search over manifold embeddings
results = client.phical.search.superposition_search(
    query="distributed cryptographic consensus",
    top_k=5,
    decoherence_threshold=0.1
)

for item in results:
    print(f"Node: {item['id']}, Amplitude: {item['amplitude']}, Probability: {item['prob']:.4f}")
```

---

## 2. Quantum Circuit & Gate Operations

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Build and execute a quantum parameter circuit
circuit = client.phical.circuit.create_circuit("bell_state", num_qubits=2)
circuit.h(0)           # Hadamard gate
circuit.cx(0, 1)       # CNOT entanglement
result = circuit.measure()

print("Quantum State Vector:", result["state_vector"])
print("Born Probabilities:", result["probabilities"])
```

---

## 3. Quantum Model Language (QML) Fluent Query API

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Method chaining with Born-rule measurement
qml_res = (
    client.v2.qml("entanglement_space")
    .superposition(["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
    .apply_gate("H", qubit=0)
    .entangle(0, 1)
    .decoherence_filter(0.15)
    .born_measurement(0.05)
    .execute()
)

print(f"Observed State: {qml_res.observed_state}")
print(f"Probabilities: {qml_res.probabilities}")
```
