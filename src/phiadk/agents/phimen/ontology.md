# PhiMen: Virtual CEO & Strategic Orchestration Ontologylogy

PhiMen acts as the Virtual CEO. It evaluates high-level executive objectives by surveying all domain spaces (`phione`, `phirag`, `phical`, `phibot`, `phibrd`), synthesizing strategic plans, and delegating sub-tasks recursively.

## 1. Global Executive Manifold

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Objective["Executive Strategic Objective (e.g. Q3 Expansion)"] --> PhiMen["PhiMen (Virtual CEO)"]

    subgraph ExecutiveEvaluation["Recursive Evaluation Loop"]
        Assess["Assess Situation Across Spaces"]
        Synthesize["Synthesize Strategy"]
        Delegate["Delegate Strategic Fibers"]
        Evaluate["Evaluate Sub-Agent Confidence"]
    end

    PhiMen --> ExecutiveEvaluation

    Delegate --> S1["phione (Headcount & Org)"]
    Delegate --> S2["phirag (Knowledge & Policies)"]
    Delegate --> S3["phibot (Automation Rollout)"]
    Delegate --> S4["phical (Model Training)"]

    S1 & S2 & S3 & S4 --> Evaluate
```

### Executive Space Coordination
```
[ Virtual CEO: PhiMen ]
           │
           ├─► [ Assess: Cross-Domain Survey ]
           ├─► [ Synthesize: Action Plan ]
           ├─► [ Delegate: Atomic Morphisms ] ──► [ Domain Agents (phi*) ]
           └─► [ Iterate: Feedback Loop & Decision ]
```

## 2. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: All domain clients (`phione`, `phical`, `phirag`, `phidoc`, `phibot`, `phibrd`, `phiora`, `phigit`, `philog`, `phillm`)
- **Feeds into**: System orchestrator and executive reporting dashboards
