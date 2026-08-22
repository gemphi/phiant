"""Ontology Client — Master Ontologies namespace client matching Palantir SDK APIs."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from .engine import GLOBAL_ONTOLOGY, OntologyEngine


class OntologyClient:
    """Client for managing ontology namespaces and root schema queries."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

        # Subclients matching Palantir client.ontologies.Ontology.<SubClient>
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

    def get(self, ontology: Optional[str] = None) -> Dict[str, Any]:
        """Get the ontology definition."""
        return self._engine.to_dict()

    def list(self) -> List[Dict[str, Any]]:
        """List all ontologies."""
        return [{"api_name": "default", "rid": "ri.ontology.main.default", "display_name": "Default Ontology"}]

    def get_full_metadata(self, ontology: Optional[str] = None, branch: Optional[str] = None, preview: Optional[bool] = None) -> Dict[str, Any]:
        """Get full ontology metadata."""
        return self._engine.to_dict()

    def load_metadata(
        self,
        ontology: Optional[str] = None,
        action_types: Optional[List[str]] = None,
        interface_types: Optional[List[str]] = None,
        link_types: Optional[List[str]] = None,
        object_types: Optional[List[str]] = None,
        query_types: Optional[List[str]] = None,
        branch: Optional[str] = None,
        preview: Optional[bool] = None,
    ) -> Dict[str, Any]:
        """Load metadata for requested entities."""
        return self._engine.to_dict()

    def list_objects(self) -> List[str]:
        """List all object types in the ontology."""
        return list(self._engine.object_types.keys())


@dataclass
class POntologyType:
    """Standard definition and structural metadata for an Ontology."""
    api_name: str
    display_name: str
    description: str = ""
    rid: str = "ri.ontology.main.default"
    version: str = "1.0.0"
    object_types: Dict[str, Any] = field(default_factory=dict)
    link_types: Dict[str, Any] = field(default_factory=dict)
    action_types: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "rid": self.rid,
            "version": self.version,
            "object_types": self.object_types,
            "link_types": self.link_types,
            "action_types": self.action_types,
        }


# Short standard aliases
POntology = OntologyClient
POntologyClient = OntologyClient
POntologyTypeClient = OntologyClient
TopoClient = OntologyClient
PTopoClient = OntologyClient
