# Quantum Model Language (QML) - Query Engine (v2)

**QML** is Phient's proprietary query paradigm modeling state retrieval and circuit operations over complex amplitude Hilbert spaces ($\mathbb{C}^N$).

## 1. Fluent Quantum Query Interface

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Superposition initialization -> Gates -> Entanglement -> Born Measurement
result = (
    client.qml("entangled_retrieval")
    .superposition(["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
    .apply_gate("H", qubit=0)
    .entangle(0, 1)
    .decoherence_filter(threshold=0.1)
    .born_measurement(threshold=0.05)
    .execute()
)

print(result.probabilities)  # e.g., {'|00⟩': 0.5, '|11⟩': 0.5}
print(result.to_dict())
```
