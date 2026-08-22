# Phidemo Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **Phidemo** (`phidemo`).

---

## 1. Direct Domain Client Usage

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Execute domain action
result = client.phidemo.execute("demo_action", {"sample_param": "value"})
print("Result:", result)
```

---

## 2. Universal Agent Recursive Lifecycle Invocation

```python
import asyncio
from phiegg import PhiEggClient
from phiegg._core import AgentContext

client = PhiEggClient()
agent = client.agents["phidemo"]

async def main():
    ctx = AgentContext(
        verb="demo_action",
        parameters={"sample_param": "value"}
    )
    result = await agent.run(ctx)
    print("Agent Output:", result.results.get("output"))

asyncio.run(main())
```
