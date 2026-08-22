# PhiCal: Quantum Learning & Superposition Ontologylogy

PhiCal models semantic retrieval and quantum circuits as topological vector spaces over complex amplitudes ($\mathbb{C}^N$), scoring relevance through the Born rule ($P = |\alpha|^2$) and decoherence filtering.

## 1. Quantum Simplicial Circuit & Semantic Space

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    subgraph CircuitSpace["Circuit Space (Gate Chain Simplex)"]
        Q0["Qubit |0⟩"] --> H["Hadamard Gate (H)"]
        Q1["Qubit |0⟩"] --> CNOT["CNOT Gate"]
        H --> CNOT
        CNOT --> BellState["|Φ⁺⟩ = (|00⟩ + |11⟩)/√2"]
    end

    subgraph SemanticSuperposition["Superposition Space"]
        DocA["Node: Doc A (amp: 0.8+0.1j)"]
        DocB["Node: Doc B (amp: 0.6+0.2j)"]
        DocC["Node: Doc C (amp: 0.1+0.0j)"]
    end

    BellState -->|Morphism: measure| Measure["State Probability Distribution"]
    SemanticSuperposition -->|Born Rule Filter: P >= decoherence| TopResults["Superposition Search Results"]
```

### Tensor Flow
```
|ψ⟩ = α|Doc A⟩ + β|Doc B⟩ + γ|Doc C⟩
  │
  ├─► [ Born Measurement: P(A) = |α|² ] ──► (Above decoherence threshold 0.25) ──► Retained
  ├─► [ Born Measurement: P(B) = |β|² ] ──► (Above decoherence threshold 0.25) ──► Retained
  └─► [ Born Measurement: P(C) = |γ|² ] ──► (Decoheres / Collapse to 0)       ──► Pruned
```

## 2. Gradient Descent Training Morphism

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'actorBkg': 'transparent', 'actorBorder': '#3b82f6', 'actorTextColor': '#ffffff', 'signalColor': '#60a5fa', 'signalTextColor': '#ffffff', 'labelBoxBkgColor': 'transparent', 'labelBoxBorderColor': '#475569'}}}%%
sequenceDiagram
    autonumber
    actor Engine
    participant PhiCal as PhiCalAgent
    participant ParamSpace as Parameter Space θ
    participant LossSurface as Loss Manifold L(θ)

    Engine->>PhiCal: execute_verb('train_model', epochs=5)
    loop Each Epoch
        PhiCal->>LossSurface: Compute gradient ∇L(θ)
        PhiCal->>ParamSpace: Morphism θ_{t+1} = θ_t - η ∇L
    end
    PhiCal-->>Engine: Morphism(completed, loss_history)
```

## 3. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: `phiora` (Vector records & embeddings)
- **Feeds into**: `qml` (Quantum query language), `phimen` (Optimization parameters)
