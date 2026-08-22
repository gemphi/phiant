"""Formal specifications implemented by PhiBus domain agent."""

from enum import Enum


class PhiBusSpec(str, Enum):
    """Specification identifier constants for PhiBus."""

    EVENT_BUS_PUBSUB_V1 = "EVENT_BUS_PUBSUB_V1"


# P* prefix alias
PBusSpec = PhiBusSpec
