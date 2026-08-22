# Enterprise Connectors (`src/phiadk/_core/connectors/`)

> _Integration drivers for Microsoft Entra ID, Notion, and Enterprise System APIs._

---

## 1. Connector Modules

| Connector | Module | Target System | Supported Operations |
|:---|:---|:---|:---|
| **Entra ID** | [`entra.py`](./entra.py) | Microsoft Graph API / Azure AD | User lookup, identity provisioning, license management, group memberships. |
| **Notion** | [`notion_connector.py`](./notion_connector.py) | Notion API | Workspace search, page retrieval, documentation database synchronization. |

---

## 2. Architecture & Error Handling

All connectors implement:
- **Automatic Token Refresh**: Seamless credential rotation using MSAL and OAuth2 bearer tokens.
- **Circuit Breakers & Exponential Backoff**: Prevents cascading failures when upstream enterprise APIs experience throttling (HTTP 429) or transient downtime.
- **Mock Fallback Resolvers**: Automatic fallback to local dataset fixtures during offline development and testing.
