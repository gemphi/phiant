"""PhiGit domain models — Git-core content-addressable storage primitives.

Defines the immutable SHA-1 keyed objects:
    Blob   — raw content
    Tree   — collection of named entries (blobs/subtrees)
    Commit — snapshot of a tree with parent lineage, author, and version
    Ref    — named mutable pointer to a commit
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional

from phiegg._core.model_base import ModelBase
from phiegg._core.topology import Node, SimplexType


class ObjectType(str, Enum):
    """Git object type classification."""

    BLOB = "blob"
    TREE = "tree"
    COMMIT = "commit"
    TAG = "tag"


@dataclass
class Blob(Node, ModelBase):
    """An immutable content-addressed data blob."""

    _model_type: str = "blob"
    content: Any = None
    sha1: str = ""
    size_bytes: int = 0

    def __post_init__(self):
        self.node_type = "blob"
        self.simplex = SimplexType.POINT
        if not self.sha1:
            self.sha1 = self.compute_sha1(self.content)
        if isinstance(self.content, (str, bytes)):
            self.size_bytes = len(self.content)
        elif self.content is not None:
            self.size_bytes = len(json.dumps(self.content, default=str))

    @staticmethod
    def compute_sha1(content: Any) -> str:
        """Compute SHA-1 hash for arbitrary content."""
        if isinstance(content, bytes):
            raw = content
        elif isinstance(content, str):
            raw = content.encode("utf-8")
        else:
            raw = json.dumps(content, sort_keys=True, default=str).encode("utf-8")
        header = f"blob {len(raw)}\0".encode("utf-8")
        return hashlib.sha1(header + raw).hexdigest()

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "sha1": self.sha1,
            "size_bytes": self.size_bytes,
            "content": self.content,
        })
        return base


@dataclass
class TreeEntry(ModelBase):
    """An individual entry inside a Tree object."""

    mode: str = "100644"  # standard file
    type: ObjectType = ObjectType.BLOB
    name: str = ""
    sha1: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "mode": self.mode,
            "type": self.type.value if isinstance(self.type, ObjectType) else str(self.type),
            "name": self.name,
            "sha1": self.sha1,
        }


@dataclass
class Tree(Node, ModelBase):
    """A directory-like collection of named TreeEntries."""

    _model_type: str = "tree"
    entries: List[TreeEntry] = field(default_factory=list)
    sha1: str = ""

    def __post_init__(self):
        self.node_type = "tree"
        self.simplex = SimplexType.FACE
        if not self.sha1:
            self.sha1 = self.compute_sha1(self.entries)

    @staticmethod
    def compute_sha1(entries: List[TreeEntry]) -> str:
        sorted_entries = sorted(entries, key=lambda e: e.name)
        payload = "".join(f"{e.mode} {e.type.value} {e.sha1} {e.name}\n" for e in sorted_entries)
        header = f"tree {len(payload)}\0".encode("utf-8")
        return hashlib.sha1(header + payload.encode("utf-8")).hexdigest()

    def get_entry(self, name: str) -> Optional[TreeEntry]:
        for e in self.entries:
            if e.name == name:
                return e
        return None

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "sha1": self.sha1,
            "entries": [e.base_dict() | {"mode": e.mode, "type": e.type.value, "name": e.name, "sha1": e.sha1} for e in self.entries],
        })
        return base


@dataclass
class Commit(Node, ModelBase):
    """An immutable commit object recording state snapshot."""

    _model_type: str = "commit"
    tree_sha1: str = ""
    parent_sha1s: List[str] = field(default_factory=list)
    author: str = "system"
    agent_id: str = "phigit"
    version: str = "1.0.0"
    message: str = ""
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    sha1: str = ""

    def __post_init__(self):
        self.node_type = "commit"
        self.simplex = SimplexType.VOLUME
        if not self.sha1:
            self.sha1 = self.compute_sha1()

    def compute_sha1(self) -> str:
        body = {
            "tree": self.tree_sha1,
            "parents": self.parent_sha1s,
            "author": self.author,
            "agent_id": self.agent_id,
            "version": self.version,
            "message": self.message,
            "timestamp": self.timestamp.isoformat(),
        }
        raw = json.dumps(body, sort_keys=True).encode("utf-8")
        header = f"commit {len(raw)}\0".encode("utf-8")
        return hashlib.sha1(header + raw).hexdigest()

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "sha1": self.sha1,
            "tree_sha1": self.tree_sha1,
            "parent_sha1s": self.parent_sha1s,
            "author": self.author,
            "agent_id": self.agent_id,
            "version": self.version,
            "message": self.message,
            "timestamp": self.timestamp.isoformat(),
        })
        return base


@dataclass
class Ref(ModelBase):
    """A named mutable reference pointer to a commit hash."""

    name: str = "refs/heads/main"
    commit_sha1: str = ""


@dataclass
class DiffResult(ModelBase):
    """Delta between two trees or commits."""

    added: Dict[str, str] = field(default_factory=dict)       # name → sha1
    modified: Dict[str, tuple[str, str]] = field(default_factory=dict) # name → (old_sha1, new_sha1)
    deleted: Dict[str, str] = field(default_factory=dict)     # name → sha1
