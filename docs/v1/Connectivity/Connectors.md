# Connectivity & External Integrations (`Connectivity/Connectors.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/connectivity` (`Connection.md`, `FileImport.md`, `TableImport.md`, `VirtualTable.md`).
- **Phient Subsystem**: [`src/phiadk/phiora/`](./phient/src/phiadk/phiora/) & [`src/phiadk/phione/identity.py`](./phient/src/phiadk/phione/identity.py).

---

## 1. External System Connectors

Phient integrates with third-party enterprise providers via dedicated connectors:
- **Microsoft Entra ID / SSO**: User authentication and group synchronizations.
- **Enterprise HRIS / BambooHR**: Workforce metadata and organizational hierarchy.
- **Notion / Confluence**: Workspace documentation synchronization.

```mermaid
graph LR
    Entra["Microsoft Entra SSO"] --> PhiOne["PhiOne (Identity)"]
    Enterprise HRIS["Enterprise HRIS HR"] --> PhiOne
    Notion["Notion Docs"] --> PhiDoc["PhiDoc (Doc Sync)"]
    All["Connectors"] --> Storage["PhiOra Content-Addressed Store"]
```
