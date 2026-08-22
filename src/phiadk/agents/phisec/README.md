# PhiSec: Security & Vulnerability Domain Agent

`PhiSec` is the security governance agent. It performs vulnerability scans, validates cryptographic tokens, enforces attribute-based access control (ABAC), and quarantines untrusted assets.

---

## 1. Architectural & Security Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Request["API Request / Morphism Mutation"] --> TokenCheck["1. Token Verification (PhiSec)"]
    TokenCheck --> PolicyCheck["2. Policy Enforcement (RBAC/ABAC)"]
    PolicyCheck --> ScanCheck["3. Static Scan / Vulnerability Check"]

    ScanCheck -->|Pass| Allow["PERMIT: Execute Morphism"]
    ScanCheck -->|Fail| Quarantine["DENY: Quarantine Threat"]
```

### Flow Diagram
```
[ Incoming Request ]
          │
          ▼
[ PhiSecAgent.envision() ] ──► (Verify token signature & resource scope)
          │
          ▼
[ PhiSecAgent.apply() ]
          ├─► (SCAN_VULNERABILITY) ──► Perform static CVE scan on component
          ├─► (VERIFY_TOKEN)       ──► Inspect claims & expiration
          ├─► (ENFORCE_POLICY)     ──► Check resource permission matrix
          └─► (QUARANTINE_THREAT)  ──► Isolate vulnerable asset
          │
          ▼
[ PhiSecAgent.eval() ] ──► (Verify risk score <= allowable threshold)
          │
          ▼
[ PhiSecAgent.iterate() ] ──► (Emit security audit record to PhiLog)
```

---

## 2. Python SDK Usage

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Verify token & enforce access
token_receipt = client.phisec.verify_token("eyJhbGci...")
if token_receipt.token_valid:
    decision = client.phisec.enforce_policy(
        resource="Employee",
        action="update_salary",
        subject=token_receipt.subject
    )
    print(f"Policy Decision: {decision['decision']}")
```
