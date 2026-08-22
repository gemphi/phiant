"""PhiLog domain client.

Provides access to Logging, Querying, and Auditing operations.
"""

from __future__ import annotations

import typing
from functools import cached_property
from typing import Any, Callable, Dict, List, Optional

from phiegg._core import auth as _auth
from phiegg._core.config import Config
from phiegg.philog.logger import StructuredLogger
from phiegg.philog.models import LogLevel


class LoggingClient:
    def __init__(self, logger: StructuredLogger) -> None:
        self._logger = logger

    def info(self, msg: str, **details: Any):
        return self._logger.info(msg, **details)

    def warn(self, msg: str, **details: Any):
        return self._logger.warn(msg, **details)

    def error(self, msg: str, **details: Any):
        return self._logger.error(msg, **details)

    def debug(self, msg: str, **details: Any):
        return self._logger.debug(msg, **details)

    def tail(self, n: int = 10):
        return self._logger.tail(n=n)

    def query(self, agent_id: Optional[str] = None, level: Optional[LogLevel] = None):
        return self._logger.query(agent_id=agent_id, level=level)

    def record_audit(self, action: str, agent_id: str, target: str, commit_sha1: str = ""):
        return self._logger.record_audit(action, agent_id=agent_id, target=target, commit_sha1=commit_sha1)


class PhiLogClient:
    """The PhiLog distributed telemetry domain client."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
        logger: typing.Optional[StructuredLogger] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver
        self._logger = logger or StructuredLogger()

    @cached_property
    def Telemetry(self) -> LoggingClient:
        return LoggingClient(self._logger)


class AsyncPhiLogClient:
    """Async variant of ``PhiLogClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
        logger: typing.Optional[StructuredLogger] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver
        self._logger = logger or StructuredLogger()

    @cached_property
    def Telemetry(self) -> LoggingClient:
        return LoggingClient(self._logger)
