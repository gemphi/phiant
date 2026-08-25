"""Ontology Interface Module - Polymorphic interfaces across Object Types."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class InterfaceProperty:
    """A shared property declared on an Ontology Interface."""
    api_name: str
    display_name: str
    data_type: str = "string"
    description: str = ""


@dataclass
class OntologyInterface:
    """A polymorphic ontology interface contract across multiple Object Types."""
    api_name: str
    display_name: str
    description: str = ""
    implemented_by: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "implemented_by": self.implemented_by,
        }


# Short alias
Interface = OntologyInterface


class InterfaceClient:
    """Client for managing shared polymorphic interfaces across object types."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, interface_name: str) -> Optional[OntologyInterface]:
        return OntologyInterface(
            api_name=interface_name,
            display_name=interface_name.replace("_", " ").title(),
            description=f"Polymorphic interface {interface_name}",
            implemented_by=["Employee", "UserIdentity"],
        )

    def list(self) -> List[OntologyInterface]:
        return [
            OntologyInterface("SearchableDocument", "Searchable Document", implemented_by=["DocumentPage"]),
            OntologyInterface("AuditableEntity", "Auditable Entity", implemented_by=["Employee", "GitCommit"]),
        ]


AsyncInterfaceClient = InterfaceClient
