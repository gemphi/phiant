# Phient SDK Documentation (v1 - Core Foundation)

Welcome to the **Phient SDK v1 Documentation**. Version 1 represents our foundational, default API standard providing stable workforce operations, data management, intent routing, and multi-provider language models.

---

## 1. Core Modules

| Module | Description | Phient Implementation |
| :--- | :--- | :--- |
| [`Admin/`](./phient/docs/v1/Admin/Workforce.md) | Workforce administration, identity lookup, and leave tracking. | `phiegg.phione` |
| [`AipAgents/`](./phient/docs/v1/AipAgents/AgentLifecycle.md) | 4-phase universal agent execution lifecycle (`envision` $\to$ `apply` $\to$ `eval` $\to$ `iterate`). | `phiegg._core.agent_base` |
| [`Audit/`](./phient/docs/v1/Audit/StructuredLogging.md) | Structured logging, log levels, and error telemetry. | `phiegg.philog` |
| [`Checkpoints/`](./phient/docs/v1/Checkpoints/KVCheckpoints.md) | Key-value state snapshots and historical versions. | `phiegg.phiora` |
| [`Connectivity/`](./phient/docs/v1/Connectivity/DataResolvers.md) | External system connectors (HiBob, Entra ID, Notion). | `phiegg.phiora.store` |
| [`Core/`](./phient/docs/v1/Core/Auth.md) | Authentication (`ApiKeyAuth`, `TokenAuth`), configuration, and client sessions. | `phiegg._core` |
| [`DataHealth/`](./phient/docs/v1/DataHealth/HealthProbes.md) | Agent endpoint health probes and latency telemetry. | `phiegg.phiapi` |
| [`Datasets/`](./phient/docs/v1/Datasets/DataSet.md) | Mathematical DataSet separation and path resolution. | `phiegg.phiora` |
| [`Filesystem/`](./phient/docs/v1/Filesystem/BlobStorage.md) | Content-addressed blob store and metadata tracking. | `phiegg.phigit` |
| [`Functions/`](./phient/docs/v1/Functions/Morphisms.md) | Morphism mappings and validated state transitions. | `phiegg._core.topology` |
| [`Geo/`](./phient/docs/v1/Geo/VectorSearch.md) | Semantic vector embeddings and cosine nearest neighbor searches. | `phiegg.phical.semantic_search` |
| [`LanguageModels/`](./phient/docs/v1/LanguageModels/PhiLLMProvider.md) | Multi-provider LLM gateway (OpenAI, Anthropic, Gemini). | `phiegg.phillm` |
| [`MediaSets/`](./phient/docs/v1/MediaSets/MediaAssets.md) | Binary media and documentation page attachments. | `phiegg.phidoc` |
| [`Ontologies/`](./phient/docs/v1/Ontologies/ObjectType.md) | 0-simplex Object Types, 1-simplex Link Types, and Action Types. | `phiegg.ontologies` |


| [`Orchestration/`](./phient/docs/v1/Orchestration/IntentRouter.md) | LangGraph priority scoring and domain agent router. | `src.orchestrator` |
| [`SqlQueries/`](./phient/docs/v1/SqlQueries/ORM.md) | ORM Repository, Relational Query Language (RQL), Vector Query Language (VQL). | `phiegg.query` |
| [`Streams/`](./phient/docs/v1/Streams/RingBuffer.md) | In-memory 1000-event telemetry ring buffer. | `phiegg.philog` |
| [`ThirdPartyApplications/`](./phient/docs/v1/ThirdPartyApplications/Playbooks.md) | Repeatable automation playbooks. | `phiegg.phibot` |
| [`Widgets/`](./phient/docs/v1/Widgets/PayPalDeveloperDocs.md) | PayPal-style 3-column interactive API documentation explorer. | `phiegg.phiapi` |
