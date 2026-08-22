---
outline: deep
---

# PhiBrd

> Cross-domain onboarding orchestrator — executes onboarding workflows as unified fiber bundles.

| | |
|---|---|
| **ID** | `phibrd` |
| **Class** | `PhiBrdAgent` / `PhiBrdClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Application |
| **Domain** | `onboarding` |
| **File** | `phiadk/phibrd/` |
| **Schema** | `phiadk/phibrd/schema.json` |

## What PhiBrd Does

PhiBrd is the **enterprise onboarding orchestrator**. It unifies cross-domain mutations across HR (`phione`), Identity (`phione`), Documentation (`phidoc`), and IT Automation (`phibot`) into an ordered, atomic **Fiber Bundle**.

## Tasks & Verbs

### `onboarding_orchestration` - Multi-Agent Workflow
| Verb | Description | Parameters |
|------|-------------|------------|
| `onboard_employee` | Run complete multi-agent onboarding fiber bundle | `employee_data: dict` |
| `get_checklist` | Retrieve declarative onboarding checklist steps | - |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `EMPLOYEE_ONBOARDING_LIFECYCLE_V1` | Cross-domain onboarding fiber bundle with multi-agent orchestration | `onboarding_orchestration` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phione` | Creates HR and Entra ID accounts |
| `phidoc` | Generates employee welcome docs |
| `phibot` | Triggers IT equipment and welcome automation |
| `phiora` | Resolves employee profile datasets |
