"""PhiCal Task enumeration."""

from enum import Enum


class PhiCalTask(str, Enum):
    QUANTUM_SEMANTIC_SEARCH = "quantum_semantic_search"
    CIRCUIT_OPERATIONS = "circuit_operations"
    TRAINING_MORPHISMS = "training_morphisms"
