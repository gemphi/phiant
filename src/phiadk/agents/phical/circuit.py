"""PhiCal Quantum Circuit topology.

Quantum circuit simulation inspired by phi-oml's quantum module and the
phinum spec.  Circuits are modelled as topological chains of gate nodes.
"""

from __future__ import annotations

import math
from typing import Any, Dict, List, Optional

from phiadk._core.topology import Morphism, Traversal
from phiadk.agents.phical.models import CircuitNode, CircuitSpace, GateNode, Qubit, QuantumState


class CircuitClient:
    """Operations over the quantum circuit topology space.

    Create, compose, and simulate quantum circuits modelled as
    topological chains in ``CircuitSpace``.
    """

    def __init__(self) -> None:
        self._space = CircuitSpace()
        self._circuits: Dict[str, CircuitNode] = {}

    async def create(
        self,
        name: str,
        num_qubits: int,
        gates: Optional[List[Dict[str, Any]]] = None,
    ) -> CircuitNode:
        """Create a new quantum circuit in the circuit space.

        :param name: Human-readable circuit name.
        :param num_qubits: Number of qubits in the register.
        :param gates: Optional list of gate specifications.
        :returns: The created ``CircuitNode``.
        """
        circuit = CircuitNode(name=name, num_qubits=num_qubits)

        for gate_spec in (gates or []):
            gate = GateNode(
                gate_type=gate_spec.get("type", "H"),
                target_qubits=gate_spec.get("targets", [0]),
                control_qubits=gate_spec.get("controls", []),
                parameters=gate_spec.get("params", {}),
            )
            circuit.add_gate(gate)

        circuit.set_provenance("phical", "circuit.create")
        self._circuits[circuit.node_id] = circuit
        self._space.add_node(circuit)
        return circuit

    async def simulate(self, circuit_id: str) -> Morphism:
        """Simulate a circuit - a morphism from circuit space to state space.

        :param circuit_id: ID of the circuit to simulate.
        :returns: A ``Morphism`` containing the simulation result.
        """
        circuit = self._circuits.get(circuit_id)
        if not circuit:
            morphism = Morphism(
                morphism_type="simulate",
                source_space="circuit_space",
                target_space="state_space",
                parameters={"circuit_id": circuit_id},
            )
            morphism.fail(f"Circuit '{circuit_id}' not found")
            return morphism

        # Simulate: initialise qubits in |0⟩ and apply gates
        qubits = [Qubit(label=f"q{i}") for i in range(circuit.num_qubits)]

        for gate in circuit.gates:
            if gate.gate_type == "H":
                for idx in gate.target_qubits:
                    if idx < len(qubits):
                        qubits[idx] = qubits[idx].hadamard()
            elif gate.gate_type == "X":
                for idx in gate.target_qubits:
                    if idx < len(qubits):
                        # Pauli-X (NOT gate): swap alpha and beta
                        q = qubits[idx]
                        qubits[idx] = Qubit(alpha=q.beta, beta=q.alpha, label=f"X({q.label})")

        state = QuantumState(qubits=qubits, entangled=False)

        morphism = Morphism(
            morphism_type="simulate",
            source_space="circuit_space",
            target_space="state_space",
            parameters={"circuit_id": circuit_id, "circuit_name": circuit.name},
        )
        morphism.complete({
            "num_qubits": state.num_qubits,
            "hilbert_dimension": state.hilbert_dimension,
            "measurements": [q.measure() for q in qubits],
            "probabilities": [
                {"qubit": i, "p0": q.probability_zero, "p1": q.probability_one}
                for i, q in enumerate(qubits)
            ],
        })
        return morphism

    async def list_circuits(self) -> Traversal:
        """Traverse all circuits in the space.

        :returns: A ``Traversal`` over all circuit nodes.
        """
        traversal = Traversal(origin="circuit_space")
        for circuit in self._circuits.values():
            traversal.visit(circuit)
        return traversal

    async def compose(self, circuit_ids: List[str], name: str = "") -> CircuitNode:
        """Compose multiple circuits into a larger circuit - a morphism
        that concatenates gate chains.

        :param circuit_ids: IDs of circuits to compose.
        :param name: Name for the composed circuit.
        :returns: A new ``CircuitNode`` containing all gates.
        """
        total_qubits = 0
        all_gates: List[GateNode] = []

        for cid in circuit_ids:
            circuit = self._circuits.get(cid)
            if circuit:
                total_qubits = max(total_qubits, circuit.num_qubits)
                all_gates.extend(circuit.gates)

        composed = CircuitNode(
            name=name or "composed",
            num_qubits=total_qubits,
            gates=all_gates,
        )
        composed.set_provenance("phical", "circuit.compose")
        self._circuits[composed.node_id] = composed
        return composed
