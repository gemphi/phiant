"""PhiDoc domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiDocClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Search(self):
        from phiadk.agents.phidoc.docs import SearchClient
        return SearchClient(data_resolver=self._data_resolver)

    @cached_property
    def Page(self):
        from phiadk.agents.phidoc.docs import PageClient
        return PageClient()

    @cached_property
    def Ontology(self):
        from phiadk.agents.phidoc.docs import OntologylogyExplorerClient
        return OntologylogyExplorerClient()

    @cached_property
    def Ontologylogy(self):
        return self.Ontology

    @cached_property
    def Topology(self):
        return self.Ontology



class AsyncPhiDocClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Search(self):
        from phiadk.agents.phidoc.docs import SearchClient
        return SearchClient(data_resolver=self._data_resolver)

    @cached_property
    def Page(self):
        from phiadk.agents.phidoc.docs import PageClient
        return PageClient()

    @cached_property
    def Ontologylogy(self):
        from phiadk.agents.phidoc.docs import OntologylogyExplorerClient
        return OntologylogyExplorerClient()
