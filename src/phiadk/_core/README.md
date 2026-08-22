# Core Foundation Primitives (`src/phiadk/_core/`)

> _Universal Foundation: Auth, Config, ModelBase, Topology Primitives & Enterprise Connectors._

---

## 1. Core Modules Overview

The `_core` package provides the low-level foundation inherited by all domain agents and ontology models:

| Module | Core Responsibility |
|:---|:---|
| [`auth.py`](./auth.py) | Token & API Key authentication managers (`TokenAuth`, `ApiKeyAuth`). |
| [`config.py`](./config.py) | Global configuration settings (`Config`, `PConfig`). |
| [`client_base.py`](./client_base.py) | Synchronous and asynchronous HTTP base clients (`ApiClient`, `AsyncApiClient`). |
| [`model_base.py`](./model_base.py) | Universal base dataclass (`ModelBase`) with `to_dict()`, timestamps, and Git SHA-1 provenance. |
| [`agent_base.py`](./agent_base.py) | `PhiAgent` base class, `AgentContext`, `DataSet`, and `Phase` enum. |
| [`agent_card.py`](./agent_card.py) | `AgentCard`, `AgentLayer` (`FOUNDATION`, `INFRASTRUCTURE`, `ENGINE`, `APPLICATION`). |
| [`topology.py`](./topology.py) | Category-theoretic simplicial primitives: `Node`, `Space`, `Edge`, `Morphism`, `SimplexType`. |
| [`connectors/`](./connectors/) | Enterprise system connectors: Microsoft Entra ID (`entra.py`) & Notion API (`notion_connector.py`). |
