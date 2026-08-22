# Enterprise Connectors Specification

## 1. Overview

Enterprise connectors are the interface between Phient's AI agents and external enterprise systems. Each connector provides a typed, authenticated, rate-limited API wrapper with error handling and caching.

### Connector Architecture

```python
class BaseConnector(ABC):
    name: str
    base_url: str
    rate_limit: RateLimit          # Requests per minute
    circuit_breaker: CircuitBreaker # Failure threshold
    cache_ttl: int                 # Cache TTL in seconds

    @abstractmethod
    async def authenticate(self) -> None:
        """Obtain/refresh auth credentials."""

    @abstractmethod
    async def health_check(self) -> bool:
        """Check if the service is reachable."""

    async def request(self, method, path, **kwargs) -> dict:
        """Make authenticated request with retry, rate limit, and circuit breaker."""
```

---

## 2. Microsoft Entra ID Connector

### Authentication

- **Method**: OAuth 2.0 Client Credentials Flow
- **Scope**: `https://graph.microsoft.com/.default`
- **Token refresh**: Automatic, 5 minutes before expiry

### API Endpoints Used

| Operation | MS Graph Endpoint | Method |
|-----------|-------------------|--------|
| Get user | `/users/{id}` | GET |
| List users | `/users?$filter=...` | GET |
| Create user | `/users` | POST |
| Update user | `/users/{id}` | PATCH |
| Disable user | `/users/{id}` (set accountEnabled=false) | PATCH |
| List groups | `/groups` | GET |
| Get group members | `/groups/{id}/members` | GET |
| Add to group | `/groups/{id}/members/$ref` | POST |
| Remove from group | `/groups/{id}/members/{userId}/$ref` | DELETE |
| Assign license | `/users/{id}/assignLicense` | POST |
| List licenses | `/subscribedSkus` | GET |

### Data Models

```python
@dataclass
class EntraUser:
    id: str
    display_name: str
    email: str
    user_principal_name: str
    job_title: str
    department: str
    office_location: str
    account_enabled: bool
    created_datetime: datetime

@dataclass
class EntraGroup:
    id: str
    display_name: str
    description: str
    group_types: list[str]
    member_count: int

@dataclass
class EntraLicense:
    sku_id: str
    sku_part_number: str       # e.g., "ENTERPRISEPACK" (E3)
    available_units: int
    consumed_units: int
```

### Rate Limits

- **Throttle**: 10,000 requests per 10 minutes (MS Graph default)
- **Batch**: Use `$batch` endpoint for bulk operations (max 20 per batch)
- **Delta queries**: Use `$delta` for incremental sync

### Error Handling

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 401 | Token expired | Refresh token, retry |
| 403 | Insufficient permissions | Log, return error |
| 404 | User/group not found | Return helpful message |
| 429 | Throttled | Respect Retry-After header |
| 503 | Service unavailable | Circuit breaker |

---

## 3. Notion Connector

### Authentication

- **Method**: Integration token (Internal Integration)
- **Header**: `Authorization: Bearer {NOTION_API_KEY}`
- **Version**: `Notion-Version: 2022-06-28`

### API Endpoints Used

| Operation | Endpoint | Method |
|-----------|----------|--------|
| Search | `/search` | POST |
| Get page | `/pages/{id}` | GET |
| Create page | `/pages` | POST |
| Update page | `/pages/{id}` | PATCH |
| Get page content | `/blocks/{id}/children` | GET |
| Query database | `/databases/{id}/query` | POST |
| Get database | `/databases/{id}` | GET |

### Data Models

```python
@dataclass
class NotionPage:
    id: str
    title: str
    url: str
    parent_id: str
    parent_type: str           # "database" | "page" | "workspace"
    created_time: datetime
    last_edited_time: datetime
    created_by: str
    properties: dict
    content_blocks: list[dict]

@dataclass
class NotionDatabase:
    id: str
    title: str
    description: str
    properties: dict           # Column definitions
    url: str
```

### Content Extraction

```python
def extract_text_from_blocks(blocks: list[dict]) -> str:
    """
    Recursively extract plain text from Notion block tree.
    Handles: paragraph, heading_1/2/3, bulleted_list_item,
    numbered_list_item, code, quote, callout, toggle, table
    """
```

### Sync Strategy for RAG

1. **Initial sync**: Fetch all pages from configured databases
2. **Incremental sync**: Use `last_edited_time` filter (every 15 min)
3. **Change detection**: Compare checksums to avoid re-embedding unchanged content
4. **Deletion handling**: Mark chunks as deleted, remove from vector store

---

## 4. Enterprise HRIS Connector

### Authentication

- **Method**: Service User + API Token
- **Headers**:
  - `Authorization: Basic base64(service_user:api_token)`
  - `Content-Type: application/json`

### API Endpoints Used

| Operation | Endpoint | Method |
|-----------|----------|--------|
| Get employee | `/people/{id}` | GET |
| Search employees | `/people/search` | POST |
| List employees | `/people` | GET |
| Get org chart | `/people/{id}/work` | GET |
| Get leave balance | `/timeoff/employees/{id}/balance` | GET |
| Get leave requests | `/timeoff/employees/{id}/requests` | GET |
| Get company structure | `/company/named-lists` | GET |

### Data Models

```python
@dataclass
class Enterprise HRISEmployee:
    id: str
    display_name: str
    first_name: str
    last_name: str
    email: str
    work_email: str
    department: str
    division: str
    site: str                  # Country/office
    title: str
    manager_id: str
    manager_name: str
    start_date: date
    status: str                # "active", "inactive"
    employment_type: str       # "full-time", "contractor"

@dataclass
class LeaveBalance:
    employee_id: str
    policy_type: str           # "annual", "sick", "parental"
    balance: float
    used: float
    pending: float
    available: float

@dataclass
class OrgNode:
    employee_id: str
    name: str
    title: str
    department: str
    direct_reports: list['OrgNode']
```

### Data Privacy

- **PII handling**: Salary, DOB, personal phone masked by default
- **Access control**: Connector enforces RBAC before returning data
- **Audit**: All data access logged with requester identity
- **Retention**: Cached data expires after 15 minutes

---

## 5. Connector Health Dashboard

All connectors report health to the monitoring system:

```python
@dataclass
class ConnectorHealth:
    name: str
    status: Literal["healthy", "degraded", "down"]
    last_check: datetime
    latency_ms: int
    error_rate: float          # Last 5 minutes
    circuit_breaker_state: str # "closed", "open", "half-open"
    rate_limit_remaining: int
```
