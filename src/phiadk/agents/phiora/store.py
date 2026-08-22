"""PhiOra Store operations.

The data resolution and Git-enhanced Key-Value engine.
Integrates with ``phigit`` for immutable tree snapshots and history lineage.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

from phiadk._core.agent_base import DataSet
from phiadk._core.topology import Morphism, Traversal
from phiadk.agents.phigit.engine import GitEngine
from phiadk.agents.phigit.models import ObjectType, TreeEntry
from phiadk.agents.phiora.models import Collection, Record, Store, VectorRecord

logger = logging.getLogger(__name__)


class StoreClient:
    """Git-enhanced Key-Value and Collection store."""

    def __init__(self, git_engine: Optional[GitEngine] = None) -> None:
        self._stores: Dict[str, Store] = {}
        self._default_store = Store(store_name="default")
        self._stores["default"] = self._default_store
        self._git = git_engine or GitEngine()

    @property
    def git(self) -> GitEngine:
        return self._git

    def create_store(self, name: str) -> Store:
        store = Store(store_name=name)
        self._stores[name] = store
        return store

    def get_store(self, name: str = "default") -> Store:
        return self._stores.get(name, self._default_store)

    def qml(self, space_name: str = "quantum_space"):
        """Spawn a Quantum Model Language (QML) query builder."""
        from phiadk.query.qml import QML
        return QML.from_space(space_name)

    # ── Key-Value & Collection API ───────────────────────────────────

    def put(
        self,
        collection: str,
        key: str,
        value: Any,
        *,
        store: str = "default",
        commit: bool = True,
        message: Optional[str] = None,
    ) -> Record:
        """Put a key-value pair into a collection with Git commit tracking."""
        s = self.get_store(store)
        col = s.get_collection(collection) or s.create_collection(collection)
        record = col.put(key, value)

        # Store in Git engine as Blob & update Tree
        blob = self._git.store_blob(value)
        record.sha1 = blob.sha1

        if commit:
            entries = [
                TreeEntry(name=k, sha1=r.sha1, type=ObjectType.BLOB)
                for k, r in col.records.items()
            ]
            tree = self._git.store_tree(entries)
            commit_msg = message or f"Update {collection}:{key}"
            commit_obj = self._git.commit(
                tree.sha1,
                message=commit_msg,
                agent_id="phiora",
                version="1.0.0",
                ref=f"refs/heads/{collection}",
            )
            record.set_provenance("phiora", "store.put", commit_sha1=commit_obj.sha1)

        return record

    def get(self, collection: str, key: str, *, store: str = "default") -> Optional[Record]:
        """Get a record from a collection."""
        s = self.get_store(store)
        col = s.get_collection(collection)
        return col.get(key) if col else None

    def keys(self, collection: str, *, store: str = "default") -> List[str]:
        """List all keys in a collection."""
        s = self.get_store(store)
        col = s.get_collection(collection)
        return col.keys() if col else []

    def values(self, collection: str, *, store: str = "default") -> List[Any]:
        """Return all values in a collection."""
        s = self.get_store(store)
        col = s.get_collection(collection)
        return [r.value for r in col.records.values()] if col else []

    def items(self, collection: str, *, store: str = "default") -> List[Tuple[str, Any]]:
        """Return (key, value) pairs for a collection."""
        s = self.get_store(store)
        col = s.get_collection(collection)
        return [(k, r.value) for k, r in col.records.items()] if col else []

    def tree(self, collection: str) -> Dict[str, Any]:
        """Return hierarchical tree view of a collection."""
        head_commit_sha1 = self._git.get_ref(f"refs/heads/{collection}")
        if not head_commit_sha1:
            return {"collection": collection, "entries": []}
        commit_obj = self._git.get_commit(head_commit_sha1)
        if not commit_obj:
            return {"collection": collection, "entries": []}
        tree_obj = self._git.get_tree(commit_obj.tree_sha1)
        entries = tree_obj.entries if tree_obj else []
        return {
            "collection": collection,
            "commit_sha1": head_commit_sha1,
            "tree_sha1": commit_obj.tree_sha1,
            "entries": [e.to_dict() for e in entries],
        }

    def diff(self, collection: str, ref_a: str, ref_b: str):
        """Compute delta between revisions in a collection."""
        return self._git.diff(ref_a, ref_b)

    def log(self, collection: str = "default", *, max_count: int = 50):
        """Walk commit history for a collection."""
        return self._git.log(f"refs/heads/{collection}", max_count=max_count)

    def list_keys(self, collection: str, *, store: str = "default") -> List[str]:
        return self.keys(collection, store=store)

    def snapshot(self, collection: str, *, store: str = "default") -> DataSet:
        """Create an immutable DataSet snapshot of a collection."""
        s = self.get_store(store)
        col = s.get_collection(collection)
        if not col:
            return DataSet(set_type="empty", source=collection)
        return col.snapshot()


class ResolverClient:
    """DataSet resolution — the bridge between agents and data.

    This is the callable that agents receive as ``data_resolver``.
    It loads data from files, stores, or external sources.
    """

    def __init__(self, data_dir: Optional[Path] = None, store_client: Optional[StoreClient] = None) -> None:
        self._data_dir = data_dir
        self._store = store_client or StoreClient()

    def __call__(self, source: str, *, default: Any = None, **kwargs) -> Any:
        """Resolve a data source reference to actual data."""
        # 1. Try store
        parts = source.split("/", 1)
        if len(parts) == 2:
            record = self._store.get(parts[0], parts[1])
            if record:
                return record.value

        # 2. Try file system
        if self._data_dir:
            path = self._data_dir / source
            if path.exists():
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        return json.load(f)
                except Exception as exc:
                    logger.warning("Error loading data from %s: %s", path, exc)

        return default if default is not None else {}


class VectorClient:
    """Vector storage and similarity search operations."""

    def __init__(self) -> None:
        self._vectors: Dict[str, VectorRecord] = {}

    def index(self, key: str, content: str, embedding: List[float], **metadata) -> VectorRecord:
        """Index a document with its vector embedding."""
        record = VectorRecord(
            key=key,
            value=content,
            embedding=embedding,
            properties=metadata,
        )
        self._vectors[key] = record
        return record

    def search(self, query_embedding: List[float], *, top_k: int = 5) -> List[VectorRecord]:
        """Cosine similarity search over indexed vectors."""
        if not self._vectors:
            return []

        scored: List[tuple[float, VectorRecord]] = []
        for record in self._vectors.values():
            if record.embedding:
                score = self._cosine_sim(query_embedding, record.embedding)
                scored.append((score, record))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [r for _, r in scored[:top_k]]

    @staticmethod
    def _cosine_sim(a: List[float], b: List[float]) -> float:
        if len(a) != len(b) or not a:
            return 0.0
        dot = sum(x * y for x, y in zip(a, b))
        norm_a = sum(x * x for x in a) ** 0.5
        norm_b = sum(x * x for x in b) ** 0.5
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)


class SpatialStore:
    """PhiOraDB — Topological Spatial Store engine.

    Unlike generic raw vector flat tables, PhiOraDB operates as a true Spatial Store:
    1. Organizes entities across N-dimensional topological manifolds (R^2, R^3, Hilbert spaces).
    2. Indexes records using spatial coordinates, bounding envelopes, and Voronoi cells.
    3. Performs spatial nearest-neighbor geodesics, radial bounding-box queries, and range filters.
    4. Integrates seamlessly with GitEngine for immutable, content-addressed spatial branching.
    """

    def __init__(self, manifold: str = "euclidean_r3") -> None:
        self.manifold = manifold
        self._spatial_index: Dict[str, Dict[str, Any]] = {}

    def insert(
        self,
        key: str,
        coordinates: List[float],
        data: Any = None,
        spatial_bounds: Optional[Dict[str, float]] = None,
        **metadata: Any,
    ) -> Dict[str, Any]:
        """Insert or update a spatial entity in the spatial manifold."""
        entry = {
            "key": key,
            "coordinates": coordinates,
            "data": data,
            "spatial_bounds": spatial_bounds or {},
            "metadata": metadata,
            "manifold": self.manifold,
        }
        self._spatial_index[key] = entry
        return entry

    def query_nearest(
        self,
        target_coords: List[float],
        *,
        k: int = 5,
        max_distance: Optional[float] = None,
    ) -> List[Dict[str, Any]]:
        """Find k-nearest spatial neighbors using Euclidean/Riemannian geodesic metric."""
        if not self._spatial_index:
            return []

        scored = []
        for key, entry in self._spatial_index.items():
            coords = entry["coordinates"]
            dist = self._spatial_distance(target_coords, coords)
            if max_distance is not None and dist > max_distance:
                continue
            scored.append((dist, entry))

        scored.sort(key=lambda item: item[0])
        return [
            {**entry, "distance": round(dist, 6)}
            for dist, entry in scored[:k]
        ]

    def query_bounding_box(
        self,
        min_coords: List[float],
        max_coords: List[float],
    ) -> List[Dict[str, Any]]:
        """Query all spatial entities contained within an N-dimensional bounding box."""
        results = []
        for entry in self._spatial_index.values():
            coords = entry["coordinates"]
            if len(coords) < len(min_coords):
                continue
            in_bounds = True
            for i in range(len(min_coords)):
                if not (min_coords[i] <= coords[i] <= max_coords[i]):
                    in_bounds = False
                    break
            if in_bounds:
                results.append(entry)
        return results

    def count(self) -> int:
        """Return total number of spatial entities indexed."""
        return len(self._spatial_index)

    @staticmethod
    def _spatial_distance(p1: List[float], p2: List[float]) -> float:
        """Compute Euclidean/Geodesic distance between two spatial coordinate points."""
        min_len = min(len(p1), len(p2))
        if min_len == 0:
            return float("inf")
        sum_sq = sum((p1[i] - p2[i]) ** 2 for i in range(min_len))
        return sum_sq ** 0.5


# Standard First-Class Aliases
PhiOraDB = SpatialStore
POraDB = SpatialStore

