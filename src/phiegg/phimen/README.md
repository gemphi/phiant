# PhiMen: Virtual CEO & Strategic Orchestration Agent

`PhiMen` acts as the Virtual CEO. It evaluates high-level executive objectives across all domain spaces (`phione`, `phical`, `phirag`, `phidoc`, `phibot`, `phibrd`), synthesizes strategic plans, and delegates atomic tasks recursively.

---

## 1. Architectural & Strategic Synthesis Flow

```mermaid
graph TD
    Objective["Executive Strategic Objective (e.g. Q3 Expansion)"] --> PhiMen["PhiMen (Virtual CEO)"]

    subgraph DecisionLoop["Recursive Strategy Loop"]
        Assess["1. Assess Situation Across Spaces"]
        Plan["2. Synthesize Strategic Action Plan"]
        Delegate["3. Delegate Morphisms to Domain Agents"]
        Eval["4. Evaluate Confidence & Decide (Conclude/Recurse)"]
    end

    PhiMen --> DecisionLoop
    Delegate --> A1["PhiOne (Headcount)"]
    Delegate --> A2["PhiRAG (Knowledge)"]
    Delegate --> A3["PhiBot (Automations)"]
    A1 & A2 & A3 --> Eval
```

### Flow Diagram
```
[ Executive Goal: "Launch Global Expansion" ]
                      │
                      ▼
[ PhiMenAgent.envision() ] ──► (Survey all 10 domain agent spaces)
                      │
                      ▼
[ PhiMenAgent.apply() ]
                      ├─► (ASSESS_OBJECTIVE)  ──► Decompose goal into domain tasks
                      ├─► (DELEGATE_STRATEGY) ──► Construct strategic Fiber bundle
                      └─► (SYNTHESIZE_REPORT) ──► Aggregate sub-agent outputs
                      │
                      ▼
[ PhiMenAgent.eval() ] ──► (Compute cross-domain completion confidence)
                      │
                      ▼
[ PhiMenAgent.iterate() ]
                      ├─► (confidence >= 0.8) ──► "conclude"
                      ├─► (depth < max_depth)  ──► "recurse" (refine objective)
                      └─► (otherwise)          ──► "escalate"
```

---

## 2. Key Components

- **`executive.py`**: `ExecutiveAgent` (`PhiMenAgent`) lifecycle implementation.
- **`card.py`**: `PHIMEN_CARD` definition.
- **`verbs.py`**: `PhiMenVerb` typed enum constants.
- **`spec.md`**: Formal specification contract.
