# Security Specification

## 1. Overview

Security model for the Phient Agent Ecosystem. Covers authentication, authorisation (RBAC), data handling, secrets management, and compliance requirements.

## 2. Authentication

### API Authentication

| Environment | Method | Details |
|------------|--------|---------|
| Development | API Key | `X-API-Key` header |
| Production | OAuth 2.0 | Entra ID bearer tokens |
| MCP | Session-based | MCP session context |
| Dashboard | Cookie-based | HttpOnly, Secure, SameSite=Strict |

### Token Validation

```python
async def validate_token(token: str) -> User:
    """
    1. Verify JWT signature (RS256)
    2. Check token expiry
    3. Validate audience (Phient Agent Platform)
    4. Extract user claims (email, roles, groups)
    5. Check against revocation list
    """
```

## 3. Authorisation (RBAC)

### Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `viewer` | Read-only access | Query knowledge, view own data |
| `user` | Standard employee | All viewer + submit requests |
| `power_user` | Frequent user | All user + higher rate limits |
| `agent_admin` | Agent team member | All power_user + manage agents |
| `system_admin` | System administrator | Full access |

### Permission Matrix

| Action | viewer | user | power_user | agent_admin | system_admin |
|--------|--------|------|------------|-------------|-------------|
| Search knowledge | Yes | Yes | Yes | Yes | Yes |
| Chat with agents | No | Yes | Yes | Yes | Yes |
| Run automations | No | Yes | Yes | Yes | Yes |
| View own HR data | Yes | Yes | Yes | Yes | Yes |
| View team HR data | No | No | Yes | Yes | Yes |
| Manage users (Entra) | No | No | No | Yes | Yes |
| Onboard employees | No | No | No | Yes | Yes |
| View audit logs | No | No | No | Yes | Yes |
| Configure agents | No | No | No | Yes | Yes |
| System admin | No | No | No | No | Yes |

## 4. Data Handling

### Classification

| Level | Description | Examples |
|-------|-------------|---------|
| Public | No restrictions | Company blog, public docs |
| Internal | Phient employees only | Internal policies, processes |
| Confidential | Role-restricted | HR data, financial data |
| Restricted | Named individuals only | Salary data, legal docs |

### PII Handling

- All PII identified and tagged at ingestion
- PII redacted in logs and audit trails
- PII never stored in vector embeddings (content only, not identifiers)
- GDPR/POPIA compliant data subject access requests supported

## 5. Secrets Management

### Storage

- **Development**: `.env` file (git-ignored)
- **Production**: Azure Key Vault / environment variables
- **Never**: Hard-coded, committed to git, logged

### Required Secrets

```
ANTHROPIC_API_KEY          # Claude API access
ENTRA_TENANT_ID            # Microsoft Entra tenant
ENTRA_CLIENT_ID            # Entra app registration
ENTRA_CLIENT_SECRET        # Entra app secret
NOTION_API_KEY             # Notion integration token
HIBOB_API_KEY              # HRIS API token
HIBOB_SERVICE_USER         # Enterprise HRIS service account
API_SECRET_KEY             # JWT signing key
ENCRYPTION_KEY             # Data encryption key
```

### Rotation Policy

| Secret | Rotation Period | Method |
|--------|----------------|--------|
| API keys | 90 days | Manual rotation |
| Client secrets | 180 days | Azure auto-rotation |
| JWT signing key | 30 days | Automated |
| Encryption key | 365 days | Key versioning |

## 6. Network Security

- All external API calls over HTTPS (TLS 1.2+)
- MCP server: localhost only (stdio transport)
- Dashboard: CORS restricted to allowed origins
- Rate limiting at API gateway level

## 7. Approval Workflows

### Destructive Operations

Operations that modify external systems require human approval:

```python
OPERATIONS_REQUIRING_APPROVAL = [
    "create_user",           # Entra ID
    "disable_user",          # Entra ID
    "delete_user",           # Entra ID
    "assign_license",        # Entra ID (cost impact)
    "remove_from_group",     # Entra ID (access impact)
    "onboard_employee",      # Multi-system changes
]
```

### Approval Flow

```
Agent determines action needed
    │
    ▼
Check if action requires approval
    │
    ├── No  → Execute immediately
    │
    └── Yes → Create approval request
                 │
                 ▼
              Notify approver (Slack/Email)
                 │
                 ▼
              Wait for approval (timeout: 24h)
                 │
                 ├── Approved → Execute + audit log
                 ├── Denied   → Cancel + notify requester
                 └── Timeout  → Cancel + notify both
```

## 8. Compliance

- **GDPR**: Data subject rights, consent management, data portability
- **POPIA** (South Africa): Lawful processing, purpose limitation
- **SOC 2**: Audit trails, access controls, encryption at rest
- **ISO 27001**: Information security management alignment
