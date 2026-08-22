# MLOps Specification — Azure

## 1. Overview

MLOps infrastructure for the Phient Agentic Ecosystem running on Azure. Covers model lifecycle management, experiment tracking, deployment pipelines, and operational monitoring — all integrated with Azure Machine Learning, Azure AI Services, and the existing Entra ID auth layer.

> **Note**: The AI Ops team doesn't build models (Data Science does). MLOps here focuses on **deploying, serving, versioning, and monitoring** the models and agents that Data Science produces, plus managing the RAG/embedding infrastructure.

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Azure Subscription                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Azure ML     │  │ Azure AI     │  │ Azure        │       │
│  │ Workspace    │  │ Services     │  │ OpenAI       │       │
│  │              │  │              │  │ Service      │       │
│  │ • Experiments│  │ • Embeddings │  │ • GPT-4o     │       │
│  │ • Models     │  │ • Document   │  │ • Embeddings │       │
│  │ • Endpoints  │  │   Intel.     │  │              │       │
│  │ • Pipelines  │  │ • Search     │  │              │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                  │               │
│  ┌──────┴─────────────────┴──────────────────┴───────┐      │
│  │              Azure Container Apps                  │      │
│  │   ┌─────────┐  ┌──────────┐  ┌──────────────┐    │      │
│  │   │ Agent   │  │ RAG      │  │ MCP          │    │      │
│  │   │ API     │  │ Pipeline │  │ Server       │    │      │
│  │   └─────────┘  └──────────┘  └──────────────┘    │      │
│  └───────────────────────────────────────────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Azure        │  │ Azure        │  │ Azure        │       │
│  │ Key Vault    │  │ Monitor      │  │ Blob Storage │       │
│  │ (Secrets)    │  │ (Logs/Alerts)│  │ (Artifacts)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ Azure AI     │  │ Entra ID     │                          │
│  │ Search       │  │ (Auth/RBAC)  │                          │
│  │ (Vector DB)  │  │              │                          │
│  └──────────────┘  └──────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## 3. Azure ML Workspace

### Resource Configuration

```yaml
# infra/azure-ml-workspace.yaml
workspace:
  name: phient-ai-ops
  resource_group: rg-phient-ai
  location: southafricanorth        # Primary: South Africa North
  sku: Basic
  storage_account: stphientaiops
  key_vault: kv-phient-ai
  application_insights: ai-phient-ai
  container_registry: crphientai
```

### Compute Resources

| Compute | Type | SKU | Purpose |
|---------|------|-----|---------|
| `cpu-cluster` | AmlCompute | Standard_DS3_v2 | RAG pipeline, batch jobs |
| `gpu-cluster` | AmlCompute | Standard_NC6s_v3 | Embedding generation, fine-tuning |
| `inference-cluster` | Managed Endpoint | Standard_DS3_v2 | Model serving |
| `dev-instance` | Compute Instance | Standard_DS3_v2 | Development/testing |

## 4. Model Registry

### Model Versioning

```python
from azure.ai.ml import MLClient
from azure.ai.ml.entities import Model

# Register a model version
model = Model(
    name="phient-knowledge-embedder",
    version="1.2.0",
    path="models/knowledge-embedder/",
    type="custom_model",
    description="Fine-tuned embedding model for Phient knowledge base",
    tags={
        "framework": "sentence-transformers",
        "base_model": "all-MiniLM-L6-v2",
        "dataset": "phient-internal-docs-v3",
        "metrics.recall": "0.92",
        "metrics.ndcg": "0.88",
    },
    properties={
        "training_date": "2026-07-20",
        "trained_by": "data-science-team",
        "approved_by": "ai-ops-lead",
    }
)
ml_client.models.create_or_update(model)
```

### Registered Models

| Model | Type | Provider | Purpose |
|-------|------|----------|---------|
| `claude-sonnet-4` | External API | Anthropic | Agent reasoning |
| `text-embedding-3-small` | External API | OpenAI/Azure | Document embeddings |
| `phient-intent-classifier` | Custom | Azure ML | Intent routing |
| `phient-reranker` | Custom | Azure ML | RAG re-ranking |
| `phient-pii-detector` | Custom | Azure ML | PII detection in logs |

### Model Promotion Pipeline

```
Development → Staging → Production

Stage Gates:
  Dev → Staging:
    - Unit tests pass
    - Evaluation metrics meet thresholds
    - No regression on benchmark dataset
    
  Staging → Production:
    - Integration tests pass
    - Load test (100 RPS sustained)
    - A/B test shows improvement or parity
    - Manual approval by AI Ops Lead
```

## 5. Experiment Tracking

### MLflow Integration (via Azure ML)

```python
import mlflow

mlflow.set_tracking_uri(workspace.mlflow_tracking_uri)
mlflow.set_experiment("rag-pipeline-optimization")

with mlflow.start_run(run_name="chunking-strategy-v3"):
    # Log parameters
    mlflow.log_params({
        "chunk_size": 512,
        "chunk_overlap": 50,
        "embedding_model": "text-embedding-3-small",
        "retrieval_top_k": 10,
        "reranker": "cross-encoder/ms-marco-MiniLM-L-6-v2",
    })
    
    # Run evaluation
    results = evaluate_rag_pipeline(config)
    
    # Log metrics
    mlflow.log_metrics({
        "retrieval_recall": results.recall,
        "retrieval_precision": results.precision,
        "retrieval_ndcg": results.ndcg,
        "answer_faithfulness": results.faithfulness,
        "answer_relevance": results.relevance,
        "latency_p50_ms": results.p50_latency,
        "latency_p95_ms": results.p95_latency,
    })
    
    # Log artifacts
    mlflow.log_artifact("evaluation_report.html")
    mlflow.log_artifact("confusion_matrix.png")
```

### Key Experiments

| Experiment | Objective | Tracked Metrics |
|-----------|-----------|----------------|
| `rag-pipeline-optimization` | Improve retrieval quality | recall, precision, NDCG, latency |
| `intent-classifier-training` | Improve intent routing accuracy | accuracy, F1, confusion matrix |
| `embedding-model-evaluation` | Compare embedding models | recall@k, cost, latency |
| `agent-prompt-tuning` | Optimise agent system prompts | task success rate, user satisfaction |
| `reranker-comparison` | Compare re-ranking strategies | NDCG improvement, latency overhead |

## 6. Azure AI Search (Vector Store — Production)

### Index Configuration

```json
{
  "name": "phient-knowledge-index",
  "fields": [
    { "name": "chunk_id", "type": "Edm.String", "key": true },
    { "name": "doc_id", "type": "Edm.String", "filterable": true },
    { "name": "content", "type": "Edm.String", "searchable": true },
    { "name": "title", "type": "Edm.String", "searchable": true, "filterable": true },
    { "name": "section", "type": "Edm.String", "filterable": true },
    { "name": "department", "type": "Edm.String", "filterable": true, "facetable": true },
    { "name": "country", "type": "Edm.String", "filterable": true, "facetable": true },
    { "name": "source", "type": "Edm.String", "filterable": true },
    { "name": "last_modified", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true },
    { "name": "access_level", "type": "Edm.String", "filterable": true },
    {
      "name": "content_vector",
      "type": "Collection(Edm.Single)",
      "dimensions": 1536,
      "vectorSearchProfile": "phient-vector-profile"
    }
  ],
  "vectorSearch": {
    "algorithms": [
      { "name": "hnsw-config", "kind": "hnsw", "hnswParameters": { "m": 4, "efConstruction": 400, "efSearch": 500 } }
    ],
    "profiles": [
      { "name": "phient-vector-profile", "algorithmConfigurationName": "hnsw-config" }
    ]
  },
  "semantic": {
    "configurations": [
      {
        "name": "phient-semantic-config",
        "prioritizedFields": {
          "titleField": { "fieldName": "title" },
          "contentFields": [{ "fieldName": "content" }]
        }
      }
    ]
  }
}
```

### Migration Path

```
Phase 1 (Current):   ChromaDB (local/dev)
Phase 2 (Scale):     Azure AI Search (production)
Phase 3 (Global):    Azure AI Search with geo-replicas
                     (South Africa North + West Europe)
```

## 7. Azure Monitor Integration

### Application Insights

```python
from azure.monitor.opentelemetry import configure_azure_monitor

configure_azure_monitor(
    connection_string="InstrumentationKey=...",
    logger_name="phient-agents",
)

# Custom metrics
from opentelemetry import metrics
meter = metrics.get_meter("phient-agents")

agent_request_counter = meter.create_counter(
    "agent.requests",
    description="Total agent requests",
)

agent_latency_histogram = meter.create_histogram(
    "agent.latency",
    description="Agent request latency in ms",
    unit="ms",
)
```

### Azure Dashboards

| Dashboard | Contents |
|-----------|----------|
| **Agent Operations** | Request volume, latency, error rate, agent health |
| **RAG Performance** | Retrieval quality, embedding pipeline, index health |
| **Cost Tracking** | LLM API costs, compute costs, storage costs |
| **Security & Compliance** | Auth failures, permission denials, audit events |

### Alert Rules

```yaml
alerts:
  - name: "High Agent Error Rate"
    metric: "agent.errors / agent.requests"
    threshold: 0.10
    window: 5m
    severity: 2
    action_group: ai-ops-team

  - name: "LLM API Cost Spike"
    metric: "llm.cost.daily"
    threshold: 100.00   # USD
    window: 1d
    severity: 3
    action_group: ai-ops-lead

  - name: "Vector Index Drift"
    metric: "rag.index.staleness_hours"
    threshold: 24
    window: 1h
    severity: 3
    action_group: ai-ops-team

  - name: "Connector Circuit Open"
    metric: "connector.circuit_breaker.state"
    threshold: 1        # 1 = open
    window: 1m
    severity: 1
    action_group: ai-ops-team
```

## 8. Managed Endpoints

### Deployment Configuration

```yaml
# infra/endpoint-config.yaml
endpoints:
  - name: phient-agent-api
    type: managed_online
    auth_mode: key
    instance_type: Standard_DS3_v2
    instance_count: 2
    auto_scale:
      min_instances: 1
      max_instances: 5
      scale_type: request_count
      target_requests_per_instance: 50
    traffic:
      blue: 90           # Current stable version
      green: 10           # Canary deployment
    health_probe:
      path: /api/v1/health
      interval: 30
      timeout: 10
```

### Blue-Green Deployment

```
1. Deploy new version as "green" (10% traffic)
2. Monitor error rate + latency for 30 minutes
3. If healthy: shift to 50/50
4. Monitor for 1 hour
5. If healthy: shift to 0/100 (green becomes primary)
6. Keep blue as rollback for 24 hours
7. Decommission blue
```

## 9. Data Pipelines

### Azure Data Factory / Synapse

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│ Notion API  │────►│  Azure Data  │────►│ Azure AI     │
│ HRIS API   │     │  Factory     │     │ Search Index │
│ File Upload │     │  Pipeline    │     │              │
└─────────────┘     └──────┬───────┘     └──────────────┘
                           │
                    ┌──────▼───────┐
                    │ Azure Blob   │
                    │ Storage      │
                    │ (Raw + Proc) │
                    └──────────────┘
```

### Pipeline Schedule

| Pipeline | Schedule | Source | Destination |
|----------|----------|--------|------------|
| `notion-sync` | Every 15 min | Notion API | Blob → AI Search |
| `hris-sync` | Daily 02:00 UTC | HRIS API | Blob → SQL |
| `entra-audit-sync` | Every 1 hour | MS Graph | Blob → SQL |
| `metrics-aggregate` | Every 5 min | App Insights | Dashboard cache |
| `cost-report` | Daily 06:00 UTC | Azure Cost Mgmt | Email + Dashboard |

## 10. Infrastructure as Code

### Terraform Modules

```
infra/
├── main.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── azure-ml/           # ML workspace, compute, endpoints
│   ├── azure-ai-search/    # Search service, indexes
│   ├── azure-openai/       # OpenAI service, deployments
│   ├── container-apps/     # Agent API, RAG pipeline, MCP
│   ├── key-vault/          # Secrets management
│   ├── monitoring/         # App Insights, Log Analytics, alerts
│   ├── storage/            # Blob storage, data lake
│   └── networking/         # VNet, private endpoints, NSGs
```

### Resource Groups

| Resource Group | Contents | Region |
|---------------|----------|--------|
| `rg-phient-ai-prod` | Production ML + AI resources | South Africa North |
| `rg-phient-ai-staging` | Staging environment | South Africa North |
| `rg-phient-ai-shared` | Shared infra (Key Vault, Monitor) | South Africa North |
| `rg-phient-ai-dr` | Disaster recovery replicas | West Europe |

## 11. Cost Management

### Budget Estimates (Monthly)

| Resource | SKU | Estimated Cost |
|----------|-----|---------------|
| Azure ML Workspace | Basic | $0 (free tier) |
| Compute (CPU) | 2x DS3_v2 | ~$280 |
| Compute (GPU) | 1x NC6s_v3 (on-demand) | ~$150 |
| Azure AI Search | S1 | ~$250 |
| Azure OpenAI | Pay-as-you-go | ~$200-500 |
| Container Apps | 2 instances | ~$60 |
| Blob Storage | 100 GB | ~$2 |
| Key Vault | Standard | ~$5 |
| App Insights | 5 GB/month | ~$12 |
| **Total** | | **~$960 - $1,260** |

### Cost Controls

- GPU compute: auto-shutdown after 30 min idle
- Dev/staging: scale to zero outside business hours
- LLM caching: reduce duplicate API calls by ~30%
- Reserved instances for production compute (1-year = ~40% savings)
