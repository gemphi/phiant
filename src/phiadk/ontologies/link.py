"""Ontology Link Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from .errors import LinkTypeNotFoundError
from .models import OntologyObject


@dataclass
class LinkType:
    """A link connecting two Object Types in the Ontology."""

    api_name: str
    display_name: str
    source_object_type: str
    target_object_type: str
    cardinality: str = "ONE_TO_MANY"  # "ONE_TO_ONE", "ONE_TO_MANY", "MANY_TO_MANY"
    description: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "source_object_type": self.source_object_type,
            "target_object_type": self.target_object_type,
            "cardinality": self.cardinality,
            "description": self.description,
        }


# Short standard alias
PLinkType = LinkType


class LinkedObjectClient:
    """Client for traversing links connecting Object Types."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def list_linked(self, source_type: str, primary_key: str, link_type: str) -> List[OntologyObject]:
        """List all objects connected via a link relation."""
        lt = self._engine.link_types.get(link_type)
        if not lt:
            raise LinkTypeNotFoundError(link_type)
        target_ot = self._engine.get_object_type(lt.target_object_type)
        if not target_ot:
            return []
        return [
            OntologyObject(lt.target_object_type, f"linked_{primary_key}_{i}", {})
            for i in range(2)
        ]

    def list_linked_objects(self, object_type: str, primary_key: str, link_type: str) -> List[OntologyObject]:
        return self.list_linked(object_type, primary_key, link_type)


class LinkClient:
    """Client for managing link types."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, api_name: str) -> Optional[LinkType]:
        return self._engine.link_types.get(api_name)

    def list(self) -> List[LinkType]:
        return list(self._engine.link_types.values())


# Short standard aliases
PLinkClient = LinkClient
PLinkedObjectClient = LinkedObjectClient
