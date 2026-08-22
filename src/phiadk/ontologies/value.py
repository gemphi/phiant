"""Ontology Value Module — Custom value types."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class ValueType:
    api_name: str
    display_name: str
    base_type: str = "string"
    constraints: Dict[str, Any] = None


# Short standard alias
PValueType = ValueType


class ValueTypeClient:
    """Client for custom value types in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, name: str) -> ValueType:
        return ValueType(api_name=name, display_name=name.replace("_", " ").title())

    def list(self) -> List[ValueType]:
        return [
            ValueType("EmailAddress", "Email Address", "string"),
            ValueType("CurrencyAmount", "Currency Amount", "float"),
        ]


# Symmetrical aliases
AsyncValueTypeClient = ValueTypeClient
PValueTypeClient = ValueTypeClient

