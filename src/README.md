# Phient Source Tree (`src/`)

> _Root Source Directory for the Phient Platform and PhiADK SDK._

---

## 1. Directory Structure

```
src/
├── phiadk/               # The unified master enterprise SDK package
│   ├── _core/            # Auth, Config, ModelBase, Topology, Connectors
│   ├── _errors/          # Exception and error taxonomy
│   ├── agents/           # 15 Canonical 6-Letter Domain Agents
│   ├── ontologies/       # Palantir Symmetrical Ontologies Engine
│   ├── orchestrator/     # 20-Namespace Intent Orchestrator & Priority Router
│   ├── mcp/              # Model Context Protocol (MCP) Server
│   ├── phiapi/           # AIP FastAPI Server & Blueprint Console UI
│   ├── phicli/           # Developer Toolchain CLI
│   ├── query/            # RQL, OQL, QML, VQL Multi-Dialect Query Engine
│   ├── client.py         # Master SDK Client (PhiADKClient / PClient)
│   └── __init__.py       # Top-level SDK Exports
├── cli.py                # Standalone Entrypoint CLI
├── cli_demo.py           # Terminal Interactive Playground
├── config.py             # Global Pydantic Environment Settings
├── utils.py              # Shared Utility Helpers
└── __init__.py           # Package Init
```

---

## 2. Key Entrypoints

- **Master SDK Client**: `from phiadk import PhiADKClient, PClient`
- **Ontology Engine**: `from phiadk.ontologies import GLOBAL_ONTOLOGY, ActionClient, ScenarioClient`
- **Event Bus**: `from phiadk.agents.phibus import GLOBAL_PBUS, PBusEvent`
- **Spatial Store**: `from phiadk.agents.phiora import PhiOraDB, SpatialStore`
- **CLI Runner**: `python -m src.cli serve` or `python -m src.cli --demo`
