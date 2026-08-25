"""PhiCal domain client.

Follows Palantir's ``_client.py`` pattern - lazy sub-clients for
semantic search, circuit, and training topology spaces.
"""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiCalClient:
    """The PhiCal Quantum Learning domain client.

    Provides access to quantum-inspired semantic search, circuit
    simulation, and training topology spaces.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    """

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def SemanticSearch(self):
        """Quantum semantic search space - superposition-based retrieval."""
        from phiadk.agents.phical.semantic_search import SemanticSearchClient

        return SemanticSearchClient()

    @cached_property
    def Circuit(self):
        """Quantum circuit space - create, simulate, compose circuits."""
        from phiadk.agents.phical.circuit import CircuitClient

        return CircuitClient()

    @cached_property
    def Training(self):
        """Training morphism space - gradient-based model training."""
        from phiadk.agents.phical.training import TrainingClient

        return TrainingClient()


class AsyncPhiCalClient:
    """Async variant of ``PhiCalClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def SemanticSearch(self):
        from phiadk.agents.phical.semantic_search import SemanticSearchClient
        return SemanticSearchClient()

    @cached_property
    def Circuit(self):
        from phiadk.agents.phical.circuit import CircuitClient
        return CircuitClient()

    @cached_property
    def Training(self):
        from phiadk.agents.phical.training import TrainingClient
        return TrainingClient()
