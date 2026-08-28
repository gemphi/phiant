---
title: Platform Architecture
description: Deep dive into Phient's dual-cognition agent runtime, micro-kernel lifecycle, and execution pipeline.
---

# Dual-Cognition Platform Architecture

Phient is built upon a deterministic micro-kernel architecture that separates **deliberative planning** from **reflexive execution**. This separation guarantees that high-stakes enterprise decisions undergo multi-step verification and invariant checks, while tool execution and data pipelining operate at bare-metal performance.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#38bdf8', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#818cf8', 'textColor': '#f8fafc', 'primaryTextColor': '#f8fafc', 'nodeTextColor': '#f8fafc', 'edgeLabelBackground': '#0f172a'}}}%%
sequenceDiagram
    autonumber
    participant Op as Operator / Client
    participant Gate as Ingress Gateway
    participant Guard as Policy & OOD Guardrail
    participant Delib as Deliberative Planner (LLM)
    participant Kernel as Reflexive Execution Kernel
    participant MCP as MCP Tool Subroutine Registry
    participant Ledger as Cryptographic Audit Ledger

    Op->>Gate: Dispatches Action Intent
    Gate->>Guard: Validate Policy & Schema Bounds
    alt Policy Violation / Out-of-Bounds
        Guard-->>Op: 403 Forbidden (Quarantine Intent)
    else Valid Intent
        Guard->>Delib: Generate DAG Execution Plan
        Delib->>Kernel: Emit Compiled Action Graph
        loop For Each Task Node in DAG
            Kernel->>MCP: Execute Sandboxed Tool Call
            MCP-->>Kernel: Return Verified Typed Result
            Kernel->>Ledger: Append State Delta to Audit Log
        end
        Kernel-->>Delib: Aggregate Execution Manifest
        Delib-->>Op: Return Final Synthesized Response
    end
```

---

## 1. The Two-Phase Cognition Loop

### Phase I: Deliberative Planning
The deliberative layer functions as the strategic cognitive engine:
- **Intent Disambiguation**: Analyzes ambiguous user requests and requests operator clarification before initiating side effects.
- **DAG Compilation**: Generates a directed acyclic graph (DAG) of sub-tasks, identifying parallelizable execution paths and critical dependencies.
- **Invariant Verification**: Checks proposed tool calls against pre-execution safety invariants (e.g., maximum budget spend, read-only constraints, geographical data residency).

### Phase II: Reflexive Execution Kernel
The reflexive layer is a deterministic Python runtime executing asynchronous event loops:
- **Lock-Free State Synchronization**: Uses atomic state transitions to guarantee consistency across concurrent agent workflows.
- **Subroutine Dispatch**: Routes tool requests to the MCP registry with rigorous timeout, retry, and circuit breaker policies.
- **Dynamic Context Injection**: Streams fresh vector context and episodic memory into the agent context window without bloat.

---

## 2. Micro-Kernel State Machine

The core runtime state machine enforces strict lifecycle transitions for every agent instance:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#38bdf8', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#818cf8', 'textColor': '#f8fafc', 'primaryTextColor': '#f8fafc', 'nodeTextColor': '#f8fafc', 'edgeLabelBackground': '#0f172a'}}}%%
stateDiagram-v2
    [*] --> Initialized: Agent Spawned
    Initialized --> Planning: Goal Ingested
    Planning --> EvaluatingPolicy: Plan Compiled
    EvaluatingPolicy --> Rejected: Invariant Failed
    EvaluatingPolicy --> Executing: Invariant Passed
    
    state Executing {
        [*] --> Dispatched
        Dispatched --> ToolCalling
        ToolCalling --> AwaitingResult
        AwaitingResult --> ValidatingOutput
        ValidatingOutput --> [*]
    }

    Executing --> RePlanning: Recoverable Failure
    RePlanning --> Planning
    Executing --> Finalizing: All DAG Nodes Completed
    Executing --> ErrorState: Unrecoverable Fault
    
    Finalizing --> Completed: Audit Log Committed
    Completed --> [*]
    Rejected --> [*]
    ErrorState --> [*]
```

---

## 3. Data Contracts & Serialization

Every message, intent, plan, and tool invocation in Phient is modeled via strict **Pydantic v2** models backed by `pydantic-core` (Rust):

```python
from pydantic import BaseModel, Field
from typing import Literal, Dict, Any
from datetime import datetime

class AgentActionProposal(BaseModel):
    action_id: str = Field(..., description="Unique UUID for proposed action")
    agent_id: str = Field(..., description="Target specialist agent identifier")
    verb: str = Field(..., description="Target verb to execute on the agent")
    parameters: Dict[str, Any] = Field(default_factory=dict)
    risk_level: Literal["low", "medium", "high", "critical"] = "low"
    requires_human_signoff: bool = False
    proposed_at: datetime = Field(default_factory=datetime.utcnow)

class ExecutionResult(BaseModel):
    action_id: str
    status: Literal["success", "failed", "quarantined"]
    data: Dict[str, Any]
    execution_duration_ms: float
    audit_hash: str
```
