"""API Data Models for FastAPI."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None
    user_id: str = "anonymous"
    priority: str | None = None


class ChatResponse(BaseModel):
    request_id: str
    session_id: str
    response: str
    agent_used: str
    confidence: float
    sources: list[dict[str, Any]]
    tokens_used: int
    duration_ms: int
    timestamp: str


class KnowledgeSearchRequest(BaseModel):
    query: str
    collection: str | None = None
    top_k: int = 5


class IngestRequest(BaseModel):
    content: str
    doc_id: str
    title: str = ""
    source: str = "manual"
    collection: str = "phient_general"
