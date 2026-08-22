"""Action verbs for PhiBus domain agent."""

from enum import Enum


class PhiBusVerb(str, Enum):
    """Strongly-typed action verbs for PhiBus (Event Bus Agent)."""

    PUB = "pub"
    SUB = "sub"
    LIST_TOPICS = "list_topics"
    GET_HISTORY = "get_history"


# P* prefix alias
PBusVerb = PhiBusVerb
