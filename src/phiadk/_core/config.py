"""PhiADK SDK Configuration.

Mirrors Palantir's ``foundry_sdk._core.config.Config`` dataclass with
settings relevant to the PhiADK agent ecosystem.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, Literal, Optional, Union


@dataclass
class Config:
    """Configuration for the PhiADK SDK HTTP session and behaviour.

    :param default_headers: HTTP headers to include with all requests.
    :param proxies: Proxies to use for HTTP and HTTPS requests.
    :param timeout: The default timeout for all requests in seconds.
    :param verify: SSL verification — bool or path to a CA bundle.
    :param default_params: URL query parameters to include with all requests.
    :param scheme: URL scheme to use (``http`` or ``https``). Defaults to ``https``.
    :param max_retries: Maximum number of retried failed requests (default 4).
    :param backoff_slot_size_ms: Slot size for exponential backoff (default 250ms).
    :param topology_cache_ttl: Seconds to cache topology traversal results (default 300).
    """

    default_headers: Optional[Dict[str, str]] = None
    """HTTP headers to include with all requests."""

    proxies: Optional[Dict[Literal["http", "https"], str]] = None
    """Proxies to use for HTTP and HTTPS requests."""

    timeout: Optional[Union[int, float]] = None
    """The default timeout for all requests in seconds."""

    verify: Union[bool, str] = True
    """SSL verification, can be a boolean or a path to a CA bundle."""

    default_params: Optional[Dict[str, Any]] = None
    """URL query parameters to include with all requests."""

    scheme: Literal["http", "https"] = "https"
    """URL scheme to use ('http' or 'https'). Defaults to 'https'."""

    max_retries: Optional[int] = None
    """Maximum number of times a failed request is retried (default 4)."""

    backoff_slot_size_ms: Optional[int] = None
    """Exponential backoff slot size in milliseconds (default 250)."""

    topology_cache_ttl: int = 300
    """Seconds to cache topology traversal results."""
