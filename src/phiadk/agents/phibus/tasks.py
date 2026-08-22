"""Supported task types for PhiBus domain agent."""

from enum import Enum


class PhiBusTask(str, Enum):
    """Strongly-typed task categories for PhiBus (Event Bus Agent)."""

    EVENT_BROADCAST = "event_broadcast"
    TOPIC_SUBSCRIPTION = "topic_subscription"
    EVENT_REPLAY = "event_replay"


# P* prefix alias
PBusTask = PhiBusTask
