"""PhiEgg OQL (Object / Ontologylogy Query Language).

A fluent query builder for traversing topological spaces, traversing edges,
and collecting simplicial manifolds.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional

from phiegg._core.topology import Manifold, Morphism, Node, Space, Traversal


@dataclass
class OQLQuery:
    """Represents a compiled Object/Ontologylogy Query Language expression."""

    origin_id: str = ""
    edge_types: List[str] = field(default_factory=list)
    max_depth: int = 1
    node_filters: Dict[str, Any] = field(default_factory=dict)
    project_manifold: bool = False


class OQL:
    """Fluent query builder for Object / Ontologylogy Query Language."""

    def __init__(self, origin_id: str) -> None:
        self._query = OQLQuery(origin_id=origin_id)

    @classmethod
    def from_node(cls, node_id: str) -> "OQL":
        return cls(origin_id=node_id)

    def traverse(self, edge_type: str) -> "OQL":
        """Follow a specific edge type (e.g. 'manages', 'member_of', 'depends_on')."""
        self._query.edge_types.append(edge_type)
        return self

    def depth(self, hops: int) -> "OQL":
        """Set traversal depth / simplicial hop limit."""
        self._query.max_depth = hops
        return self

    def filter(self, **kwargs: Any) -> "OQL":
        """Add node property filters."""
        self._query.node_filters.update(kwargs)
        return self

    def collect_manifold(self) -> "OQL":
        """Project result into a continuous topological manifold chart."""
        self._query.project_manifold = True
        return self

    def execute(self, space: Optional[Space] = None) -> Traversal:
        """Execute the topological traversal query."""
        traversal = Traversal(
            origin=self._query.origin_id,
            filters={"edge_types": self._query.edge_types, "depth": self._query.max_depth},
        )
        if space:
            for node in space.nodes.values():
                match = all(node.properties.get(k) == v for k, v in self._query.node_filters.items())
                if match:
                    traversal.visit(node)
        return traversal
