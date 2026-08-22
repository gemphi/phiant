"""Ontology TimeSeries Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class TimeSeriesProperty:
    api_name: str
    display_name: str
    description: str = ""


@dataclass
class TimeSeriesPropertyV2:
    api_name: str
    display_name: str
    description: str = ""


@dataclass
class TimeSeriesValueBankProperty:
    api_name: str
    display_name: str
    description: str = ""


class TimeSeriesClient:
    """Client for temporal metric curves in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get_points(self, series_id: str) -> List[Dict[str, Any]]:
        return [{"time": "2026-08-22T00:00:00Z", "value": 100.0}]
