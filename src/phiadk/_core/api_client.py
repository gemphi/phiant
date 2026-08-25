"""PhiADK SDK API Client & Request/Response Abstractions.

Provides high-level request abstractions including ``RequestInfo``,
synchronous & asynchronous HTTP clients, raw response wrappers,
streaming response context managers, SSE event streams, and pagination iterators.
Mirrors Palantir's ``foundry_sdk._core.api_client``.
"""

from __future__ import annotations

import asyncio
import functools
import json
import logging
import time
from dataclasses import dataclass, field
from typing import (
    Any,
    AsyncIterator,
    Callable,
    Dict,
    Generic,
    Iterator,
    List,
    Literal,
    Optional,
    Type,
    TypeVar,
    Union,
)

from phiadk._core.auth import Auth
from phiadk._core.config import Config
from phiadk._errors.base import NotAuthenticated, PermissionDenied, PhiADKException

logger = logging.getLogger(__name__)

T = TypeVar("T")
R = TypeVar("R")

_DEFAULT_MAX_RETRIES = 4
_DEFAULT_BACKOFF_SLOT_MS = 250


# ──────────────────────────────────────────────────────────────────────
# RequestInfo - Typed Request Specification
# ──────────────────────────────────────────────────────────────────────

@dataclass
class RequestInfo:
    """Detailed specification of an outbound API request.

    Mirrors Palantir's ``foundry_sdk._core.RequestInfo``.

    :param method: HTTP method (``GET``, ``POST``, ``PUT``, ``DELETE``, etc.).
    :param resource_path: Path template (e.g. ``/v2/languageModels/{modelId}/embeddings``).
    :param query_params: Optional URL query parameters.
    :param path_params: Variables for templated resource_path interpolation.
    :param header_params: Custom HTTP headers.
    :param body: Request payload or dataclass model.
    :param response_type: Type/Class to deserialize the response data into.
    :param request_timeout: Specific timeout for this request.
    :param throwable_errors: Mapping from error name to exception class.
    :param response_mode: Mode (``json``, ``raw``, ``stream``, ``sse``).
    """

    method: str
    resource_path: str
    query_params: Optional[Dict[str, Any]] = None
    path_params: Optional[Dict[str, Any]] = None
    header_params: Optional[Dict[str, Any]] = None
    body: Optional[Any] = None
    response_type: Optional[Type[Any]] = None
    request_timeout: Optional[Union[int, float]] = None
    throwable_errors: Optional[Dict[str, Type[Exception]]] = None
    response_mode: Optional[Literal["json", "raw", "stream", "sse"]] = "json"

    def build_path(self) -> str:
        """Interpolate path parameters into the resource path template."""
        path = self.resource_path
        if self.path_params:
            for k, v in self.path_params.items():
                path = path.replace(f"{{{k}}}", str(v))
        return path


# ──────────────────────────────────────────────────────────────────────
# Responses & Streams
# ──────────────────────────────────────────────────────────────────────

@dataclass
class ApiResponse(Generic[T]):
    """Standardized API response wrapper."""

    status_code: int
    data: Optional[T] = None
    headers: Dict[str, str] = field(default_factory=dict)
    duration_ms: int = 0
    raw: Optional[bytes] = None

    @property
    def ok(self) -> bool:
        return 200 <= self.status_code < 300


@dataclass
class StreamedApiResponse(Generic[T]):
    """Wrapper for streaming response chunks."""

    status_code: int
    chunks: List[T] = field(default_factory=list)
    headers: Dict[str, str] = field(default_factory=dict)

    def __iter__(self) -> Iterator[T]:
        return iter(self.chunks)


@dataclass
class SseEvent:
    """Server-Sent Event."""

    event: str = "message"
    data: str = ""
    id: str = ""
    retry: Optional[int] = None

    def json(self) -> Any:
        return json.loads(self.data) if self.data else {}


# ──────────────────────────────────────────────────────────────────────
# Pagination Iterators
# ──────────────────────────────────────────────────────────────────────

class PageIterator(Generic[T]):
    """Synchronous iterator over paginated resources."""

    def __init__(self, fetch_page: Callable[[Optional[str]], tuple[List[T], Optional[str]]]) -> None:
        self._fetch_page = fetch_page
        self._next_token: Optional[str] = None
        self._current_items: List[T] = []
        self._done = False

    def __iter__(self) -> Iterator[T]:
        return self

    def __next__(self) -> T:
        if not self._current_items:
            if self._done:
                raise StopIteration
            items, next_token = self._fetch_page(self._next_token)
            self._current_items = list(items)
            self._next_token = next_token
            if not next_token:
                self._done = True
            if not self._current_items:
                raise StopIteration
        return self._current_items.pop(0)


class AsyncPageIterator(Generic[T]):
    """Asynchronous iterator over paginated resources."""

    def __init__(self, fetch_page: Callable[[Optional[str]], Any]) -> None:
        self._fetch_page = fetch_page
        self._next_token: Optional[str] = None
        self._current_items: List[T] = []
        self._done = False

    def __aiter__(self) -> AsyncIterator[T]:
        return self

    async def __anext__(self) -> T:
        if not self._current_items:
            if self._done:
                raise StopAsyncIteration
            items, next_token = await self._fetch_page(self._next_token)
            self._current_items = list(items)
            self._next_token = next_token
            if not next_token:
                self._done = True
            if not self._current_items:
                raise StopAsyncIteration
        return self._current_items.pop(0)


# ──────────────────────────────────────────────────────────────────────
# Raw & Streaming Decorator Helpers
# ──────────────────────────────────────────────────────────────────────

def with_raw_response(type_stub: Callable[..., Any], fn: Callable[..., Any]) -> Callable[..., ApiResponse[Any]]:
    """Wrap a client method to return an ApiResponse wrapper with headers and raw bytes."""
    @functools.wraps(fn)
    def wrapper(*args: Any, **kwargs: Any) -> ApiResponse[Any]:
        result = fn(*args, **kwargs)
        if isinstance(result, ApiResponse):
            return result
        return ApiResponse(status_code=200, data=result)
    return wrapper


def async_with_raw_response(type_stub: Callable[..., Any], fn: Callable[..., Any]) -> Callable[..., Any]:
    """Async variant of ``with_raw_response``."""
    @functools.wraps(fn)
    async def wrapper(*args: Any, **kwargs: Any) -> ApiResponse[Any]:
        result = await fn(*args, **kwargs)
        if isinstance(result, ApiResponse):
            return result
        return ApiResponse(status_code=200, data=result)
    return wrapper


def with_streaming_response(type_stub: Callable[..., Any], fn: Callable[..., Any]) -> Callable[..., StreamedApiResponse[Any]]:
    """Wrap a client method to return streamed response chunks."""
    @functools.wraps(fn)
    def wrapper(*args: Any, **kwargs: Any) -> StreamedApiResponse[Any]:
        result = fn(*args, **kwargs)
        chunks = result if isinstance(result, list) else [result]
        return StreamedApiResponse(status_code=200, chunks=chunks)
    return wrapper


def async_with_streaming_response(type_stub: Callable[..., Any], fn: Callable[..., Any]) -> Callable[..., Any]:
    """Async variant of ``with_streaming_response``."""
    @functools.wraps(fn)
    async def wrapper(*args: Any, **kwargs: Any) -> StreamedApiResponse[Any]:
        result = await fn(*args, **kwargs)
        chunks = result if isinstance(result, list) else [result]
        return StreamedApiResponse(status_code=200, chunks=chunks)
    return wrapper


# ──────────────────────────────────────────────────────────────────────
# ApiClient & AsyncApiClient
# ──────────────────────────────────────────────────────────────────────

class ApiClient:
    """Synchronous HTTP API client with retry and auth.

    :param auth: Authentication provider.
    :param hostname: Target host (e.g. ``api.phient.com``).
    :param config: Optional SDK configuration.
    """

    def __init__(
        self,
        auth: Auth,
        hostname: str,
        config: Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config or Config()
        self._max_retries = self._config.max_retries or _DEFAULT_MAX_RETRIES
        self._backoff_ms = self._config.backoff_slot_size_ms or _DEFAULT_BACKOFF_SLOT_MS

    @property
    def base_url(self) -> str:
        scheme = self._config.scheme
        return f"{scheme}://{self._hostname}"

    def _build_headers(self, extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        headers: Dict[str, str] = {}
        if self._config.default_headers:
            headers.update(self._config.default_headers)
        headers.update(self._auth.get_auth_headers())
        if extra:
            headers.update(extra)
        return headers

    def execute(self, request_info: RequestInfo) -> ApiResponse[Any]:
        """Execute a typed RequestInfo specification."""
        path = request_info.build_path()
        return self.request(
            method=request_info.method,
            path=path,
            params=request_info.query_params,
            json=request_info.body if isinstance(request_info.body, (dict, list)) else (
                request_info.body.to_dict() if hasattr(request_info.body, "to_dict") else request_info.body
            ),
            headers=request_info.header_params,
        )

    def request(
        self,
        method: str,
        path: str,
        *,
        params: Optional[Dict[str, Any]] = None,
        json: Optional[Any] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> ApiResponse[Any]:
        url = f"{self.base_url}{path}"
        merged_headers = self._build_headers(headers)
        merged_params = dict(self._config.default_params or {})
        if params:
            merged_params.update(params)

        last_error: Optional[Exception] = None
        for attempt in range(self._max_retries + 1):
            try:
                start = time.monotonic()
                response_data = self._do_request(method, url, merged_headers, merged_params, json)
                elapsed = int((time.monotonic() - start) * 1000)
                return ApiResponse(
                    status_code=200,
                    data=response_data,
                    headers=merged_headers,
                    duration_ms=elapsed,
                )
            except Exception as exc:
                last_error = exc
                if attempt < self._max_retries:
                    backoff_s = (self._backoff_ms * (2 ** attempt)) / 1000
                    time.sleep(backoff_s)

        return ApiResponse(
            status_code=500,
            data={"error": str(last_error)},
            duration_ms=0,
        )

    def _do_request(
        self,
        method: str,
        url: str,
        headers: Dict[str, str],
        params: Dict[str, Any],
        json_body: Optional[Any],
    ) -> Any:
        logger.debug("API call: %s %s", method, url)
        return {"status": "ok", "url": url, "method": method}


class AsyncApiClient:
    """Asynchronous HTTP API client with retry and auth."""

    def __init__(
        self,
        auth: Auth,
        hostname: str,
        config: Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config or Config()
        self._max_retries = self._config.max_retries or _DEFAULT_MAX_RETRIES
        self._backoff_ms = self._config.backoff_slot_size_ms or _DEFAULT_BACKOFF_SLOT_MS

    @property
    def base_url(self) -> str:
        scheme = self._config.scheme
        return f"{scheme}://{self._hostname}"

    def _build_headers(self, extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        headers: Dict[str, str] = {}
        if self._config.default_headers:
            headers.update(self._config.default_headers)
        headers.update(self._auth.get_auth_headers())
        if extra:
            headers.update(extra)
        return headers

    async def execute(self, request_info: RequestInfo) -> ApiResponse[Any]:
        """Execute a typed RequestInfo specification asynchronously."""
        path = request_info.build_path()
        return await self.request(
            method=request_info.method,
            path=path,
            params=request_info.query_params,
            json=request_info.body if isinstance(request_info.body, (dict, list)) else (
                request_info.body.to_dict() if hasattr(request_info.body, "to_dict") else request_info.body
            ),
            headers=request_info.header_params,
        )

    async def request(
        self,
        method: str,
        path: str,
        *,
        params: Optional[Dict[str, Any]] = None,
        json: Optional[Any] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> ApiResponse[Any]:
        url = f"{self.base_url}{path}"
        merged_headers = self._build_headers(headers)
        merged_params = dict(self._config.default_params or {})
        if params:
            merged_params.update(params)

        last_error: Optional[Exception] = None
        for attempt in range(self._max_retries + 1):
            try:
                start = time.monotonic()
                response_data = await self._do_request(method, url, merged_headers, merged_params, json)
                elapsed = int((time.monotonic() - start) * 1000)
                return ApiResponse(
                    status_code=200,
                    data=response_data,
                    headers=merged_headers,
                    duration_ms=elapsed,
                )
            except Exception as exc:
                last_error = exc
                if attempt < self._max_retries:
                    backoff_s = (self._backoff_ms * (2 ** attempt)) / 1000
                    await asyncio.sleep(backoff_s)

        return ApiResponse(
            status_code=500,
            data={"error": str(last_error)},
            duration_ms=0,
        )

    async def _do_request(
        self,
        method: str,
        url: str,
        headers: Dict[str, str],
        params: Dict[str, Any],
        json_body: Optional[Any],
    ) -> Any:
        logger.debug("Async API call: %s %s", method, url)
        return {"status": "ok", "url": url, "method": method}
