"""PhiEgg Ontologylogy Primitives.

Foundational abstractions for the PhiEgg SDK that replace traditional
ontology jargon with topology-based AI concepts.  Every domain agent's
models descend from these primitives.

Conceptual mapping:
    Palantir Ontology  →  PhiEgg Ontologylogy
    ─────────────────     ────────────────
    Ontology           →  Ontologylogy        (connected space of domain objects)
    OntologyObject     →  Node            (discrete point/entity)
    ObjectSet          →  Space           (connected subspace)
    ObjectType         →  SimplexType     (node classification)
    Action             →  Morphism        (structure-preserving transform)
    LinkedObject       →  Edge            (direct connection)
    Query              →  Traversal       (path-finding)
    Transaction        →  Fiber           (mutation bundle over a base space)
    Interface          →  Manifold        (smooth local view)
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, Generic, List, Optional, TypeVar

T = TypeVar("T")


# ──────────────────────────────────────────────────────────────────────
# Simplex Type — classification of nodes
# ──────────────────────────────────────────────────────────────────────

class SimplexType(str, Enum):
    """Classification of node dimensionality within a topology.

    In TDA a 0-simplex is a point, a 1-simplex is an edge, a 2-simplex
    is a triangle, etc.  Here we use the concept to classify domain
    entity complexity.
    """

    POINT = "0-simplex"       # Atomic entity (e.g. a single employee record)
    EDGE = "1-simplex"        # Binary relationship (e.g. manager→report)
    FACE = "2-simplex"        # Ternary composite (e.g. team)
    VOLUME = "3-simplex"      # Higher-order aggregate (e.g. department)
    HYPEREDGE = "n-simplex"   # Arbitrary multi-way relationship


# ──────────────────────────────────────────────────────────────────────
# Node — the fundamental entity in any topology
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Node:
    """A discrete point in the topology — the atomic domain entity.

    Every employee, document, circuit, or playbook is a ``Node`` at its
    core.  Nodes carry typed properties and can participate in ``Edge``
    connections and ``Space`` memberships.

    :param node_id: Unique identifier.
    :param node_type: Domain-specific type label (e.g. ``employee``, ``document``).
    :param simplex: The simplex classification of this node.
    :param properties: Arbitrary key-value data.
    :param created_at: Timestamp of creation.
    """

    node_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    node_type: str = ""
    simplex: SimplexType = SimplexType.POINT
    version_idx: str = "v1.0.0"
    properties: Dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    metadata: Dict[str, Any] = field(default_factory=dict)

    @property
    def idx(self) -> str:
        """Universal identifier index."""
        return self.node_id

    @idx.setter
    def idx(self, value: str) -> None:
        self.node_id = value

    def to_dict(self) -> Dict[str, Any]:
        result = {
            "idx": self.idx,
            "node_id": self.node_id,
            "node_type": self.node_type,
            "simplex": self.simplex.value if hasattr(self.simplex, "value") else str(self.simplex),
            "version_idx": self.version_idx,
            "properties": dict(self.properties),
            "created_at": self.created_at.isoformat() if hasattr(self.created_at, "isoformat") else str(self.created_at),
            "metadata": dict(self.metadata),
        }
        for k, v in self.__dict__.items():
            if k not in result and not k.startswith("_"):
                if hasattr(v, "isoformat"):
                    result[k] = v.isoformat()
                elif hasattr(v, "value"):
                    result[k] = v.value
                elif isinstance(v, complex):
                    result[k] = {"real": v.real, "imag": v.imag}
                elif isinstance(v, list):
                    result[k] = [item.to_dict() if hasattr(item, "to_dict") else item for item in v]
                elif hasattr(v, "to_dict"):
                    result[k] = v.to_dict()
                else:
                    result[k] = v
        return result

    def __repr__(self) -> str:
        return f"Node(id={self.node_id!r}, type={self.node_type!r}, simplex={self.simplex.value})"


# ──────────────────────────────────────────────────────────────────────
# Edge — direct connection between two nodes
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Edge:
    """A 1-simplex connecting two nodes in the topology.

    Edges are typed and optionally weighted.  They model relationships
    like ``manages``, ``depends_on``, ``links_to``.

    :param source_id: Origin node ID.
    :param target_id: Destination node ID.
    :param edge_type: Relationship label.
    :param weight: Strength / confidence of the connection.
    :param properties: Additional edge attributes.
    """

    source_id: str = ""
    target_id: str = ""
    edge_type: str = ""
    weight: float = 1.0
    properties: Dict[str, Any] = field(default_factory=dict)
    edge_id: str = field(default_factory=lambda: str(uuid.uuid4()))

    def to_dict(self) -> Dict[str, Any]:
        return {
            "edge_id": self.edge_id,
            "source_id": self.source_id,
            "target_id": self.target_id,
            "edge_type": self.edge_type,
            "weight": self.weight,
            "properties": self.properties,
        }


# ──────────────────────────────────────────────────────────────────────
# Space — a connected subspace (collection of nodes)
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Space:
    """A connected subspace — a collection of ``Node`` objects that share
    a topological neighbourhood.

    Analogous to Palantir's ``ObjectSet`` but framed as a topological
    subspace with optional boundary information.

    :param space_id: Unique identifier for this space.
    :param space_type: Domain-specific label (e.g. ``department``, ``knowledge_base``).
    :param nodes: Members of this space.
    :param edges: Internal connections within this space.
    :param dimension: The maximum simplex dimension in this space.
    """

    space_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    space_type: str = ""
    nodes: List[Node] = field(default_factory=list)
    edges: List[Edge] = field(default_factory=list)
    dimension: int = 0
    properties: Dict[str, Any] = field(default_factory=dict)

    @property
    def size(self) -> int:
        """Number of nodes in this space."""
        return len(self.nodes)

    @property
    def connectivity(self) -> float:
        """Edge-to-node ratio — a simple density measure."""
        if not self.nodes:
            return 0.0
        return len(self.edges) / len(self.nodes)

    def add_node(self, node: Node) -> None:
        self.nodes.append(node)

    def add_edge(self, edge: Edge) -> None:
        self.edges.append(edge)
        # Promote dimension if this edge connects higher-order simplices
        self.dimension = max(self.dimension, 1)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "space_id": self.space_id,
            "space_type": self.space_type,
            "size": self.size,
            "dimension": self.dimension,
            "connectivity": round(self.connectivity, 3),
            "properties": self.properties,
        }


# ──────────────────────────────────────────────────────────────────────
# Morphism — structure-preserving transformation between spaces
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Morphism:
    """A structure-preserving transformation between topological spaces.

    Analogous to Palantir's ``Action`` — a morphism maps nodes from a
    source space into a target space while preserving edge structure.
    In practice this models operations like ``provision_identity``,
    ``create_document``, ``execute_playbook``.

    :param morphism_id: Unique identifier.
    :param morphism_type: The kind of transformation (e.g. ``provision``, ``create``).
    :param source_space: Origin space type.
    :param target_space: Destination space type.
    :param parameters: Input parameters for the transformation.
    :param result: Output of the transformation.
    :param status: Current execution status.
    """

    morphism_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    morphism_type: str = ""
    source_space: str = ""
    target_space: str = ""
    parameters: Dict[str, Any] = field(default_factory=dict)
    result: Optional[Dict[str, Any]] = None
    status: str = "pending"  # pending | executing | completed | failed
    executed_at: Optional[datetime] = None

    def complete(self, result: Dict[str, Any]) -> None:
        """Mark the morphism as completed."""
        self.result = result
        self.status = "completed"
        self.executed_at = datetime.now(timezone.utc)

    def fail(self, error: str) -> None:
        """Mark the morphism as failed."""
        self.result = {"error": error}
        self.status = "failed"
        self.executed_at = datetime.now(timezone.utc)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "morphism_id": self.morphism_id,
            "morphism_type": self.morphism_type,
            "source_space": self.source_space,
            "target_space": self.target_space,
            "parameters": self.parameters,
            "result": self.result,
            "status": self.status,
            "executed_at": self.executed_at.isoformat() if self.executed_at else None,
        }


# ──────────────────────────────────────────────────────────────────────
# Traversal — path-finding through the topology
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Traversal:
    """A directed path through the topology — the query primitive.

    Analogous to Palantir's ``Query`` — a traversal starts from a seed
    node or space and follows edges according to filter criteria,
    collecting visited nodes along the way.

    :param traversal_id: Unique identifier.
    :param origin: Starting point (node ID or space type).
    :param path: Ordered list of node IDs visited.
    :param filters: Criteria that govern edge selection during traversal.
    :param depth: Maximum traversal depth (hops).
    :param results: Collected nodes at traversal termination.
    """

    traversal_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    origin: str = ""
    path: List[str] = field(default_factory=list)
    filters: Dict[str, Any] = field(default_factory=dict)
    depth: int = 1
    results: List[Node] = field(default_factory=list)

    def visit(self, node: Node) -> None:
        """Record visiting a node during traversal."""
        self.path.append(node.node_id)
        self.results.append(node)

    @property
    def hops(self) -> int:
        """Number of edges traversed."""
        return max(0, len(self.path) - 1)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "traversal_id": self.traversal_id,
            "origin": self.origin,
            "hops": self.hops,
            "depth": self.depth,
            "path": self.path,
            "filters": self.filters,
            "result_count": len(self.results),
        }


# ──────────────────────────────────────────────────────────────────────
# Fiber — a bundle of related mutations over a base space
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Fiber:
    """A fiber bundle — a collection of related morphisms over a base space.

    Analogous to Palantir's ``OntologyTransaction`` — a fiber groups
    multiple mutations (morphisms) that must succeed or fail atomically.
    In physics and TDA, a fiber bundle attaches additional structure
    to each point of a base space.

    :param fiber_id: Unique identifier.
    :param base_space: The space this fiber bundle is attached to.
    :param morphisms: Ordered morphisms to execute.
    :param status: Overall status of the fiber.
    """

    fiber_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    base_space: str = ""
    morphisms: List[Morphism] = field(default_factory=list)
    status: str = "pending"  # pending | executing | completed | rolled_back

    def add_morphism(self, morphism: Morphism) -> None:
        self.morphisms.append(morphism)

    def execute_all(self) -> None:
        """Execute all morphisms in order — mark fiber as completed."""
        self.status = "executing"
        for m in self.morphisms:
            m.status = "executing"
        self.status = "completed"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "fiber_id": self.fiber_id,
            "base_space": self.base_space,
            "morphism_count": len(self.morphisms),
            "status": self.status,
        }


# ──────────────────────────────────────────────────────────────────────
# Manifold — a smooth local view over a topology region
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Manifold:
    """A manifold — a smooth local coordinate chart over a topology region.

    Analogous to Palantir's ``Interface`` — a manifold provides a
    projected, flattened view of a potentially complex topology.  Used
    for dashboards, reports, and API response surfaces.

    :param manifold_id: Unique identifier.
    :param dimension: Intrinsic dimension of the manifold view.
    :param chart: Mapping from topology node IDs to local coordinates.
    :param properties: Additional manifold metadata.
    """

    manifold_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    dimension: int = 2
    chart: Dict[str, List[float]] = field(default_factory=dict)
    properties: Dict[str, Any] = field(default_factory=dict)

    def project(self, node: Node, coordinates: List[float]) -> None:
        """Project a node onto this manifold at given local coordinates."""
        self.chart[node.node_id] = coordinates

    def to_dict(self) -> Dict[str, Any]:
        return {
            "manifold_id": self.manifold_id,
            "dimension": self.dimension,
            "points": len(self.chart),
            "properties": self.properties,
        }


# ──────────────────────────────────────────────────────────────────────
# Ontologylogy — the root container
# ──────────────────────────────────────────────────────────────────────

@dataclass
class Ontologylogy:
    """The root container — the connected space of all domain objects.

    A ``Ontologylogy`` aggregates multiple ``Space`` instances and provides
    global operations (cross-space traversals, persistence homology
    computation, etc.).

    :param topology_id: Unique identifier.
    :param name: Human-readable topology name.
    :param spaces: Named spaces within this topology.
    """

    topology_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    spaces: Dict[str, Space] = field(default_factory=dict)

    def register_space(self, name: str, space: Space) -> None:
        """Add a named space to this topology."""
        self.spaces[name] = space

    def cross_traverse(
        self, origin_space: str, target_space: str, filters: Optional[Dict[str, Any]] = None
    ) -> Traversal:
        """Begin a traversal that crosses space boundaries."""
        return Traversal(
            origin=f"{origin_space}->{target_space}",
            filters=filters or {},
        )

    @property
    def total_nodes(self) -> int:
        return sum(s.size for s in self.spaces.values())

    def to_dict(self) -> Dict[str, Any]:
        return {
            "topology_id": self.topology_id,
            "name": self.name,
            "space_count": len(self.spaces),
            "total_nodes": self.total_nodes,
            "spaces": {k: v.to_dict() for k, v in self.spaces.items()},
        }
