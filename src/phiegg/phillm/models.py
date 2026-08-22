"""PhiLLM domain models — language model endpoints and completion types.

Mirrors Palantir's ``foundry_sdk.v2.language_models.models``.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Literal, Optional, Union

from phiegg._core.model_base import ModelBase


@dataclass
class Usage(ModelBase):
    """Token consumption metrics."""

    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0


@dataclass
class CompletionMessage(ModelBase):
    """A single chat message."""

    role: Literal["system", "user", "assistant", "function", "tool"] = "user"
    content: str = ""
    name: Optional[str] = None


@dataclass
class OpenAiCompletionRequest(ModelBase):
    """Request payload for OpenAI / general chat completions."""

    model: str = "gpt-4o"
    messages: List[CompletionMessage] = field(default_factory=list)
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    top_p: Optional[float] = None
    stream: bool = False
    stop: Optional[List[str]] = None


@dataclass
class OpenAiCompletionChoice(ModelBase):
    """A completion generation candidate."""

    index: int = 0
    message: CompletionMessage = field(default_factory=CompletionMessage)
    finish_reason: str = "stop"


@dataclass
class OpenAiCompletionResponse(ModelBase):
    """Response payload from OpenAI / LLM completions."""

    id: str = ""
    model: str = ""
    choices: List[OpenAiCompletionChoice] = field(default_factory=list)
    usage: Usage = field(default_factory=Usage)

    @property
    def content(self) -> str:
        """Helper to get text of first choice."""
        return self.choices[0].message.content if self.choices else ""


@dataclass
class OpenAiEmbeddingsRequest(ModelBase):
    """Request for text embedding vectors."""

    input: Union[str, List[str]] = ""
    model: str = "text-embedding-3-small"
    dimensions: Optional[int] = None
    encoding_format: Optional[str] = "float"


@dataclass
class EmbeddingData(ModelBase):
    """A single embedding vector result."""

    index: int = 0
    embedding: List[float] = field(default_factory=list)


@dataclass
class OpenAiEmbeddingsResponse(ModelBase):
    """Response containing generated embedding vectors."""

    data: List[EmbeddingData] = field(default_factory=list)
    model: str = ""
    usage: Usage = field(default_factory=Usage)


@dataclass
class ModelProfile(ModelBase):
    """Configuration profile for a specific LLM endpoint."""

    provider: str = "openai"
    model_id: str = "gpt-4o"
    context_window: int = 128000
    temperature: float = 0.7
    max_tokens: int = 4096
    api_base: Optional[str] = None
