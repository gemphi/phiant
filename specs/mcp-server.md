# MCP Server Specification

## 1. Overview

The Model Context Protocol (MCP) server exposes the Phient agent ecosystem as tools accessible from Claude Desktop, Claude Code, and other MCP-compatible clients. This allows Phient engineers to invoke agents directly from their development environment.

## 2. Server Configuration

```python
server_config = {
    "name": "phient-agents",
    "version": "1.0.0",
    "description": "Phient AI Ops Agent Platform",
    "transport": "stdio",              # "stdio" for Claude Desktop, "sse" for web
    "capabilities": {
        "tools": True,
        "resources": True,
        "prompts": True,
    }
}
```

## 3. MCP Tools

### Agent Invocation Tools

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `ask_knowledge` | Query the internal knowledge base | `query: str, collection?: str` |
| `run_automation` | Execute an automation playbook | `playbook: str, params?: dict` |
| `lookup_user` | Look up user in Entra ID | `email: str` |
| `lookup_employee` | Look up employee in Enterprise HRIS | `email: str` |
| `search_docs` | Search Notion documentation | `query: str` |
| `onboard_employee` | Start onboarding workflow | `employee_data: dict` |
| `check_leave_balance` | Check leave balance | `email: str` |
| `list_team_members` | List direct reports | `manager_email: str` |
| `agent_status` | Check system health | — |

### Tool Schemas (JSON Schema)

```json
{
  "name": "ask_knowledge",
  "description": "Search Phient's internal knowledge base for policies, processes, and documentation. Returns relevant information with source citations.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The question or search query"
      },
      "collection": {
        "type": "string",
        "enum": ["policies", "technical", "processes", "general"],
        "description": "Optional: specific knowledge collection to search"
      },
      "top_k": {
        "type": "integer",
        "default": 5,
        "description": "Number of results to return"
      }
    },
    "required": ["query"]
  }
}
```

```json
{
  "name": "lookup_user",
  "description": "Look up a user's account details in Microsoft Entra ID (Azure AD). Returns profile information, group memberships, and license assignments.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "description": "User's email address"
      }
    },
    "required": ["email"]
  }
}
```

```json
{
  "name": "onboard_employee",
  "description": "Initiate the full onboarding workflow for a new employee. Creates Entra account, assigns groups/licenses, creates Notion docs. Requires approval for destructive actions.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "full_name": { "type": "string" },
      "email": { "type": "string" },
      "department": { "type": "string" },
      "title": { "type": "string" },
      "start_date": { "type": "string", "format": "date" },
      "manager_email": { "type": "string" },
      "country": {
        "type": "string",
        "enum": ["KE", "UG", "NG", "GH", "ZA", "GB"]
      }
    },
    "required": ["full_name", "email", "department", "title", "start_date", "country"]
  }
}
```

## 4. MCP Resources

Resources expose read-only data from the ecosystem:

| Resource URI | Description |
|-------------|-------------|
| `phient://agents/status` | Current status of all agents |
| `phient://metrics/summary` | System metrics summary |
| `phient://knowledge/collections` | Available knowledge collections |
| `phient://automations/playbooks` | Available automation playbooks |

## 5. MCP Prompts

Pre-built prompt templates for common workflows:

| Prompt Name | Description |
|------------|-------------|
| `onboard-new-employee` | Guided onboarding with all required fields |
| `access-review` | Quarterly access review checklist |
| `incident-response` | Incident triage and response template |
| `knowledge-search` | Optimised knowledge search prompt |

## 6. Transport Configuration

### stdio (Claude Desktop)

```json
{
  "mcpServers": {
    "phient-agents": {
      "command": "python",
      "args": ["-m", "src.mcp.server"],
      "cwd": "/path/to/phient",
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}
```

### SSE (Web clients)

```python
# Server runs on port 3100
# Endpoint: http://localhost:3100/sse
```

## 7. Security

- All tool calls authenticated via MCP session
- Destructive operations require explicit confirmation
- All invocations logged to audit trail
- Rate limited: 60 tool calls per minute per session
