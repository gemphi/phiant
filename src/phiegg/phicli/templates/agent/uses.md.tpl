# {{agent_name}} Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **{{agent_name}}** (`{{agent_id}}`).

---

## 1. Direct Domain Client Usage

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Execute domain action
result = client.{{agent_id}}.execute("{{first_verb}}", {"sample_param": "value"})
print("Result:", result)
```

---

## 2. Universal Agent Recursive Lifecycle Invocation

```python
import asyncio
from phiegg import PhiEggClient
from phiegg._core import AgentContext

client = PhiEggClient()
agent = client.agents["{{agent_id}}"]

async def main():
    ctx = AgentContext(
        verb="{{first_verb}}",
        parameters={"sample_param": "value"}
    )
    result = await agent.run(ctx)
    print("Agent Output:", result.results.get("output"))

asyncio.run(main())
```
