# {{agent_name}}: {{domain}} Domain Agent

`{{agent_name}}` coordinates {{domain}} topological operations and state mutations with version `{{version}}`.

---

## 1. Architectural Flow

```mermaid
graph LR
    A["Request"] --> B["{{class_name}}.envision()"]
    B --> C["{{class_name}}.apply()"]
    C --> D["{{class_name}}.eval()"]
    D --> E["{{class_name}}.iterate()"]
```

---

## 2. Python SDK Usage

```python
from phiegg import PhiEggClient

client = PhiEggClient()
agent = client.agents["{{agent_id}}"]
print(f"Agent Version: {agent.version}")
```
