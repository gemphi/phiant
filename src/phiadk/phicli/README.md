# Developer Toolchain CLI (`src/phiadk/phicli/`)

> _Developer CLI for Agent Scaffolding, Ontology Inspection & Parity Audits._

---

## 1. Toolchain Commands

The `phicli` toolchain provides commands for managing, scaffolding, and auditing the agentic platform:

| Command | Purpose | Example |
|:---|:---|:---|
| `phicli new <agent_id>` | Scaffold a new 6-letter canonical domain agent. | `phicli new phiact` |
| `phicli audit` | Run 100% Palantir parity audit and module check. | `phicli audit` |
| `phicli ontology inspect` | Print Mermaid diagrams and Object Type schemas. | `phicli ontology inspect` |
| `phicli serve` | Start the AIP FastAPI server and Blueprint Console. | `phicli serve --port 8000` |

---

## 2. Agent Scaffolding Workflow

```bash
# Scaffold a new canonical 6-letter agent
python -m phiadk.phicli.cli new phiact --domain "action_engine" --layer "ENGINE"
```

This generates:
- `agent.py` (Universal 4-phase lifecycle)
- `card.py` (Agent metadata card)
- `models.py` (Topological types)
- `verbs.py` (Action verbs enum)
- `ontology/ontology.mdx` (Interactive documentation card)
