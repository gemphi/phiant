# Orchestrator Specification

## 1. Overview

The orchestrator is the brain of the M-KOPA Agentic Ecosystem. Built on **LangGraph**, it manages the lifecycle of every request — from intent classification through agent execution to response delivery. It supports single-agent, multi-agent sequential, and multi-agent parallel execution patterns.

## 2. LangGraph State Machine

### State Schema

```python
class OrchestratorState(TypedDict):
    # Input
    request_id: str
    user_query: str
    user_id: str
    conversation_history: list[dict]

    # Routing
    classified_intent: str
    selected_agents: list[str]
    execution_mode: Literal["single", "sequential", "parallel"]
    priority: Priority

    # Execution
    current_agent: str
    agent_results: dict[str, AgentResult]
    pending_approvals: list[dict]

    # Output
    final_response: str
    status: Literal["routing", "executing", "awaiting_approval", "aggregating", "complete", "error"]
    error: str | None
```

### Graph Definition

```
START
  │
  ▼
[classify_intent] ──► Determine intent + select agents
  │
  ▼
[check_priority] ──► Score priority, check rate limits
  │
  ▼
[route_agents] ──► Decide execution mode
  │
  ├──► single ──► [execute_single_agent] ──► [format_response] ──► END
  │
  ├──► sequential ──► [execute_sequential] ──► [format_response] ──► END
  │
  └──► parallel ──► [execute_parallel] ──► [aggregate_results] ──► [format_response] ──► END
```

### Conditional Edges

```python
def route_by_execution_mode(state: OrchestratorState) -> str:
    mode = state["execution_mode"]
    if mode == "single":
        return "execute_single_agent"
    elif mode == "sequential":
        return "execute_sequential"
    else:
        return "execute_parallel"

def check_approval_needed(state: OrchestratorState) -> str:
    if state["pending_approvals"]:
        return "await_approval"
    return "format_response"
```

## 3. Intent Router

### Classification Strategy

The router uses Claude to classify user intent into one of the following categories:

| Intent | Target Agent(s) | Example Query |
|--------|-----------------|---------------|
| `knowledge_query` | Knowledge Agent | "What's our data retention policy?" |
| `run_automation` | Automation Agent | "Generate the weekly sales report" |
| `identity_operation` | Identity Agent | "Add user to the Engineering group" |
| `hr_query` | HR Agent | "What's my leave balance?" |
| `docs_operation` | Docs Agent | "Create a runbook for the deploy process" |
| `onboard_employee` | Onboarding Agent | "Onboard Jane Doe starting Monday" |
| `multi_query` | Multiple Agents | "Set up a new team member and create their docs" |

### Classification Prompt

```
Analyse the user's request and classify the intent.

Available agents and their capabilities:
- knowledge: Internal knowledge, policies, FAQs, documentation search
- automation: Workflow automation, reports, scheduled tasks
- identity: Entra ID operations - user accounts, groups, licenses
- hr: HiBob operations - employee data, leave, org structure
- docs: Notion operations - documentation, pages, knowledge base
- onboarding: New employee onboarding (coordinates identity + hr + docs)

Return JSON:
{
  "intent": "<intent_name>",
  "agents": ["<agent_1>", "<agent_2>"],
  "execution_mode": "single|sequential|parallel",
  "parameters": { ... extracted parameters ... },
  "confidence": 0.0-1.0
}
```

## 4. Priority Framework

### Priority Levels

| Level | Label | SLA | Example |
|-------|-------|-----|---------|
| P1 | Critical | < 5 min | Security incident, account lockout |
| P2 | High | < 30 min | New employee starting today |
| P3 | Standard | < 4 hrs | Access request, report generation |
| P4 | Low | < 24 hrs | Documentation update, audit query |

### Scoring Algorithm

```python
def calculate_priority(request: Request) -> Priority:
    score = 0

    # Urgency signals
    if request.contains_urgency_keywords:  # "urgent", "asap", "blocked"
        score += 30

    # Request type weight
    type_weights = {
        "security": 40,
        "onboarding_today": 35,
        "access_request": 20,
        "report": 10,
        "documentation": 5,
    }
    score += type_weights.get(request.type, 10)

    # Requester role weight
    role_weights = {
        "director": 15,
        "manager": 10,
        "engineer": 5,
    }
    score += role_weights.get(request.role, 5)

    # Map to priority
    if score >= 60: return Priority.P1
    if score >= 40: return Priority.P2
    if score >= 20: return Priority.P3
    return Priority.P4
```

### Queue Management

- P1 requests pre-empt all other processing
- P2-P4 processed in FIFO order within priority band
- Rate limiting: Max 10 concurrent agent executions
- Backpressure: Queue depth > 50 triggers alert

## 5. Conversation Memory

### Short-term Memory (per session)

```python
conversation_history: list[dict] = [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "...", "agent": "knowledge"},
]
```

- Maintained per `session_id`
- Last 20 turns kept in context
- Cleared on session end

### Long-term Memory (persistent)

- User preferences stored in SQLite
- Frequently accessed documents cached
- Common queries → precomputed answers

## 6. Error Recovery

| Scenario | Recovery Strategy |
|----------|-------------------|
| Agent timeout | Retry once, then return partial result |
| LLM rate limit | Queue request, retry after backoff |
| Connector down | Circuit breaker, return cached data if available |
| Intent unclear | Ask clarifying question |
| Multi-agent partial failure | Return successful results + error details |
