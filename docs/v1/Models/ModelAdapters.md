# Model Adapters & Inference Contracts (v1)

Model Adapters bridge external algorithms, local weights, and cloud machine learning runtimes into standardized POntology Morphisms.

---

## 1. The ModelAdapter Interface

Every Model Adapter defines three core capabilities:
1. **`api_signature()`**: Input feature tensor/table columns and output schema.
2. **`save()` & `load()`**: Serialization to/from `PhiOra` cryptographic storage.
3. **`predict()`**: Synchronous or streaming prediction logic.

```mermaid
graph LR
    InputData["Input Features (DataFrame / Dict)"] --> Adapter["ModelAdapter"]
    Adapter --> Preprocess["Feature Preprocessing"]
    Preprocess --> ModelWeights["Model Artifact (.onnx / .safetensors)"]
    ModelWeights --> Postprocess["Post-processing & Confidence Score"]
    Postprocess --> Receipt["Prediction Receipt"]
```

---

## 2. Implementing a Custom Model Adapter

```python
from typing import Any, Dict
from phiegg.phical.training import ModelAdapter

class EmployeeChurnAdapter(ModelAdapter):
    def api_signature(self) -> Dict[str, Any]:
        return {
            "inputs": {"tenure_months": "integer", "leave_taken": "integer", "department": "string"},
            "outputs": {"churn_probability": "float", "risk_level": "string"}
        }

    def predict(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        tenure = inputs.get("tenure_months", 0)
        leave = inputs.get("leave_taken", 0)
        prob = min(1.0, max(0.0, (leave * 0.05) - (tenure * 0.01)))
        return {
            "churn_probability": round(prob, 4),
            "risk_level": "HIGH" if prob > 0.6 else "LOW"
        }
```
