"""Ontologies Domain Namespace Client (matching Palantir SDK client.ontologies / client.Ontology)."""

from __future__ import annotations

import typing
from .ontology import OntologyClient


class OntologiesClient:
    """Namespace client for accessing Ontologies on PhiEggClient."""

    def __init__(
        self,
        auth: typing.Optional[typing.Any] = None,
        hostname: typing.Optional[str] = None,
        config: typing.Optional[typing.Any] = None,
        engine: typing.Optional[typing.Any] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._engine = engine

        self.Ontology = OntologyClient(engine=self._engine)
        self.ontology = self.Ontology
        self.Topo = self.Ontology
        self.topo = self.Ontology

        # Expose subclients directly
        self.ObjectType = self.Ontology.ObjectType
        self.ActionType = self.Ontology.ActionType
        self.LinkType = self.Ontology.LinkType
        self.LinkedObject = self.Ontology.LinkedObject
        self.Object = self.Ontology.Object
        self.ObjectSet = self.Ontology.ObjectSet
        self.Action = self.Ontology.Action
        self.Interface = self.Ontology.Interface
        self.Query = self.Ontology.Query
        self.QueryType = self.Ontology.QueryType
        self.Transaction = self.Ontology.Transaction
        self.Scenario = self.Ontology.Scenario
        self.ValueType = self.Ontology.ValueType
        self.Attachment = self.Ontology.Attachment
        self.Cipher = self.Ontology.Cipher
        self.Geo = self.Ontology.Geo
        self.Media = self.Ontology.Media
        self.TimeSeries = self.Ontology.TimeSeries

    def __getattr__(self, name: str) -> typing.Any:
        return getattr(self.Ontology, name)

    def get(self, ontology: typing.Optional[str] = None) -> typing.Dict[str, typing.Any]:
        return self.Ontology.get(ontology)

    def list(self) -> typing.List[typing.Dict[str, typing.Any]]:
        return self.Ontology.list()



class AsyncOntologiesClient:
    """Async variant of OntologiesClient."""

    def __init__(
        self,
        auth: typing.Optional[typing.Any] = None,
        hostname: typing.Optional[str] = None,
        config: typing.Optional[typing.Any] = None,
        engine: typing.Optional[typing.Any] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._engine = engine
        self.Ontology = OntologyClient(engine=self._engine)
        self.ontology = self.Ontology
        self.Topo = self.Ontology
        self.topo = self.Ontology


# Backward and P* aliases
ToposClient = OntologiesClient
AsyncToposClient = AsyncOntologiesClient
POntologiesClient = OntologiesClient
PAsyncOntologiesClient = AsyncOntologiesClient
