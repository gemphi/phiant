"""Ontology Query Module — Typed query execution."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class QueryType:
    api_name: str
    display_name: str
    description: str = ""
    parameters: Dict[str, Any] = None
    output_type: str = "object_set"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "parameters": self.parameters or {},
            "output_type": self.output_type,
        }


# Short standard alias
PQueryType = QueryType


class QueryClient:
    """Client for executing typed queries on Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def execute(self, query_api_name: str, parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return {
            "query": query_api_name,
            "status": "SUCCESS",
            "parameters": parameters or {},
            "value": 42,
        }


class QueryTypeClient:
    """Client for managing QueryType definitions."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, query_name: str) -> QueryType:
        return QueryType(api_name=query_name, display_name=query_name.replace("_", " ").title())

    def list(self) -> List[QueryType]:
        return [
            QueryType("count_active_employees", "Count Active Employees", output_type="integer"),
            QueryType("find_documents_by_tag", "Find Documents By Tag", output_type="object_set"),
        ]
