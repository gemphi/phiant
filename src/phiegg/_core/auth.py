"""PhiEgg SDK Authentication.

Provides the ``Auth`` protocol and concrete implementations for
token-based (``phi_`` tokens), API-key, and environment-variable auth.
Mirrors Palantir's ``foundry_sdk._core.auth_utils`` / confidential client pattern.
"""

from __future__ import annotations

import os
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, Optional


class Auth(ABC):
    """Abstract authentication provider.

    All auth implementations must be able to produce a dictionary of
    HTTP headers that authenticate the request.
    """

    @abstractmethod
    def get_auth_headers(self) -> Dict[str, str]:
        """Return headers to attach to every outbound request."""

    @abstractmethod
    def is_valid(self) -> bool:
        """Return ``True`` if the credentials are still valid."""


@dataclass
class TokenAuth(Auth):
    """Authenticate using a ``phi_`` bearer token.

    This is the primary auth method for the PhiEgg ecosystem.  Tokens are
    issued by the PhiOne identity service and carry the ``phi_`` prefix.

    :param token: The bearer token string (e.g. ``phi_abc123…``).
    """

    token: str

    def get_auth_headers(self) -> Dict[str, str]:
        return {"Authorization": f"Bearer {self.token}"}

    def is_valid(self) -> bool:
        return bool(self.token and self.token.startswith("phi_"))

    def __repr__(self) -> str:
        masked = self.token[:8] + "…" if len(self.token) > 8 else "***"
        return f"TokenAuth(token='{masked}')"


@dataclass
class ApiKeyAuth(Auth):
    """Authenticate using an API key header.

    :param api_key: The API key value.
    :param header_name: The header name to use (default ``X-Api-Key``).
    """

    api_key: str
    header_name: str = "X-Api-Key"

    def get_auth_headers(self) -> Dict[str, str]:
        return {self.header_name: self.api_key}

    def is_valid(self) -> bool:
        return bool(self.api_key)

    def __repr__(self) -> str:
        masked = self.api_key[:4] + "…" if len(self.api_key) > 4 else "***"
        return f"ApiKeyAuth(key='{masked}')"


class EnvAuth(Auth):
    """Resolve authentication from environment variables.

    Looks for ``PHIEGG_TOKEN`` first (→ ``TokenAuth``), then
    ``PHIEGG_API_KEY`` (→ ``ApiKeyAuth``).

    :param token_var: Environment variable name for the bearer token.
    :param api_key_var: Environment variable name for the API key.
    """

    def __init__(
        self,
        token_var: str = "PHIEGG_TOKEN",
        api_key_var: str = "PHIEGG_API_KEY",
    ) -> None:
        self._token_var = token_var
        self._api_key_var = api_key_var
        self._delegate: Optional[Auth] = None
        self._resolve()

    def _resolve(self) -> None:
        token = os.environ.get(self._token_var)
        if token:
            self._delegate = TokenAuth(token=token)
            return
        api_key = os.environ.get(self._api_key_var)
        if api_key:
            self._delegate = ApiKeyAuth(api_key=api_key)

    def get_auth_headers(self) -> Dict[str, str]:
        if self._delegate is None:
            raise EnvironmentError(
                f"No auth credentials found.  Set {self._token_var} or "
                f"{self._api_key_var} in the environment."
            )
        return self._delegate.get_auth_headers()

    def is_valid(self) -> bool:
        return self._delegate is not None and self._delegate.is_valid()

    def __repr__(self) -> str:
        kind = type(self._delegate).__name__ if self._delegate else "None"
        return f"EnvAuth(delegate={kind})"
