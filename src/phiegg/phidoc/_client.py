"""PhiDoc domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiegg._core import auth as _auth
from phiegg._core.config import Config


class PhiDocClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Search(self):
        from phiegg.phidoc.docs import SearchClient
        return SearchClient(data_resolver=self._data_resolver)

    @cached_property
    def Page(self):
        from phiegg.phidoc.docs import PageClient
        return PageClient()

    @cached_property
    def Ontologylogy(self):
        from phiegg.phidoc.docs import OntologylogyExplorerClient
        return OntologylogyExplorerClient()


class AsyncPhiDocClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Search(self):
        from phiegg.phidoc.docs import SearchClient
        return SearchClient(data_resolver=self._data_resolver)

    @cached_property
    def Page(self):
        from phiegg.phidoc.docs import PageClient
        return PageClient()

    @cached_property
    def Ontologylogy(self):
        from phiegg.phidoc.docs import OntologylogyExplorerClient
        return OntologylogyExplorerClient()
