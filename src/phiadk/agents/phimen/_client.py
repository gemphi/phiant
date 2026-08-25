"""PhiMen domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiMenClient:
    """The PhiMen virtual CEO domain client.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    :param domain_clients: Dict of domain client instances for delegation.
    """

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        domain_clients: typing.Optional[typing.Dict[str, typing.Any]] = None,
        data_resolver=None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._domain_clients = domain_clients or {}
        self._data_resolver = data_resolver

    @cached_property
    def Executive(self):
        """The executive agent - envision→apply→eval→iterate lifecycle."""
        from phiadk.agents.phimen.executive import ExecutiveAgent
        return ExecutiveAgent(domain_clients=self._domain_clients, data_resolver=self._data_resolver)

    @cached_property
    def Strategy(self):
        """Strategic operations - high-level convenience methods."""
        from phiadk.agents.phimen.executive import StrategyClient
        return StrategyClient(executive=self.Executive)


class AsyncPhiMenClient:
    """Async variant of ``PhiMenClient``."""

    def __init__(self, auth: _auth.Auth, hostname="", config=None,
                 domain_clients=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._domain_clients = domain_clients or {}
        self._data_resolver = data_resolver

    @cached_property
    def Executive(self):
        from phiadk.agents.phimen.executive import ExecutiveAgent
        return ExecutiveAgent(domain_clients=self._domain_clients, data_resolver=self._data_resolver)

    @cached_property
    def Strategy(self):
        from phiadk.agents.phimen.executive import StrategyClient
        return StrategyClient(executive=self.Executive)
