# Agent Specifications

## 1. Base Agent Contract

All agents inherit from `BaseAgent` and implement:

```python
class BaseAgent(ABC):
    name: str                    # Unique identifier
    description: str             # What this agent does (used by router)
    capabilities: list[str]      # List of capabilities for intent matching
    required_permissions: list   # RBAC permissions needed
    max_retries: int = 3         # Retry attempts on failure
    timeout_seconds: int = 30    # Per-invocation timeout

    @abstractmethod
    async def execute(self, task: AgentTask) -> AgentResult:
        """Execute the agent's primary function."""

    async def validate_input(self, task: AgentTask) -> bool:
        """Validate task input before execution."""

    async def on_error(self, error: Exception, task: AgentTask) -> AgentResult:
        """Error handler with fallback logic."""
```

### AgentTask Schema

```python
@dataclass
class AgentTask:
    task_id: str                 # UUID
    intent: str                  # Classified intent
    query: str                   # User's original query
    parameters: dict             # Extracted parameters
    context: dict                # Conversation context
    priority: Priority           # P1-P4
    requested_by: str            # User ID
    requested_at: datetime       # Timestamp
    metadata: dict               # Additional metadata
```

### AgentResult Schema

```python
@dataclass
class AgentResult:
    task_id: str
    agent_name: str
    status: Literal["success", "error", "needs_approval", "partial"]
    output: str                  # Human-readable response
    data: dict                   # Structured data payload
    actions_taken: list[str]     # Audit trail of actions
    tokens_used: int             # Token consumption
    duration_ms: int             # Execution time
    confidence: float            # 0.0 - 1.0
```

---

## 2. Knowledge Agent

**Purpose**: RAG-powered internal knowledge retrieval. Answers questions about Phient policies, processes, technical documentation, and organisational knowledge.

### Capabilities

- `knowledge_search` — Search internal knowledge base
- `policy_lookup` — Find specific policies and procedures
- `faq_answer` — Answer frequently asked questions
- `document_summary` — Summarise long documents

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_knowledge_base` | Semantic search over ChromaDB | `query: str, top_k: int, collection: str` |
| `get_document` | Retrieve full document by ID | `doc_id: str` |
| `summarise_document` | Generate document summary | `doc_id: str, max_length: int` |

### System Prompt

```
You are Phient's internal Knowledge Agent. Your role is to answer questions
about Phient's policies, processes, and organisational knowledge using the
retrieved context provided to you.

Rules:
1. ONLY answer based on the retrieved context. Never fabricate information.
2. If the context doesn't contain the answer, say so clearly.
3. Always cite the source document and section.
4. For policy questions, quote the relevant text directly.
5. If the question is ambiguous, ask for clarification.
```

### Example Interactions

```
User: "What is Phient's leave policy for employees in Kenya?"
Agent: Based on the Kenya Employee Handbook (Section 4.2), employees are
       entitled to... [cites specific policy text]

User: "How do I request a laptop replacement?"
Agent: According to the IT Equipment Policy (IT-POL-003)...
```

---

## 3. Automation Agent

**Purpose**: Executes predefined workflow automations for internal processes. Manages playbooks for common operational tasks.

### Capabilities

- `run_automation` — Execute a predefined automation playbook
- `list_automations` — List available automation playbooks
- `schedule_automation` — Schedule recurring automation
- `check_automation_status` — Check status of running automation

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `execute_playbook` | Run an automation playbook | `playbook_id: str, params: dict` |
| `list_playbooks` | List available playbooks | `category: str` |
| `get_playbook_status` | Check playbook execution status | `execution_id: str` |
| `schedule_playbook` | Schedule recurring execution | `playbook_id: str, cron: str` |

### Available Playbooks

| Playbook | Description | Trigger |
|----------|-------------|---------|
| `weekly_report_gen` | Generate weekly team reports | Scheduled / manual |
| `access_review` | Quarterly access review automation | Scheduled |
| `license_audit` | Software license usage audit | Manual |
| `incident_triage` | Initial incident triage and routing | Event-driven |
| `data_export` | Compliant data export for reports | Manual |

---

## 4. Identity Agent (Entra)

**Purpose**: Microsoft Entra ID integration for user lifecycle management, access control, and identity operations.

### Capabilities

- `user_lookup` — Find user details in Entra ID
- `user_provision` — Create new user account
- `user_deprovision` — Disable/remove user account
- `group_manage` — Add/remove users from groups
- `access_review` — Review and report on access rights
- `license_assign` — Assign/revoke software licenses

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_user` | Get user profile from Entra | `email: str \| upn: str` |
| `create_user` | Provision new user | `user_data: UserCreate` |
| `disable_user` | Disable user account | `user_id: str, reason: str` |
| `add_to_group` | Add user to security group | `user_id: str, group_id: str` |
| `remove_from_group` | Remove user from group | `user_id: str, group_id: str` |
| `list_user_groups` | List all groups for a user | `user_id: str` |
| `assign_license` | Assign license to user | `user_id: str, sku_id: str` |

### Safety Constraints

- [APPROVAL] `create_user` -- Requires **human approval** before execution
- [APPROVAL] `disable_user` -- Requires **human approval** before execution
- [APPROVAL] `remove_from_group` -- Logs action, notifies admin
- [SAFE] `get_user`, `list_user_groups` -- Read-only, no approval needed

---

## 5. HR Agent (Enterprise HRIS)

**Purpose**: Enterprise HRIS integration for employee data queries, leave management, and organisational structure.

### Capabilities

- `employee_lookup` — Find employee details
- `org_structure` — Query organisational hierarchy
- `leave_balance` — Check leave balances
- `leave_request` — Submit leave requests
- `team_report` — Generate team composition reports
- `headcount_report` — Headcount by country/department

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_employee` | Get employee profile | `email: str \| employee_id: str` |
| `search_employees` | Search employees by criteria | `filters: dict` |
| `get_org_chart` | Get organisational hierarchy | `root_id: str, depth: int` |
| `get_leave_balance` | Check leave balance | `employee_id: str` |
| `get_team_members` | List direct reports | `manager_id: str` |
| `get_headcount` | Headcount by dimension | `group_by: str` |

### Data Access Rules

- Employee can view own profile + direct reports
- Managers can view team data
- HR team has full read access
- PII fields (salary, DOB) restricted to HR + Finance

---

## 6. Docs Agent (Notion)

**Purpose**: Notion integration for documentation management, knowledge base operations, and content creation.

### Capabilities

- `search_docs` — Search Notion workspace
- `create_page` — Create new Notion page
- `update_page` — Update existing page
- `sync_knowledge_base` — Sync Notion content to RAG vector store
- `generate_doc` — Generate documentation from templates

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_notion` | Search Notion pages | `query: str, database_id: str` |
| `get_page` | Get page content | `page_id: str` |
| `create_page` | Create new page | `parent_id: str, title: str, content: str` |
| `update_page` | Update page content | `page_id: str, content: str` |
| `sync_to_vectorstore` | Sync pages to ChromaDB | `database_id: str` |

---

## 7. Onboarding Agent

**Purpose**: Multi-agent orchestrator for new employee onboarding. Coordinates Identity, HR, and Docs agents to execute the full onboarding workflow.

### Capabilities

- `onboard_employee` — Full onboarding workflow
- `onboarding_status` — Check onboarding progress
- `onboarding_checklist` — Generate/update onboarding checklist

### Workflow Steps

```
1. [HR Agent]       → Verify employee record in Enterprise HRIS
2. [Identity Agent] → Create Entra ID account
3. [Identity Agent] → Add to department security groups
4. [Identity Agent] → Assign required licenses (M365, etc.)
5. [Docs Agent]     → Create personal onboarding page in Notion
6. [Docs Agent]     → Share relevant department documentation
7. [Automation]     → Send welcome email with credentials
8. [Automation]     → Schedule orientation meetings
```

### State Machine

```
INITIATED → VERIFYING_HR → CREATING_IDENTITY → ASSIGNING_GROUPS
    → ASSIGNING_LICENSES → CREATING_DOCS → SENDING_WELCOME → COMPLETED
```

Each step has: `pending | in_progress | completed | failed | needs_approval`

---

## 8. Agent Interaction Patterns

### Single Agent (Direct)
```
User → Router → Knowledge Agent → Response
```

### Sequential Multi-Agent
```
User → Router → Agent A → Agent B → Aggregated Response
```

### Parallel Multi-Agent
```
User → Router → [Agent A, Agent B, Agent C] → Aggregator → Response
```

### Orchestrated Workflow (Onboarding)
```
User → Onboarding Agent → [HR Agent → Identity Agent → Docs Agent] → Status
```
