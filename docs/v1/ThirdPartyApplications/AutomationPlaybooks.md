# Third-Party Applications & Automation Playbooks (`ThirdPartyApplications/AutomationPlaybooks.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/third_party_applications` (`ThirdPartyApplication.md`, `Website.md`).
- **Phient Subsystem**: [`src/phiadk/phibot/`](./phient/src/phiadk/phibot/).

---

## 1. Automation DAG Playbooks & Webhooks

External systems interact with Phient via scheduled DAG playbooks and incoming/outgoing webhooks.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Trigger["External Webhook Trigger"] --> Playbook["PhiBot Playbook DAG"]
    Playbook --> Step1["Step 1: Validate Schema"]
    Step1 --> Step2["Step 2: Trigger Morphism"]
    Step2 --> Step3["Step 3: Notify Slack / PagerDuty"]
```
