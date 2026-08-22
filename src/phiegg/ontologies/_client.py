"""Ontology Domain Client (Singular Class Names avoiding plural OntologiesClient)."""

from __future__ import annotations

import typing
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


class OntologyClient:
    """Singular client for accessing the Ontology on PhiEggClient (client.ontology / client.ontologies)."""

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
        self._engine = engine or GLOBAL_ONTOLOGY

        # Subclients matching Palantir client.ontology.Ontology.<SubClient>
        from .action import ActionClient, ActionTypeClient
        from .attachment import AttachmentClient
        from .cipher import CipherClient
        from .geo import GeotemporalClient
        from .interface import InterfaceClient
        from .link import LinkClient, LinkedObjectClient
        from .media import MediaClient
        from .object import ObjectClient, ObjectSetClient, ObjectTypeClient
        from .query import QueryClient, QueryTypeClient
        from .scenario import ScenarioClient
        from .timeseries import TimeSeriesClient
        from .transaction import TransactionClient
        from .value import ValueTypeClient

        self.ObjectType = ObjectTypeClient(self._engine)
        self.ActionType = ActionTypeClient(self._engine)
        self.LinkType = LinkClient(self._engine)
        self.LinkedObject = LinkedObjectClient(self._engine)
        self.Object = ObjectClient(self._engine)
        self.ObjectSet = ObjectSetClient(self._engine)
        self.Action = ActionClient(self._engine)
        self.Interface = InterfaceClient(self._engine)
        self.Query = QueryClient(self._engine)
        self.QueryType = QueryTypeClient(self._engine)
        self.Transaction = TransactionClient(self._engine)
        self.Scenario = ScenarioClient(self._engine)
        self.ValueType = ValueTypeClient(self._engine)
        self.Attachment = AttachmentClient(self._engine)
        self.Cipher = CipherClient(self._engine)
        self.Geo = GeotemporalClient(self._engine)
        self.Media = MediaClient(self._engine)
        self.TimeSeries = TimeSeriesClient(self._engine)

        self.Ontology = self
        self.ontology = self
        self.Topo = self
        self.topo = self

    def get(self, ontology: typing.Optional[str] = None) -> typing.Dict[str, typing.Any]:
        return self._engine.to_dict()

    def list(self) -> typing.List[typing.Dict[str, typing.Any]]:
        return [{"api_name": "default", "rid": "ri.ontology.main.default", "display_name": "Default Ontology"}]

    def get_full_metadata(self, ontology: typing.Optional[str] = None, branch: typing.Optional[str] = None, preview: typing.Optional[bool] = None) -> typing.Dict[str, typing.Any]:
        return self._engine.to_dict()

    def load_metadata(
        self,
        ontology: typing.Optional[str] = None,
        action_types: typing.Optional[typing.List[str]] = None,
        interface_types: typing.Optional[typing.List[str]] = None,
        link_types: typing.Optional[typing.List[str]] = None,
        object_types: typing.Optional[typing.List[str]] = None,
        query_types: typing.Optional[typing.List[str]] = None,
        branch: typing.Optional[str] = None,
        preview: typing.Optional[bool] = None,
    ) -> typing.Dict[str, typing.Any]:
        return self._engine.to_dict()

    def list_objects(self) -> typing.List[str]:
        return list(self._engine.object_types.keys())


class AsyncOntologyClient:
    """Async singular variant of OntologyClient."""

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
        self._engine = engine or GLOBAL_ONTOLOGY
        self._sync_client = OntologyClient(auth=auth, hostname=hostname, config=config, engine=self._engine)
        self.Ontology = self._sync_client
        self.ontology = self._sync_client
        self.Topo = self._sync_client
        self.topo = self._sync_client

    def __getattr__(self, name: str) -> typing.Any:
        return getattr(self._sync_client, name)


# Standard P* and Singular Aliases
POntologyClient = OntologyClient
PAsyncOntologyClient = AsyncOntologyClient
POntology = OntologyClient
POntologiesClient = OntologyClient
PAsyncOntologiesClient = AsyncOntologyClient
OntologiesClient = OntologyClient
AsyncOntologiesClient = AsyncOntologyClient
ToposClient = OntologyClient
AsyncToposClient = AsyncOntologyClient
TopoClient = OntologyClient
PTopoClient = OntologyClient
