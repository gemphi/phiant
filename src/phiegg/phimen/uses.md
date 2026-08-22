# PhiMen Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiMen** (Virtual CEO Strategic Orchestrator).

---

## 1. High-Level Executive Strategy Orchestration

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Execute high-level strategic objectives with multi-agent orchestration
decision = client.phimen.orchestrate_strategy(
    objective="Expand European operations and hire 5 Staff Engineers",
    constraints=["Budget: $1.2M", "Compliance: GDPR strictly enforced"],
    required_domains=["phione", "phigov", "phisec", "phibrd"]
)

print(f"Executive Decision: {decision['decision']}")
print("Allocated Domain Tasks:")
for task in decision["allocated_tasks"]:
    print(f"- [{task['agent']}] {task['task_name']}: {task['status']}")
```

---

## 2. Multi-Phase Recursive Evaluation

```python
import asyncio
from phiegg import PhiEggClient
from phiegg._core import AgentContext

client = PhiEggClient()
ceo_agent = client.agents["phimen"]

async def run_evaluation():
    ctx = AgentContext(
        verb="execute_recursive_evaluation",
        parameters={"proposal_id": "prop_quantum_expansion_q4"}
    )
    result = await ceo_agent.run(ctx)
    print("CEO Evaluation Score:", result.results["output"]["score"])
    print("Executive Directive:", result.results["output"]["directive"])

asyncio.run(run_evaluation())
```
