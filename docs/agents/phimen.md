---
outline: deep
---

# PhiMen

> Virtual CEO - cross-domain strategic orchestration, recursive evaluation, and enterprise decision routing.

| | |
|---|---|
| **ID** | `phimen` |
| **Class** | `PhiMenAgent` / `PhiMenClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Executive |
| **Domain** | `executive` |
| **File** | `phiadk/phimen/` |
| **Schema** | `phiadk/phimen/schema.json` |

## What PhiMen Does

PhiMen is the **Virtual CEO** sitting at the top of the agent hierarchy. It operates on high-level strategic objectives by running the recursive `envision → apply → eval → iterate/scale` lifecycle, creating manifold views over all domain topologies, bundling cross-domain delegations into strategic fibers, scoring outcome confidence, and deciding whether to scale, conclude, or recurse.

## Tasks & Verbs

### `strategic_assessment` - Enterprise Situation Assessment
| Verb | Description | Parameters |
|------|-------------|------------|
| `assess_objective` | Run full envision→apply→eval→iterate cycle on strategic objective | `objective: str, domains: list` |

### `domain_delegation` - Strategic Task Delegation
| Verb | Description | Parameters |
|------|-------------|------------|
| `delegate_task` | Delegate task to a specific domain agent space with state tracking | `objective: str, domain: str` |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `EXECUTIVE_STRATEGY_ORCHESTRATION_V1` | Cross-domain situation assessment, strategic delegation via fiber bundles, and recursive evaluation | `strategic_assessment`, `domain_delegation` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phione` | Identity and workforce intelligence |
| `phical` | Quantum computing and semantic simulation |
| `phirag` | Enterprise knowledge retrieval |
| `phidoc` | Workspace documentation |
| `phibot` | Automation operations |
| `phibrd` | Employee lifecycle |
| `phiora` | Data layer and storage |
