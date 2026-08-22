"""Ontology Media Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class MediaProperty:
    """A media reference property in the Ontology."""
    api_name: str
    display_name: str
    description: str = ""


# Compatibility alias
MediaReferenceProperty = MediaProperty


@dataclass
class MediaReference:
    media_rid: str
    media_type: str = "image/png"
    url: str = ""


class MediaClient:
    """Client for media sets and streaming in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def get_media_url(self, media_id: str) -> str:
        return f"https://media.phient.internal/{media_id}"


AsyncMediaClient = MediaClient
