# PhiBot: Automation & Playbook Execution Agent

`PhiBot` is the operational automation agent. It manages executable DAG playbooks, validates execution preconditions, coordinates webhooks, and records automation receipts.

---

## 1. Architectural & DAG Execution Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    subgraph PlaybookDAG["Playbook Directed Acyclic Graph"]
        Step1["Step 1: Check Preconditions"] --> Step2["Step 2: Trigger Webhook Morphism"]
        Step2 --> Step3["Step 3: Verify Output"]
        Step3 --> Step4["Step 4: Emit PhiLog Audit"]
    end

    Trigger["Trigger Playbook (e.g. it_provisioning)"] --> Step1
```

### Flow Diagram
```
[ Automation Trigger ]
          │
          ▼
[ PhiBotAgent.envision() ] ──► (Verify playbook ID & parameters)
          │
          ▼
[ PhiBotAgent.apply() ]
          ├─► (LIST_PLAYBOOKS)   ──► Traverse available automation playbooks
          ├─► (EXECUTE_PLAYBOOK) ──► Execute state transitions in DAG sequence
          └─► (CHECK_STATUS)     ──► Query execution status and output
          │
          ▼
[ PhiBotAgent.eval() ] ──► (Verify all DAG step receipts completed)
          │
          ▼
[ PhiBotAgent.iterate() ] ──► (Emit execution audit trail to PhiLog)
```

---

## 2. Key Components

- **`agent.py`**: `PhiBotAgent` lifecycle implementation.
- **`playbook.py`**: `PlaybookClient` managing playbook DAGs.
- **`verbs.py`**: `PhiBotVerb` typed enum constants.
- **`spec.md`**: Formal specification contract.
