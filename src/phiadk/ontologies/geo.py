"""Ontology Geo & Spatial Properties Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class GeoProperty:
    """A geospatial or geotemporal series property."""
    api_name: str
    display_name: str
    description: str = ""


# Compatibility alias
GeotemporalSeriesProperty = GeoProperty


@dataclass
class GeoPoint:
    latitude: float
    longitude: float
    altitude: Optional[float] = None


@dataclass
class GeoShape:
    shape_type: str
    coordinates: List[Any]


class GeoClient:
    """Client for spatio-temporal properties and series in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get_points(self, entity_id: str) -> List[Dict[str, Any]]:
        return [{"lat": -1.2921, "lng": 36.8219, "timestamp": "2026-08-22T00:00:00Z"}]


AsyncGeoClient = GeoClient
GeotemporalClient = GeoClient
AsyncGeotemporalClient = GeoClient
