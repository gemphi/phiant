# Dependency Documentation: tenacity

## 1. Overview
- **Package**: `tenacity`
- **Version Constraint**: `>=9.0.0`
- **Category**: Resilience & Retry Library
- **Primary Modules**: `src/agents/base_agent.py`

## 2. What It Does
`tenacity` is a Python retry library supporting exponential backoff, custom wait strategies, and error matching predicates.

## 3. Why It Was Chosen
1. **API Resilience**: Retries external API calls (Anthropic/Entra) upon transient 429 or network errors.
2. **Declarative Decorators**: Wraps `BaseAgent.run` logic cleanly.

## 4. Architectural & System Flow Diagrams

### Resilience & Retry Flowchart
```mermaid
graph TD
    A[BaseAgent.run Invocation] --> B[Execute Task Function]
    B --> C{Execution Result}
    C -->|Success 200| D[Return AgentResult]
    C -->|Transient Error / 429| E{Attempt Count < Max Retries?}
    E -->|Yes| F[Calculate Exponential Backoff Wait]
    F -->|Wait Duration| B
    E -->|No| G[Trigger Agent.on_error Fallback]
    G --> H[Return Error AgentResult]
```

### Execution Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    participant Agent as BaseAgent
    participant Tenacity as Tenacity Retry Layer
    participant External as External API

    Agent->>Tenacity: run(task)
    Tenacity->>External: execute()
    External-->>Tenacity: 429 Rate Limit Error
    Tenacity->>Tenacity: Wait Exponential Backoff
    Tenacity->>External: Retry execute()
    External-->>Tenacity: 200 OK Success
    Tenacity-->>Agent: AgentResult
```

## 5. Alternatives Comparison

| Feature | Tenacity | urllib3 retries | Custom Retry Loop |
|---------|----------|-----------------|-------------------|
| Strategy Flexibility | High (Async, Wait, Stop) | HTTP-only | High Maintenance |
| Selection Rationale | Enterprise-grade retry decorator for async python | Limited to HTTP | Boilerplate |

## 6. Code Usage Example

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    reraise=True,
)
async def call_external_api():
    # Attempt operation
    pass
```
