"""Ontology Interface Module — Polymorphic interfaces across Object Types."""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from .engine import GLOBAL_ONTOLOGY, OntologyEngine
from .models import OntologyInterface, POntologyInterface


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


# Backward compatibility and P* aliases
OntologyInterfaceClient = InterfaceClient
ToposInterfaceClient = InterfaceClient
POntologyInterfaceClient = InterfaceClient
ToposInterface = OntologyInterface

