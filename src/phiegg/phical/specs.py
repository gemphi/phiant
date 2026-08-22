"""PhiCal Spec enumeration."""

from enum import Enum


class PhiCalSpec(str, Enum):
    QUANTUM_SEMANTIC_SEARCH_V1 = "QUANTUM_SEMANTIC_SEARCH_V1"
    QUANTUM_CIRCUIT_SIMULATION_V1 = "QUANTUM_CIRCUIT_SIMULATION_V1"
