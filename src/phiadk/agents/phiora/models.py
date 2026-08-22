"""PhiOra domain models — topology types for the data layer.

Models the data storage hierarchy as a topology:
    Store (Space) → Collection (Space) → Record (Node)

Records are content-addressed (SHA-1 hash like git objects) and
versioned.  DataSets are immutable snapshots of collections.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from phiadk._core.topology import Edge, Node, SimplexType, Space
from phiadk._core.model_base import ModelBase
from phiadk._core.agent_base import DataSet


# ── Record — content-addressed node ──────────────────────────────────

@dataclass
class Record(Node, ModelBase):
    """A content-addressed data record — git-style SHA-1 keyed.

    Records are immutable.  Updating a record creates a new version
    with a new SHA-1 hash, preserving the full history.
    """

    _model_type: str = "record"
    key: str = ""
    value: Any = None
    sha1: str = ""
    version: int = 1
    parent_sha1: str = ""  # Previous version's hash

    def __post_init__(self):
        self.node_type = "record"
        self.simplex = SimplexType.POINT
        if self.value is not None and not self.sha1:
            self.sha1 = self._compute_sha1()

    def _compute_sha1(self) -> str:
        """Content-address: SHA-1 of the serialised value."""
        raw = json.dumps({"key": self.key, "value": self.value, "version": self.version},
                         sort_keys=True, default=str)
        return hashlib.sha1(raw.encode()).hexdigest()

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "key": self.key,
            "value": self.value,
            "sha1": self.sha1,
            "version": self.version,
            "parent_sha1": self.parent_sha1,
        })
        return base


# ── Collection — a named space of records ────────────────────────────

@dataclass
class Collection(Space):
    """A named collection of records — analogous to a git tree object."""

    collection_name: str = ""
    records: Dict[str, Record] = field(default_factory=dict)  # key → Record

    def __post_init__(self):
        self.space_type = "collection"

    def put(self, key: str, value: Any) -> Record:
        """Insert or update a key-value pair.  Returns the new record.

        Previous versions are preserved via ``parent_sha1`` linkage.
        """
        old = self.records.get(key)
        new_version = (old.version + 1) if old else 1
        parent = old.sha1 if old else ""

        record = Record(
            key=key,
            value=value,
            version=new_version,
            parent_sha1=parent,
        )
        self.records[key] = record
        return record

    def get(self, key: str) -> Optional[Record]:
        """Get the latest version of a record by key."""
        return self.records.get(key)

    def keys(self) -> List[str]:
        return list(self.records.keys())

    def snapshot(self) -> DataSet:
        """Create an immutable DataSet snapshot of this collection."""
        return DataSet(
            set_type="snapshot",
            source=self.collection_name,
            schema={"keys": self.keys(), "record_count": len(self.records)},
        )


# ── VectorRecord — record with embedding ─────────────────────────────

@dataclass
class VectorRecord(Record):
    """A record with a vector embedding for similarity search."""

    _model_type: str = "vector_record"
    embedding: List[float] = field(default_factory=list)
    embedding_model: str = ""

    def __post_init__(self):
        super().__post_init__()
        self.node_type = "vector_record"


# ── Store — the root data space ──────────────────────────────────────

@dataclass
class Store(Space):
    """The root data store — a topology space containing collections."""

    store_name: str = ""
    collections: Dict[str, Collection] = field(default_factory=dict)

    def __post_init__(self):
        self.space_type = "store"

    def create_collection(self, name: str) -> Collection:
        """Create a named collection in this store."""
        collection = Collection(collection_name=name)
        self.collections[name] = collection
        return collection

    def get_collection(self, name: str) -> Optional[Collection]:
        return self.collections.get(name)

    def list_collections(self) -> List[str]:
        return list(self.collections.keys())
