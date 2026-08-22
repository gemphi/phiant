# AIP Agents & Universal Recursive Lifecycle (`AipAgents/RecursiveLifecycle.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/aip_agents` (`Agent.md`, `AgentVersion.md`, `Session.md`, `SessionTrace.md`).
- **Phient Subsystem**: [`src/phiadk/_core/agent_base.py`](./phient/src/phiadk/_core/agent_base.py) & all 14 domain agents.

---

## 1. The 4-Phase Universal Recursive Lifecycle

Every domain agent in Phient extends `PhiAgent` / `PAgent` and executes through a strict 4-phase recursive lifecycle loop:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    P1["1. Envision<br/>(Formulate Plan)"] --> P2["2. Apply<br/>(Execute Morphism)"]
    P2 --> P3["3. Eval<br/>(Measure & Score)"]
    P3 --> P4["4. Iterate / Scale<br/>(Recurse or Conclude)"]
    P4 -.->|Refinement needed| P1
```

---

## 2. Python SDK Agent Execution

```python
import asyncio
from phiadk import PhiADKClient
from phiadk._core import AgentContext

client = PhiADKClient()
agent = client.agents["phione"]

async def run_agent():
    ctx = AgentContext(
        verb="lookup_employee",
        parameters={"email": "jane@phient.com"}
    )
    result_ctx = await agent.run(ctx)
    print("Plan:", result_ctx.results["plan"])
    print("Output:", result_ctx.results["output"])
    print("Confidence:", result_ctx.confidence)

asyncio.run(run_agent())
```
