"""PhiOra domain client.

The data layer client - provides access to Store (KV), Resolver
(DataSet resolution), and Vector (embedding search) sub-clients.
"""

from __future__ import annotations

import typing
from functools import cached_property
from pathlib import Path

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiOraClient:
    """The PhiOra data layer domain client.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    :param data_dir: Path to the data directory for file-based resolution.
    """

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_dir: typing.Optional[Path] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_dir = data_dir

    @cached_property
    def Store(self):
        """Key-value store - content-addressed records in collections."""
        from phiadk.agents.phiora.store import StoreClient
        return StoreClient()

    @cached_property
    def Resolver(self):
        """DataSet resolver - the callable all agents use for data I/O."""
        from phiadk.agents.phiora.store import ResolverClient
        return ResolverClient(data_dir=self._data_dir, store_client=self.Store)

    @cached_property
    def Vector(self):
        """Vector storage - embedding index and similarity search."""
        from phiadk.agents.phiora.store import VectorClient
        return VectorClient()


class AsyncPhiOraClient:
    """Async variant of ``PhiOraClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_dir: typing.Optional[Path] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_dir = data_dir

    @cached_property
    def Store(self):
        from phiadk.agents.phiora.store import StoreClient
        return StoreClient()

    @cached_property
    def Resolver(self):
        from phiadk.agents.phiora.store import ResolverClient
        return ResolverClient(data_dir=self._data_dir, store_client=self.Store)

    @cached_property
    def Vector(self):
        from phiadk.agents.phiora.store import VectorClient
        return VectorClient()
