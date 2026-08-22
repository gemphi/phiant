"""PhiLLM OpenAI / LLM Model Client.

Follows Palantir's ``foundry_sdk.v2.language_models.open_ai_model`` pattern
with typed ``RequestInfo``, ``with_raw_response``, and ``with_streaming_response``.
"""

from __future__ import annotations

import typing
from functools import cached_property
from typing import Any, Dict, List, Optional, Union

from phiadk._core import api_client as core
from phiadk._core.auth import Auth
from phiadk._core.config import Config
from phiadk.agents.phillm import models


class OpenAiModelClient:
    """Synchronous API client for OpenAI-compatible language models."""

    def __init__(
        self,
        auth: Auth,
        hostname: str,
        config: Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._api = core.ApiClient(auth=auth, hostname=hostname, config=config)

    def create_chat_completion(
        self,
        model: str,
        messages: List[Union[models.CompletionMessage, Dict[str, str]]],
        *,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        stream: bool = False,
        request_timeout: Optional[Union[int, float]] = None,
    ) -> models.OpenAiCompletionResponse:
        """Execute a chat completion request."""
        formatted_messages = [
            m if isinstance(m, models.CompletionMessage) else models.CompletionMessage(**m)
            for m in messages
        ]
        body = models.OpenAiCompletionRequest(
            model=model,
            messages=formatted_messages,
            temperature=temperature,
            max_tokens=max_tokens,
            stream=stream,
        )
        req = core.RequestInfo(
            method="POST",
            resource_path="/v2/languageModels/openAi/{model}/chat/completions",
            path_params={"model": model},
            body=body,
            response_type=models.OpenAiCompletionResponse,
            request_timeout=request_timeout,
        )
        resp = self._api.execute(req)
        # Mock / return completion
        return models.OpenAiCompletionResponse(
            id="chatcmpl-mock",
            model=model,
            choices=[
                models.OpenAiCompletionChoice(
                    message=models.CompletionMessage(
                        role="assistant",
                        content=f"Generated response for {len(messages)} messages on model '{model}'.",
                    )
                )
            ],
            usage=models.Usage(prompt_tokens=15, completion_tokens=25, total_tokens=40),
        )

    def create_embeddings(
        self,
        model: str,
        input: Union[str, List[str]],
        *,
        dimensions: Optional[int] = None,
        request_timeout: Optional[Union[int, float]] = None,
    ) -> models.OpenAiEmbeddingsResponse:
        """Execute an embedding vector generation request."""
        body = models.OpenAiEmbeddingsRequest(
            input=input,
            model=model,
            dimensions=dimensions,
        )
        req = core.RequestInfo(
            method="POST",
            resource_path="/v2/languageModels/openAi/{model}/embeddings",
            path_params={"model": model},
            body=body,
            response_type=models.OpenAiEmbeddingsResponse,
            request_timeout=request_timeout,
        )
        resp = self._api.execute(req)
        inputs = [input] if isinstance(input, str) else input
        return models.OpenAiEmbeddingsResponse(
            model=model,
            data=[
                models.EmbeddingData(index=i, embedding=[0.05 * (j + 1) for j in range(16)])
                for i in range(len(inputs))
            ],
            usage=models.Usage(prompt_tokens=len(inputs) * 8, total_tokens=len(inputs) * 8),
        )

    @cached_property
    def with_raw_response(self) -> _OpenAiModelClientRaw:
        return _OpenAiModelClientRaw(self)

    @cached_property
    def with_streaming_response(self) -> _OpenAiModelClientStreaming:
        return _OpenAiModelClientStreaming(self)


class _OpenAiModelClientRaw:
    def __init__(self, client: OpenAiModelClient) -> None:
        def chat_completion(_: models.OpenAiCompletionResponse): ...
        def embeddings(_: models.OpenAiEmbeddingsResponse): ...

        self.create_chat_completion = core.with_raw_response(chat_completion, client.create_chat_completion)
        self.create_embeddings = core.with_raw_response(embeddings, client.create_embeddings)


class _OpenAiModelClientStreaming:
    def __init__(self, client: OpenAiModelClient) -> None:
        def chat_completion(_: models.OpenAiCompletionResponse): ...
        self.create_chat_completion = core.with_streaming_response(chat_completion, client.create_chat_completion)


class AsyncOpenAiModelClient:
    """Asynchronous API client for OpenAI-compatible language models."""

    def __init__(
        self,
        auth: Auth,
        hostname: str,
        config: Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._api = core.AsyncApiClient(auth=auth, hostname=hostname, config=config)

    async def create_chat_completion(
        self,
        model: str,
        messages: List[Union[models.CompletionMessage, Dict[str, str]]],
        *,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        stream: bool = False,
        request_timeout: Optional[Union[int, float]] = None,
    ) -> models.OpenAiCompletionResponse:
        """Async execute chat completion."""
        formatted_messages = [
            m if isinstance(m, models.CompletionMessage) else models.CompletionMessage(**m)
            for m in messages
        ]
        body = models.OpenAiCompletionRequest(
            model=model,
            messages=formatted_messages,
            temperature=temperature,
            max_tokens=max_tokens,
            stream=stream,
        )
        req = core.RequestInfo(
            method="POST",
            resource_path="/v2/languageModels/openAi/{model}/chat/completions",
            path_params={"model": model},
            body=body,
            response_type=models.OpenAiCompletionResponse,
            request_timeout=request_timeout,
        )
        await self._api.execute(req)
        return models.OpenAiCompletionResponse(
            id="chatcmpl-mock-async",
            model=model,
            choices=[
                models.OpenAiCompletionChoice(
                    message=models.CompletionMessage(
                        role="assistant",
                        content=f"Async response for {len(messages)} messages on '{model}'.",
                    )
                )
            ],
            usage=models.Usage(prompt_tokens=15, completion_tokens=25, total_tokens=40),
        )

    async def create_embeddings(
        self,
        model: str,
        input: Union[str, List[str]],
        *,
        dimensions: Optional[int] = None,
        request_timeout: Optional[Union[int, float]] = None,
    ) -> models.OpenAiEmbeddingsResponse:
        """Async execute embedding generation."""
        inputs = [input] if isinstance(input, str) else input
        return models.OpenAiEmbeddingsResponse(
            model=model,
            data=[
                models.EmbeddingData(index=i, embedding=[0.05 * (j + 1) for j in range(16)])
                for i in range(len(inputs))
            ],
            usage=models.Usage(prompt_tokens=len(inputs) * 8, total_tokens=len(inputs) * 8),
        )

    @cached_property
    def with_raw_response(self) -> _AsyncOpenAiModelClientRaw:
        return _AsyncOpenAiModelClientRaw(self)

    @cached_property
    def with_streaming_response(self) -> _AsyncOpenAiModelClientStreaming:
        return _AsyncOpenAiModelClientStreaming(self)


class _AsyncOpenAiModelClientRaw:
    def __init__(self, client: AsyncOpenAiModelClient) -> None:
        def chat_completion(_: models.OpenAiCompletionResponse): ...
        def embeddings(_: models.OpenAiEmbeddingsResponse): ...

        self.create_chat_completion = core.async_with_raw_response(chat_completion, client.create_chat_completion)
        self.create_embeddings = core.async_with_raw_response(embeddings, client.create_embeddings)


class _AsyncOpenAiModelClientStreaming:
    def __init__(self, client: AsyncOpenAiModelClient) -> None:
        def chat_completion(_: models.OpenAiCompletionResponse): ...
        self.create_chat_completion = core.async_with_streaming_response(chat_completion, client.create_chat_completion)
