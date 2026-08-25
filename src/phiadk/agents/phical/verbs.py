"""PhiCal Verb enumeration - typed action verbs for quantum and semantic operations."""

from enum import Enum


class PhiCalVerb(str, Enum):
    """Verbs supported by the PhiCal Quantum Learning agent."""

    QUERY = "query"
    SEMANTIC_SEARCH = "semantic_search"
    FIBER_SEARCH = "fiber_search"
    CREATE_CIRCUIT = "create_circuit"
    SIMULATE_CIRCUIT = "simulate_circuit"
    COMPOSE_CIRCUITS = "compose_circuits"
    LIST_CIRCUITS = "list_circuits"
    ADD_GATE = "add_gate"
    MEASURE = "measure"
    TRAIN_MODEL = "train_model"
    EVALUATE_LOSS = "evaluate_loss"
    EVALUATE_MODEL = "evaluate_model"
