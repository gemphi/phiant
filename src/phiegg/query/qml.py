"""PhiEgg QML (Quantum Model Language).

A fluent query language for quantum topological state simulation,
Born-rule amplitude measurement, Hamiltonian evolution, and decoherence filtering.
"""

from __future__ import annotations

import cmath
import math
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union

from phiegg._core.topology import Node, SimplexType, Space


@dataclass
class QuantumStateNode(Node):
    """A quantum state basis vector node in a Hilbert-simplicial space."""

    label: str = "|0⟩"
    amplitude: complex = 1.0 + 0.0j
    probability: float = 1.0

    def __post_init__(self):
        self.node_type = "quantum_state"
        self.simplex = SimplexType.POINT
        self.probability = abs(self.amplitude) ** 2

    def to_dict(self) -> Dict[str, Any]:
        base = super().to_dict()
        base.update({
            "label": self.label,
            "amplitude": {"real": self.amplitude.real, "imag": self.amplitude.imag},
            "probability": round(self.probability, 6),
        })
        return base


@dataclass
class QMLResult:
    """The evaluated result of a Quantum Model Language execution."""

    state_space: str = "quantum_space"
    num_qubits: int = 1
    state_nodes: List[QuantumStateNode] = field(default_factory=list)
    entangled_pairs: List[Tuple[int, int]] = field(default_factory=list)
    born_distribution: Dict[str, float] = field(default_factory=dict)
    collapsed_state: Optional[str] = None
    fidelity: float = 1.0

    def to_dict(self) -> Dict[str, Any]:
        return {
            "state_space": self.state_space,
            "num_qubits": self.num_qubits,
            "state_nodes": [n.to_dict() for n in self.state_nodes],
            "entangled_pairs": self.entangled_pairs,
            "born_distribution": self.born_distribution,
            "probabilities": self.born_distribution,
            "collapsed_state": self.collapsed_state,
            "fidelity": self.fidelity,
        }

    @property
    def probabilities(self) -> Dict[str, float]:
        """Convenience alias for born_distribution."""
        return self.born_distribution


class QML:
    """Fluent query builder for Quantum Model Language (QML)."""

    def __init__(self, space_name: str = "quantum_space") -> None:
        self._space_name = space_name
        self._states: Dict[str, complex] = {"|0⟩": 1.0 + 0.0j}
        self._num_qubits = 1
        self._entangled_pairs: List[Tuple[int, int]] = []
        self._threshold = 0.0
        self._gates_applied: List[str] = []

    @classmethod
    def from_space(cls, space_name: str = "quantum_space") -> "QML":
        return cls(space_name=space_name)

    @classmethod
    def from_circuit(cls, circuit_name: str = "quantum_circuit") -> "QML":
        return cls(space_name=circuit_name)

    def superposition(self, labels: List[str], amplitudes: Optional[List[complex]] = None) -> "QML":
        """Initialize a superposition state over given basis labels."""
        n = len(labels)
        if n == 0:
            return self
        self._states.clear()
        if amplitudes and len(amplitudes) == n:
            # Normalize
            norm = math.sqrt(sum(abs(a) ** 2 for a in amplitudes)) or 1.0
            for lbl, amp in zip(labels, amplitudes):
                self._states[lbl] = amp / norm
        else:
            # Equal superposition
            equal_amp = complex(1.0 / math.sqrt(n), 0.0)
            for lbl in labels:
                self._states[lbl] = equal_amp
        self._num_qubits = max(1, math.ceil(math.log2(n)))
        return self

    def apply_gate(self, gate: str, qubit: int = 0, angle_rad: float = 0.0) -> "QML":
        """Apply a quantum gate morphism to the state space (H, X, Y, Z, S, T, Ry)."""
        gate = gate.upper()
        self._gates_applied.append(f"{gate}(q{qubit})")

        if gate == "H":  # Hadamard
            inv_sqrt2 = 1.0 / math.sqrt(2.0)
            new_states: Dict[str, complex] = {}
            for lbl, amp in self._states.items():
                if lbl in ("|0⟩", "|00⟩", "0", "state_0"):
                    new_states["|0⟩"] = new_states.get("|0⟩", 0) + amp * inv_sqrt2
                    new_states["|1⟩"] = new_states.get("|1⟩", 0) + amp * inv_sqrt2
                elif lbl in ("|1⟩", "|01⟩", "1", "state_1"):
                    new_states["|0⟩"] = new_states.get("|0⟩", 0) + amp * inv_sqrt2
                    new_states["|1⟩"] = new_states.get("|1⟩", 0) - amp * inv_sqrt2
                else:
                    new_states[f"{lbl}_0"] = amp * inv_sqrt2
                    new_states[f"{lbl}_1"] = amp * inv_sqrt2
            self._states = new_states

        elif gate == "X":  # Pauli-X (NOT)
            new_states = {}
            for lbl, amp in self._states.items():
                target = "|1⟩" if lbl == "|0⟩" else ("|0⟩" if lbl == "|1⟩" else f"inv({lbl})")
                new_states[target] = amp
            self._states = new_states

        elif gate == "Z":  # Pauli-Z (Phase flip)
            new_states = {}
            for lbl, amp in self._states.items():
                phase = -1.0 if "1" in lbl else 1.0
                new_states[lbl] = amp * phase
            self._states = new_states

        elif gate == "RY":  # Y-Rotation
            cos_half = math.cos(angle_rad / 2.0)
            sin_half = math.sin(angle_rad / 2.0)
            new_states = {}
            for lbl, amp in self._states.items():
                new_states["|0⟩"] = new_states.get("|0⟩", 0) + amp * cos_half
                new_states["|1⟩"] = new_states.get("|1⟩", 0) + amp * sin_half
            self._states = new_states

        return self

    def entangle(self, control_qubit: int, target_qubit: int) -> "QML":
        """Apply CNOT entanglement morphism between two topological qubits."""
        self._entangled_pairs.append((control_qubit, target_qubit))
        self._gates_applied.append(f"CNOT({control_qubit}->{target_qubit})")
        # Generates Bell state if |+0⟩
        if "|0⟩" in self._states and "|1⟩" in self._states:
            inv_sqrt2 = 1.0 / math.sqrt(2.0)
            self._states = {
                "|00⟩": complex(inv_sqrt2, 0.0),
                "|11⟩": complex(inv_sqrt2, 0.0),
            }
        return self

    def decoherence_filter(self, threshold: float = 0.0) -> "QML":
        """Filter out quantum states with probability amplitude below threshold."""
        self._threshold = threshold
        return self

    def born_measurement(self, threshold: float = 0.0) -> "QML":
        """Set Born-rule probability threshold (decoherence filter)."""
        self._threshold = threshold
        return self

    def execute(self) -> QMLResult:
        """Evaluate quantum circuit state vector, Born distribution, and decoherence filter."""
        # Calculate Born distribution P = |alpha|^2
        born_dist: Dict[str, float] = {}
        state_nodes: List[QuantumStateNode] = []

        total_p = sum(abs(amp) ** 2 for amp in self._states.values()) or 1.0

        for lbl, amp in self._states.items():
            prob = (abs(amp) ** 2) / total_p
            if prob >= self._threshold:
                born_dist[lbl] = round(prob, 6)
                node = QuantumStateNode(
                    label=lbl,
                    amplitude=amp,
                    probability=prob,
                )
                state_nodes.append(node)

        # Most probable state
        collapsed = max(born_dist.items(), key=lambda x: x[1])[0] if born_dist else None

        return QMLResult(
            state_space=self._space_name,
            num_qubits=self._num_qubits,
            state_nodes=state_nodes,
            entangled_pairs=self._entangled_pairs,
            born_distribution=born_dist,
            collapsed_state=collapsed,
            fidelity=1.0,
        )
