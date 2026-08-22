"""Ontology Time & Temporal Series Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class TimeProperty:
    """A temporal series metric property."""
    api_name: str
    display_name: str
    description: str = ""


# Compatibility aliases
TimeSeriesProperty = TimeProperty
TimeSeriesPropertyV2 = TimeProperty
TimeSeriesValueBankProperty = TimeProperty


@dataclass
class TimeSeriesPoint:
    time: str
    value: float


class TimeSeriesClient:
    """Client for temporal metric curves in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get_points(self, series_id: str) -> List[Dict[str, Any]]:
        return [{"time": "2026-08-22T00:00:00Z", "value": 100.0}]


AsyncTimeSeriesClient = TimeSeriesClient
TimeClient = TimeSeriesClient
AsyncTimeClient = TimeSeriesClient
