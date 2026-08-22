"""Action verbs for PhiBus domain agent."""

from enum import Enum


class PhiBusVerb(str, Enum):
    """Strongly-typed action verbs for PhiBus (Event Bus Agent)."""

    PUBLISH_EVENT = "publish_event"
    SUBSCRIBE_TOPIC = "subscribe_topic"
    LIST_TOPICS = "list_topics"
    GET_HISTORY = "get_history"
    EMIT_EVENT = "emit_event"

    # Backward compatibility aliases
    PUB = "publish_event"
    SUB = "subscribe_topic"


# P* prefix alias
PBusVerb = PhiBusVerb
