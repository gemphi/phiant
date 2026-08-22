"""PhiRAG domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiRAGClient:
    """The PhiRAG knowledge retrieval domain client.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    :param data_resolver: Data resolver callable (backed by phiora).
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
    def Retrieval(self):
        """Knowledge retrieval — vector-store traversals."""
        from phiadk.agents.phirag.retrieval import RetrievalClient
        return RetrievalClient(data_resolver=self._data_resolver)

    @cached_property
    def Generation(self):
        """LLM-augmented generation — context→answer morphisms."""
        from phiadk.agents.phirag.retrieval import GenerationClient
        return GenerationClient()


class AsyncPhiRAGClient:
    """Async variant of ``PhiRAGClient``."""

    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Retrieval(self):
        from phiadk.agents.phirag.retrieval import RetrievalClient
        return RetrievalClient(data_resolver=self._data_resolver)

    @cached_property
    def Generation(self):
        from phiadk.agents.phirag.retrieval import GenerationClient
        return GenerationClient()


PhiRagClient = PhiRAGClient
AsyncPhiRagClient = AsyncPhiRAGClient

