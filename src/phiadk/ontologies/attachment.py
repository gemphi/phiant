"""Ontology Attachment Module."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class Attachment:
    attachment_rid: str
    filename: str
    size_bytes: int
    media_type: str = "application/octet-stream"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "attachment_rid": self.attachment_rid,
            "filename": self.filename,
            "size_bytes": self.size_bytes,
            "media_type": self.media_type,
        }


@dataclass
class AttachmentProperty:
    api_name: str
    display_name: str
    description: str = ""


class AttachmentClient:
    """Client for managing binary attachments in the Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def upload(self, filename: str, content: bytes) -> Attachment:
        return Attachment(
            attachment_rid=f"ri.attachments.main.{filename}",
            filename=filename,
            size_bytes=len(content),
        )

    def get(self, attachment_rid: str) -> Attachment:
        return Attachment(
            attachment_rid=attachment_rid,
            filename="file.bin",
            size_bytes=1024,
        )


class AsyncAttachmentClient(AttachmentClient):
    """Async variant of AttachmentClient."""
    pass


# Symmetrical P* aliases
PAttachment = Attachment
PAttachmentProperty = AttachmentProperty
PAttachmentClient = AttachmentClient
