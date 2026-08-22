"""Ontology Geotemporal Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class GeotemporalSeriesProperty:
    api_name: str
    display_name: str
    description: str = ""


class GeotemporalClient:
    """Client for spatio-temporal series in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get_points(self, entity_id: str) -> List[Dict[str, Any]]:
        return [{"lat": -1.2921, "lng": 36.8219, "timestamp": "2026-08-22T00:00:00Z"}]
