---
outline: deep
---

# PhiBot

> Automation engine, playbook orchestration, and repeatable workflow execution.

| | |
|---|---|
| **ID** | `phibot` |
| **Class** | `PhiBotAgent` / `PhiBotClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Application |
| **Domain** | `automation` |
| **File** | `phiegg/phibot/` |
| **Schema** | `phiegg/phibot/schema.json` |

## What PhiBot Does

PhiBot coordinates **automation playbooks and workflows**. It maintains an indexed space of executable playbooks, filters by category (e.g. `it_ops`, `hr`, `security`), and executes automated multi-step actions.

## Tasks & Verbs

### `playbook_management` - Playbook Discovery
| Verb | Description | Parameters |
|------|-------------|------------|
| `list_playbooks` | Traverse and filter playbooks by category | `category: str` |

### `workflow_execution` - Execution Engine
| Verb | Description | Parameters |
|------|-------------|------------|
| `execute_playbook` | Trigger deterministic playbook execution morphism | `playbook_id: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `AUTOMATION_PLAYBOOK_EXEC_V1` | Playbook discovery, category filtering, and automated execution | `playbook_management`, `workflow_execution` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves playbook definition datasets |
