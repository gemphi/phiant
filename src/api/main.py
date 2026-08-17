"""FastAPI application - M-KOPA Agent Platform API."""

from __future__ import annotations

import logging
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from .routes import router
from ..monitoring.audit import AuditLogger
from ..orchestrator.orchestrator import Orchestrator
from ..rag.pipeline import RAGPipeline

logger = logging.getLogger(__name__)

orchestrator: Orchestrator | None = None
rag_pipeline: RAGPipeline | None = None
audit_logger: AuditLogger | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global orchestrator, rag_pipeline, audit_logger
    logger.info("Starting M-KOPA Agent Platform...")

    orchestrator = Orchestrator()
    rag_pipeline = RAGPipeline()
    audit_logger = AuditLogger()

    await rag_pipeline.ingest_sample_data()
    logger.info("M-KOPA Agent Platform started successfully")
    yield

    logger.info("Shutting down M-KOPA Agent Platform...")


app = FastAPI(
    title="M-KOPA AI Ops Agent Platform",
    description="Multi-agent ecosystem for internal operations automation",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    session_id = str(uuid.uuid4())

    try:
        while True:
            data = await websocket.receive_json()
            message = data.get("content", "")

            await websocket.send_json({"type": "status", "content": "Processing...", "session_id": session_id})

            if orchestrator:
                result = await orchestrator.process(
                    query=message, user_id=data.get("user_id", "ws-anonymous"), session_id=session_id
                )
                await websocket.send_json({
                    "type": "complete",
                    "content": result.output,
                    "agent": result.agent_name,
                    "confidence": result.confidence,
                    "sources": result.sources,
                    "metrics": {"tokens_used": result.tokens_used, "duration_ms": result.duration_ms},
                    "session_id": session_id,
                })
            else:
                await websocket.send_json({"type": "error", "content": "Orchestrator unavailable", "session_id": session_id})
    except WebSocketDisconnect:
        logger.info("WebSocket disconnected: %s", session_id)
