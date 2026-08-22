"""PhiCal domain models — topology types for quantum learning.

Quantum-inspired types built on the core topology primitives.  These
model qubits, quantum states, circuits, and semantic search results
using topological concepts from phi-oml and the phinum spec.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

from phiegg._core.topology import Edge, Node, SimplexType, Space
from phiegg._core.model_base import ModelBase


# ── Quantum Node types ───────────────────────────────────────────────

@dataclass
class Qubit(Node, ModelBase):
    """A qubit node — the fundamental unit of quantum information.

    Represented as a point on the Bloch sphere with amplitude
    coefficients ``alpha`` (|0⟩) and ``beta`` (|1⟩).
    """

    _model_type: str = "qubit"
    alpha: complex = 1.0 + 0j  # Amplitude of |0⟩
    beta: complex = 0.0 + 0j   # Amplitude of |1⟩
    label: str = ""

    def __post_init__(self):
        self.node_type = "qubit"
        self.simplex = SimplexType.POINT

    @property
    def probability_zero(self) -> float:
        """Probability of measuring |0⟩."""
        return abs(self.alpha) ** 2

    @property
    def probability_one(self) -> float:
        """Probability of measuring |1⟩."""
        return abs(self.beta) ** 2

    def is_normalised(self, tolerance: float = 1e-9) -> bool:
        """Check if the qubit state is normalised."""
        return abs(self.probability_zero + self.probability_one - 1.0) < tolerance

    def measure(self) -> int:
        """Simulate a projective measurement (deterministic mock)."""
        return 0 if self.probability_zero >= self.probability_one else 1

    def hadamard(self) -> "Qubit":
        """Apply Hadamard gate — creates superposition."""
        inv_sqrt2 = 1 / math.sqrt(2)
        new_alpha = inv_sqrt2 * (self.alpha + self.beta)
        new_beta = inv_sqrt2 * (self.alpha - self.beta)
        return Qubit(alpha=new_alpha, beta=new_beta, label=f"H({self.label})")


@dataclass
class QuantumState(Node, ModelBase):
    """A multi-qubit quantum state — an n-simplex in Hilbert space."""

    _model_type: str = "quantum_state"
    qubits: List[Qubit] = field(default_factory=list)
    entangled: bool = False

    def __post_init__(self):
        self.node_type = "quantum_state"
        self.simplex = SimplexType.HYPEREDGE

    @property
    def num_qubits(self) -> int:
        return len(self.qubits)

    @property
    def hilbert_dimension(self) -> int:
        """Dimension of the Hilbert space = 2^n."""
        return 2 ** self.num_qubits


@dataclass
class GateNode(Node, ModelBase):
    """A quantum gate — a morphism-like node in the circuit topology."""

    _model_type: str = "gate"
    gate_type: str = ""  # H, X, Y, Z, CNOT, CZ, Toffoli, etc.
    target_qubits: List[int] = field(default_factory=list)
    control_qubits: List[int] = field(default_factory=list)
    parameters: Dict[str, float] = field(default_factory=dict)

    def __post_init__(self):
        self.node_type = "gate"
        self.simplex = SimplexType.EDGE


@dataclass
class CircuitNode(Node, ModelBase):
    """A quantum circuit — a topological chain of gate nodes."""

    _model_type: str = "circuit"
    name: str = ""
    gates: List[GateNode] = field(default_factory=list)
    num_qubits: int = 0

    def __post_init__(self):
        self.node_type = "circuit"
        self.simplex = SimplexType.VOLUME

    @property
    def depth(self) -> int:
        """Circuit depth (number of gate layers)."""
        return len(self.gates)

    def add_gate(self, gate: GateNode) -> None:
        self.gates.append(gate)


@dataclass
class SemanticResult(ModelBase):
    """A result from quantum-inspired semantic search.

    Uses amplitude-weighted scoring — each result has a probability
    amplitude that encodes both relevance and confidence.
    """

    _model_type: str = "semantic_result"
    content: str = ""
    score: float = 0.0
    amplitude: complex = 0.0 + 0j
    source: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)

    @property
    def probability(self) -> float:
        """Born rule: probability = |amplitude|²."""
        return abs(self.amplitude) ** 2


# ── Quantum Space types ──────────────────────────────────────────────

@dataclass
class CircuitSpace(Space):
    """Ontologylogy space containing quantum circuits."""

    def __post_init__(self):
        self.space_type = "circuit_space"


@dataclass
class SemanticSpace(Space):
    """Ontologylogy space for quantum semantic search results."""

    def __post_init__(self):
        self.space_type = "semantic_space"


# ── Quantum Edge types ───────────────────────────────────────────────

@dataclass
class EntanglementEdge(Edge):
    """An entanglement relationship between qubits."""

    def __post_init__(self):
        self.edge_type = "entangled"
