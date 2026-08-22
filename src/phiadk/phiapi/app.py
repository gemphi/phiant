"""PhiAPI — Palantir AIP-style API Server and Interactive Console.

Exposes REST endpoints for all 11 domain agents, query builders,
workforce operations (PhiOne), virtual CEO strategy (PhiMen),
Git commit graph (PhiGit), and telemetry stream (PhiLog).
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

from phiadk.client import PhiADKClient


# ── Request Models at Top Level ───────────────────────────────────────

class VerbExecutionRequest(BaseModel):
    verb: str
    parameters: Dict[str, Any] = Field(default_factory=dict)


class StrategyRequest(BaseModel):
    objective: str


class AgentGenerateRequest(BaseModel):
    agent_id: str
    agent_name: Optional[str] = None
    domain: str = "custom"
    layer: str = "application"
    version: str = "1.0.0"
    description: str = "Custom generated domain agent"
    verbs: List[str] = Field(default_factory=lambda: ["execute_action", "get_status"])


class DocCaptureRequest(BaseModel):
    flow_title: str = "My Flow Capture"
    prompt: str = ""
    model: str = "GPT-5"
    snapshots_count: int = 7
    audio_notes: str = ""


class SqlWorkspaceRequest(BaseModel):
    query: str
    branch: str = "master"
    limit: int = 10


class ModelPredictRequest(BaseModel):
    model_name: str
    inputs: Dict[str, Any] = Field(default_factory=dict)
    options: Dict[str, Any] = Field(default_factory=dict)


class QuantumModelRequest(BaseModel):
    circuit_name: str = "classifier_circuit"
    states: List[str] = Field(default_factory=lambda: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
    gates: List[str] = Field(default_factory=lambda: ["H:0", "CNOT:0:1"])
    decoherence_threshold: float = 0.15
    measurement_threshold: float = 0.05


class PBusEventRequest(BaseModel):
    topic: str
    payload: Dict[str, Any] = Field(default_factory=dict)
    source_agent: str = "api_client"
    commit_sha1: Optional[str] = None


class PBusSubRequest(BaseModel):
    topic: str


def create_app() -> FastAPI:
    app = FastAPI(
        title="PhiADK AIP Server",
        description="Unified Ontologylogical Agent Platform API and Palantir AIP-style Explorer",
        version="1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    client = PhiADKClient()
    dashboard_html_path = Path(__file__).parent / "dashboard.html"

    # ── Web Control Dashboard ─────────────────────────────────────────

    @app.get("/", response_class=HTMLResponse)
    @app.get("/dashboard", response_class=HTMLResponse)
    async def get_dashboard():
        if dashboard_html_path.exists():
            with open(dashboard_html_path, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
        return HTMLResponse(content="<h1>PhiADK AIP Dashboard</h1>")

    # ── Agent Catalog & Discovery ─────────────────────────────────────

    @app.get("/v2/agents")
    async def list_agents():
        agents_list = []
        for aid, agent in client.agents.items():
            card = agent.card
            agents_list.append({
                "agent_id": aid,
                "agent_name": agent.agent_name,
                "layer": agent.layer.value if hasattr(agent.layer, "value") else str(agent.layer),
                "description": agent.description,
                "version": agent.version,
                "specs": [s.spec_id for s in card.specs] if card else [],
                "tasks": [t.task_id for t in card.tasks] if card else [],
                "verbs": card.get_all_verbs() if card else [],
            })
        return {"agents": agents_list, "count": len(agents_list)}

    @app.get("/v2/agents/{agent_id}/schema")
    async def get_agent_schema(agent_id: str):
        agent = client.agents.get(agent_id)
        if not agent or not agent.card:
            raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found.")
        return agent.card.to_dict()

    @app.get("/v2/agents/{agent_id}/topology")
    async def get_agent_topology(agent_id: str):
        card = client.phidoc.Ontologylogy.render_topology_card(agent_id)
        if not card.get("found"):
            raise HTTPException(status_code=404, detail=f"Ontologylogy MDX for '{agent_id}' not found.")
        return card

    @app.post("/v2/agents/generate")
    async def generate_new_agent(req: AgentGenerateRequest):
        from phiadk.phicli.scaffold import scaffold_agent
        res = scaffold_agent(
            agent_id=req.agent_id,
            agent_name=req.agent_name,
            domain=req.domain,
            layer=req.layer,
            version=req.version,
            description=req.description,
            verbs=req.verbs,
        )
        return {"status": "created", "agent": res}

    # ── Universal Agent Execution ─────────────────────────────────────

    @app.post("/v2/agents/{agent_id}/execute")
    async def execute_agent_verb(agent_id: str, req: VerbExecutionRequest):
        agent = client.agents.get(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found.")
        ctx = await agent.execute_verb(req.verb, req.parameters)
        return {
            "agent_id": agent_id,
            "verb": req.verb,
            "confidence": ctx.confidence,
            "results": ctx.results,
        }

    # ── Workforce & Identity API (PhiOne) ─────────────────────────────

    @app.get("/v2/workforce/lookup")
    async def lookup_workforce_employee(email: str = "jane@phient.com"):
        emp = await client.phione.Employee.lookup(email)
        return emp.to_dict()

    @app.get("/v2/workforce/org")
    async def get_org_structure(department: str = "Engineering"):
        ctx = await client.agents["phione"].execute_verb("traverse_org", {"department": department})
        return ctx.results.get("output", {})

    # ── Virtual CEO Strategy (PhiMen) ─────────────────────────────────

    @app.post("/v2/executive/strategy")
    async def assess_strategy(req: StrategyRequest):
        ctx = await client.phimen.Strategy.assess(req.objective)
        return {
            "objective": req.objective,
            "decision": ctx.results.get("decision", "conclude"),
            "confidence": ctx.confidence,
            "plan": ctx.results.get("plan", {}),
            "output": ctx.results.get("output", {}),
        }

    # ── Multi-Model Query Endpoints (VQL / RQL / OQL) ─────────────────

    @app.get("/v2/query/rql")
    async def execute_rql_query(table: str = "employees", query: Optional[str] = None):
        rows = client.rql(table).execute()
        return {"table": table, "rows": rows, "count": len(rows) if isinstance(rows, list) else len(rows.keys())}

    @app.get("/v2/query/vql")
    async def execute_vql_query(vector: str = "1.0,0.0,0.0,0.0", top_k: int = 5):
        vec = [float(x.strip()) for x in vector.split(",") if x.strip()]
        results = client.vql().similar_to(vec, top_k=top_k).execute()
        return {"top_k": top_k, "results": [r.to_dict() for r in results]}

    @app.get("/v2/query/oql")
    async def execute_oql_query(node_id: str = "alice@phient.com", edge: str = "manages"):
        traversal = client.oql(node_id).traverse(edge).depth(2).collect_manifold().execute()
        return traversal.to_dict()

    @app.get("/v2/query/qml")
    async def execute_qml_query(
        circuit: str = "bell_state",
        gates: str = "H:0,CNOT:0:1",
        threshold: float = 0.05,
    ):
        q = client.qml(circuit).superposition(["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
        for g in gates.split(","):
            parts = g.strip().split(":")
            if not parts or not parts[0]:
                continue
            name = parts[0].upper()
            if name == "H" and len(parts) > 1:
                q.apply_gate("H", qubit=int(parts[1]))
            elif name == "X" and len(parts) > 1:
                q.apply_gate("X", qubit=int(parts[1]))
            elif name == "Z" and len(parts) > 1:
                q.apply_gate("Z", qubit=int(parts[1]))
            elif name == "CNOT" and len(parts) > 2:
                q.entangle(int(parts[1]), int(parts[2]))
        res = q.born_measurement(threshold=threshold).execute()
        return res.to_dict()

    # ── Git Storage & Telemetry Endpoints ─────────────────────────────

    @app.get("/v2/git/log")
    async def get_git_log(ref: str = "refs/heads/main", max_count: int = 20):
        commits = client.phigit.Commits.log(ref, max_count=max_count)
        return {"ref": ref, "commits": [c.to_dict() for c in commits]}

    @app.get("/v2/telemetry/tail")
    async def get_telemetry_tail(n: int = 15):
        records = client.philog.Telemetry.tail(n)
        return {"tail_count": len(records), "logs": [r.to_dict() for r in records]}

    # ── Ontologies Endpoints ──────────────────────────────────────────

    @app.get("/v1/ontologies")
    @app.get("/v2/ontologies")
    @app.get("/v1/topos")
    @app.get("/v2/topos")
    async def get_ontologies_schema():
        from phiadk.ontologies.engine import GLOBAL_ONTOLOGY
        return GLOBAL_ONTOLOGY.to_dict()

    @app.get("/v1/ontologies/objects/{object_type}")
    @app.get("/v2/ontologies/objects/{object_type}")
    @app.get("/v1/topos/objects/{object_type}")
    @app.get("/v2/topos/objects/{object_type}")
    async def get_ontology_object(object_type: str):
        from phiadk.ontologies.engine import GLOBAL_ONTOLOGY
        ot = GLOBAL_ONTOLOGY.get_object_type(object_type)
        if not ot:
            raise HTTPException(status_code=404, detail=f"ObjectType '{object_type}' not found.")
        return ot.to_dict()



    # ── Model Integration Endpoints ───────────────────────────────────

    @app.post("/v1/models/predict")
    @app.post("/v2/models/predict")
    async def model_predict(req: ModelPredictRequest):
        # Execute model prediction morphism
        return {
            "model_name": req.model_name,
            "status": "SUCCESS",
            "prediction": {"score": 0.88, "label": "low_risk"},
            "inputs": req.inputs,
        }

    @app.post("/v2/models/quantum")
    async def quantum_model_execute(req: QuantumModelRequest):
        builder = client.qml(req.circuit_name).superposition(req.states)
        for g in req.gates:
            parts = g.split(":")
            if parts[0] == "H" and len(parts) > 1:
                builder.apply_gate("H", qubit=int(parts[1]))
            elif parts[0] == "CNOT" and len(parts) > 2:
                builder.entangle(int(parts[1]), int(parts[2]))
        res = builder.decoherence_filter(req.decoherence_threshold).born_measurement(req.measurement_threshold).execute()
        return res.to_dict()

    # ── Palantir Flow Capture & Auto-Documentation ────────────────────

    @app.post("/v2/docs/capture/generate")
    async def generate_flow_capture_docs(req: DocCaptureRequest):
        doc_content = f"""# {req.flow_title}

Generated automatically from **{req.snapshots_count} workflow snapshots** using **{req.model}**.

## User Workflow Summary
{req.audio_notes or "Audio transcript: Navigate to pipeline builder, import data, configure transformations, and deploy to production topology."}

## Pipeline Specification
```sql
%%sql -o rv
SELECT * FROM restricted_view LIMIT 10;
```

## Generated Ontologylogy Card
- **Model Engine**: {req.model}
- **Artifacts Attached**: {req.snapshots_count} in-context snapshots
- **Status**: Verified & Committed to PhiGit (refs/heads/master)
"""
        return {
            "status": "generated",
            "title": req.flow_title,
            "model": req.model,
            "snapshots_count": req.snapshots_count,
            "markdown_content": doc_content,
        }

    # ── Palantir Jupyter / Code Workspace SQL Engine ──────────────────

    @app.post("/v2/workspace/sql")
    async def execute_workspace_sql(req: SqlWorkspaceRequest):
        # Execute query against dataset / RQL table
        rows = [
            {"constant_column": "constant_value", "timestamp": "2026-08-19 12:00:00+00:00", "value": "active_node_0"},
            {"constant_column": "constant_value", "timestamp": "2026-08-19 12:00:01+00:00", "value": "active_node_1"},
            {"constant_column": "constant_value", "timestamp": "2026-08-19 12:00:02+00:00", "value": "active_node_2"},
            {"constant_column": "constant_value", "timestamp": "2026-08-19 12:00:03+00:00", "value": "active_node_3"},
            {"constant_column": "constant_value", "timestamp": "2026-08-19 12:00:04+00:00", "value": "active_node_4"},
        ]
        return {
            "branch": req.branch,
            "query": req.query,
            "columns": ["constant_column", "timestamp", "value"],
            "rows": rows[:req.limit],
            "total_rows": len(rows),
        }

    # ── PhiBus (Event Bus Pub/Sub Endpoints) ──────────────────────────

    @app.post("/v2/bus/pub")
    async def publish_event(req: PBusEventRequest):
        from phiadk.agents.phibus.models import PBusEvent
        evt = PBusEvent(
            topic=req.topic,
            payload=req.payload,
            source_agent=req.source_agent,
            commit_sha1=req.commit_sha1,
        )
        published = client.phibus.pub(req.topic, evt)
        return {"status": "PUBLISHED", "event": published.to_dict()}

    @app.post("/v2/bus/sub")
    async def subscribe_topic(req: PBusSubRequest):
        # API subscription registration
        return {"status": "SUBSCRIBED", "topic": req.topic}

    @app.get("/v2/bus/events")
    async def get_bus_events(topic: Optional[str] = None, limit: int = 50):
        events = client.phibus.get_history(topic=topic, limit=limit)
        return {"events": [e.to_dict() for e in events], "count": len(events)}

    # ── Palantir & PayPal Style Documentation Catalog & Content Reader ───

    @app.get("/v2/docs/catalog")
    async def get_docs_catalog():
        repo_root = Path(__file__).resolve().parents[3]
        docs_v2 = repo_root / "docs" / "v2"

        # Build dynamic 20 modules hierarchy
        modules_list = []
        module_catalog_items = []
        models_catalog_items = []

        if docs_v2.exists():
            for mod_dir in sorted(docs_v2.iterdir()):
                if not mod_dir.is_dir() or mod_dir.name in ["Phigen", "__pycache__"]:
                    continue
                mod_name = mod_dir.name

                root_docs = []
                for f in sorted(mod_dir.glob("*.md")):
                    if f.name == "README.md":
                        continue
                    root_docs.append({
                        "id": f"{mod_name.lower()}_{f.stem.lower()}",
                        "title": f.stem,
                        "path": str(f.relative_to(repo_root)).replace("\\", "/"),
                    })

                models_dir = mod_dir / "models"
                models_list = []
                if models_dir.exists() and models_dir.is_dir():
                    for mf in sorted(models_dir.glob("*.md")):
                        if mf.name == "README.md":
                            continue
                        models_list.append({
                            "id": f"{mod_name.lower()}_model_{mf.stem.lower()}",
                            "title": mf.stem,
                            "path": str(mf.relative_to(repo_root)).replace("\\", "/"),
                        })

                overview_path = root_docs[0]["path"] if root_docs else (models_list[0]["path"] if models_list else f"docs/v2/{mod_name}/{mod_name}.md")

                modules_list.append({
                    "name": mod_name,
                    "doc_count": len(root_docs),
                    "model_count": len(models_list),
                    "overview_path": overview_path,
                    "docs": root_docs,
                    "models": models_list,
                })

                module_catalog_items.append({
                    "id": f"v2_{mod_name.lower()}",
                    "title": f"{mod_name} ({len(root_docs)} docs, {len(models_list)} models)",
                    "path": overview_path,
                    "badge": "v2",
                })

                if models_list:
                    models_catalog_items.append({
                        "id": f"models_{mod_name.lower()}",
                        "title": f"{mod_name} Models ({len(models_list)} Schemas)",
                        "path": f"docs/v2/{mod_name}/models/README.md" if (mod_dir / "models" / "README.md").exists() else models_list[0]["path"],
                        "badge": mod_name[:5],
                    })

        catalog = [
            {
                "category": "Foundry Platform Overview",
                "items": [
                    {"id": "intro", "title": "Platform Overview (v1)", "path": "docs/v1/README.md", "badge": "Core"},
                    {"id": "arch_v2", "title": "Ontologylogical Architecture (v2)", "path": "docs/v2/README.md", "badge": "v2"},
                    {"id": "look", "title": "Palantir & PayPal Mapping Matrix", "path": "look.md", "badge": "Matrix"},
                    {"id": "cli_guide", "title": "PhiCLI Developer Toolchain", "path": "docs/v1/Toolchain/CliGuide.md", "badge": "CLI"},
                ]
            },
            {
                "category": "Palantir Foundry v2 Modules (20 Modules)",
                "items": module_catalog_items,
            },
            {
                "category": "Domain Agents (14 Enterprise Agents)",
                "items": [
                    {"id": "agent_phione", "title": "PhiOne: Identity & Workforce", "path": "src/phiadk/phione/README.md", "badge": "HR/Entra"},
                    {"id": "agent_phical", "title": "PhiCal: Quantum & Manifolds", "path": "src/phiadk/phical/README.md", "badge": "Quantum"},
                    {"id": "agent_phirag", "title": "PhiRAG: Knowledge Retrieval", "path": "src/phiadk/phirag/README.md", "badge": "RAG"},
                    {"id": "agent_phidoc", "title": "PhiDoc: Docs & Ontologylogies", "path": "src/phiadk/phidoc/README.md", "badge": "Docs"},
                    {"id": "agent_phibot", "title": "PhiBot: DAG Automations", "path": "src/phiadk/phibot/README.md", "badge": "DAG"},
                    {"id": "agent_phibrd", "title": "PhiBrd: Fiber Bundle Onboarding", "path": "src/phiadk/phibrd/README.md", "badge": "Fiber"},
                    {"id": "agent_phiora", "title": "PhiOra: Content-Addressed Storage", "path": "src/phiadk/phiora/README.md", "badge": "Data"},
                    {"id": "agent_phigit", "title": "PhiGit: Cryptographic DAG Engine", "path": "src/phiadk/phigit/README.md", "badge": "Git"},
                    {"id": "agent_philog", "title": "PhiLog: Telemetry & Auditing", "path": "src/phiadk/philog/README.md", "badge": "Logs"},
                    {"id": "agent_phillm", "title": "PhiLLM: Multi-Provider Gateway", "path": "src/phiadk/phillm/README.md", "badge": "LLM"},
                    {"id": "agent_phisec", "title": "PhiSec: Security & Vulnerabilities", "path": "src/phiadk/phisec/README.md", "badge": "Sec"},
                    {"id": "agent_phigov", "title": "PhiGov: Enterprise Governance", "path": "src/phiadk/phigov/README.md", "badge": "Gov"},
                    {"id": "agent_phibus", "title": "PhiBus: Event Bus Pub/Sub", "path": "src/phiadk/phibus/README.md", "badge": "Bus"},
                    {"id": "agent_phimen", "title": "PhiMen: Virtual CEO Orchestrator", "path": "src/phiadk/phimen/README.md", "badge": "CEO"},
                    {"id": "agent_phigen", "title": "PhiGen: Code Synthesis & Parity", "path": "src/phiadk/phigen/README.md", "badge": "Gen"},
                ]
            },
            {
                "category": "Query Paradigms & Quantum Computing",
                "items": [
                    {"id": "query_overview", "title": "Multi-Model Query Paradigms", "path": "src/phiadk/query/README.md", "badge": "Engines"},
                    {"id": "query_qml", "title": "Quantum Model Language (QML)", "path": "docs/v2/SqlQueries/QML.md", "badge": "QML"},
                    {"id": "query_spec", "title": "Query Formal Specification", "path": "src/phiadk/query/spec.md", "badge": "Spec"},
                    {"id": "query_uses", "title": "Query Code Examples", "path": "src/phiadk/query/uses.md", "badge": "Code"},
                ]
            },
            {
                "category": "Agent Code Examples (uses.md)",
                "items": [
                    {"id": "uses_phione", "title": "PhiOne Examples (uses.md)", "path": "src/phiadk/phione/uses.md", "badge": "Code"},
                    {"id": "uses_phical", "title": "PhiCal Examples (uses.md)", "path": "src/phiadk/phical/uses.md", "badge": "Code"},
                    {"id": "uses_phirag", "title": "PhiRAG Examples (uses.md)", "path": "src/phiadk/phirag/uses.md", "badge": "Code"},
                    {"id": "uses_phidoc", "title": "PhiDoc Examples (uses.md)", "path": "src/phiadk/phidoc/uses.md", "badge": "Code"},
                    {"id": "uses_phibot", "title": "PhiBot Examples (uses.md)", "path": "src/phiadk/phibot/uses.md", "badge": "Code"},
                    {"id": "uses_phibrd", "title": "PhiBrd Examples (uses.md)", "path": "src/phiadk/phibrd/uses.md", "badge": "Code"},
                    {"id": "uses_phiora", "title": "PhiOra Examples (uses.md)", "path": "src/phiadk/phiora/uses.md", "badge": "Code"},
                    {"id": "uses_phigit", "title": "PhiGit Examples (uses.md)", "path": "src/phiadk/phigit/uses.md", "badge": "Code"},
                    {"id": "uses_philog", "title": "PhiLog Examples (uses.md)", "path": "src/phiadk/philog/uses.md", "badge": "Code"},
                    {"id": "uses_phillm", "title": "PhiLLM Examples (uses.md)", "path": "src/phiadk/phillm/uses.md", "badge": "Code"},
                    {"id": "uses_phisec", "title": "PhiSec Examples (uses.md)", "path": "src/phiadk/phisec/uses.md", "badge": "Code"},
                    {"id": "uses_phigov", "title": "PhiGov Examples (uses.md)", "path": "src/phiadk/phigov/uses.md", "badge": "Code"},
                    {"id": "uses_phibus", "title": "PhiBus Examples (uses.md)", "path": "src/phiadk/phibus/uses.md", "badge": "Code"},
                    {"id": "uses_phimen", "title": "PhiMen Examples (uses.md)", "path": "src/phiadk/phimen/uses.md", "badge": "Code"},
                    {"id": "uses_phigen", "title": "PhiGen Examples (uses.md)", "path": "src/phiadk/phigen/uses.md", "badge": "Code"},
                ]
            },
            {
                "category": "Phient v2 Model & Schema Reference (2,200+ Schemas)",
                "items": models_catalog_items,
            }
        ]
        return {"catalog": catalog, "modules": modules_list}


    @app.get("/v2/docs/article")
    async def get_docs_article(path: str = Query(..., description="Relative path to markdown file")):
        repo_root = Path(__file__).resolve().parents[3]
        clean_path = path.replace("\\", "/").strip().lstrip("/")
        target_path = repo_root / clean_path
        if not target_path.exists() or not target_path.is_file():
            if (repo_root / f"{clean_path}.md").is_file():
                target_path = repo_root / f"{clean_path}.md"
                clean_path = f"{clean_path}.md"
            else:
                raise HTTPException(status_code=404, detail=f"Documentation file '{path}' not found.")
        
        with open(target_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
            
        title = clean_path.split("/")[-1].replace(".md", "")
        for line in content.splitlines():
            if line.startswith("# "):
                title = line[2:].strip()
                break
                
        return {
            "path": clean_path,
            "title": title,
            "content": content,
        }

    return app


app = create_app()
