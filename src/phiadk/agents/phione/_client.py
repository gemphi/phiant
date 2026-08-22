"""PhiOne domain client.

Follows Palantir's ``_client.py`` pattern — a namespace client with
``@cached_property`` sub-clients for each topology space.
All sub-clients receive the ``data_resolver`` — strict data/code separation.
"""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiOneClient:
    """The PhiOne HR & Identity domain client.

    Provides access to employee, identity, leave, and org-structure
    topology spaces via lazily-initialised sub-clients.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    :param data_resolver: Callable(source, **kw) -> data.  Backed by phiora.
    """

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Employee(self):
        """Employee topology space — lookups, team reports, headcount."""
        from phiadk.agents.phione.employee import EmployeeClient
        return EmployeeClient(data_resolver=self._data_resolver)

    @cached_property
    def Identity(self):
        """Identity topology space — provisioning, groups, licenses."""
        from phiadk.agents.phione.identity import IdentityClient
        return IdentityClient(data_resolver=self._data_resolver)

    @cached_property
    def Leave(self):
        """Leave balance topology space — balance traversals."""
        from phiadk.agents.phione.leave import LeaveClient
        return LeaveClient(data_resolver=self._data_resolver)


class AsyncPhiOneClient:
    """Async variant of ``PhiOneClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Employee(self):
        from phiadk.agents.phione.employee import EmployeeClient
        return EmployeeClient(data_resolver=self._data_resolver)

    @cached_property
    def Identity(self):
        from phiadk.agents.phione.identity import IdentityClient
        return IdentityClient(data_resolver=self._data_resolver)

    @cached_property
    def Leave(self):
        from phiadk.agents.phione.leave import LeaveClient
        return LeaveClient(data_resolver=self._data_resolver)
