"""FastAPI API Routes."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from .models import ChatRequest, ChatResponse, IngestRequest, KnowledgeSearchRequest
from ..monitoring.audit import AuditEvent
from ..monitoring.metrics import metrics

router = APIRouter()


@router.get("/")
async def root():
    dashboard_path = Path(__file__).parent.parent.parent / "dashboard" / "index.html"
    if dashboard_path.exists():
        return FileResponse(dashboard_path)
    return {"message": "M-KOPA AI Ops Agent Platform", "version": "1.0.0"}


@router.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    from .main import audit_logger, orchestrator, rag_pipeline
    if not orchestrator:
        raise HTTPException(status_code=503, detail="Orchestrator not initialized")

    session_id = request.session_id or str(uuid.uuid4())
    result = await orchestrator.process(
        query=request.message, user_id=request.user_id, session_id=session_id
    )

    if audit_logger:
        audit_logger.log(AuditEvent(
            event_type="agent_execution",
            agent_name=result.agent_name,
            action="chat",
            user_id=request.user_id,
            request_id=result.task_id,
            parameters={"message": request.message[:200]},
            result_status=result.status,
            result_summary=result.output[:200],
            duration_ms=result.duration_ms,
            tokens_used=result.tokens_used,
        ))

    metrics.record_agent_request(
        agent=result.agent_name, status=result.status, duration_ms=result.duration_ms, tokens=result.tokens_used
    )

    return ChatResponse(
        request_id=result.task_id,
        session_id=session_id,
        response=result.output,
        agent_used=result.agent_name,
        confidence=result.confidence,
        sources=result.sources,
        tokens_used=result.tokens_used,
        duration_ms=result.duration_ms,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/api/v1/agents")
async def list_agents():
    from .main import orchestrator
    if not orchestrator:
        raise HTTPException(status_code=503, detail="Orchestrator not initialized")
    return orchestrator.get_agents_status()


@router.get("/api/v1/agents/{name}")
async def get_agent(name: str):
    from .main import orchestrator
    if not orchestrator:
        raise HTTPException(status_code=503, detail="Orchestrator not initialized")
    status = orchestrator.get_agents_status()
    if name not in status:
        raise HTTPException(status_code=404, detail=f"Agent '{name}' not found")
    return status[name]


@router.post("/api/v1/knowledge/search")
async def search_knowledge(request: KnowledgeSearchRequest):
    from .main import rag_pipeline
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="RAG pipeline not initialized")
    results = await rag_pipeline.search(
        query=request.query, collection=request.collection, top_k=request.top_k
    )
    return {"query": request.query, "results": results, "count": len(results)}


@router.post("/api/v1/knowledge/ingest")
async def ingest_document(request: IngestRequest):
    from .main import rag_pipeline
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="RAG pipeline not initialized")
    record = await rag_pipeline.ingest_document(
        content=request.content, doc_id=request.doc_id, title=request.title, source=request.source, collection=request.collection
    )
    return {"doc_id": record.doc_id, "title": record.title, "chunks": record.chunk_count, "status": "ingested"}


@router.get("/api/v1/knowledge/stats")
async def knowledge_stats():
    from .main import rag_pipeline
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="RAG pipeline not initialized")
    return rag_pipeline.get_stats()


@router.get("/api/v1/health")
async def health_check():
    from .main import audit_logger, orchestrator, rag_pipeline, rag_pipeline
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "components": {
            "api": "healthy",
            "orchestrator": "healthy" if orchestrator else "not_initialized",
            "rag_pipeline": "healthy" if rag_pipeline else "not_initialized",
            "audit_logger": "healthy" if audit_logger else "not_initialized",
        },
        "version": "1.0.0",
    }


@router.get("/api/v1/metrics")
async def get_metrics():
    return metrics.get_summary()


@router.get("/api/v1/status")
async def system_status():
    from .main import audit_logger, orchestrator, rag_pipeline, rag_pipeline
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "agents": orchestrator.get_agents_status() if orchestrator else {},
        "rag": rag_pipeline.get_stats() if rag_pipeline else {},
        "audit": audit_logger.get_stats() if audit_logger else {},
        "metrics": metrics.get_summary(),
    }


@router.get("/api/v1/audit/logs")
async def get_audit_logs(agent: str | None = None, user: str | None = None, limit: int = 50, offset: int = 0):
    from .main import audit_logger, orchestrator, rag_pipeline
    if not audit_logger:
        raise HTTPException(status_code=503, detail="Audit logger not initialized")
    return audit_logger.query(agent_name=agent, user_id=user, limit=limit, offset=offset)
