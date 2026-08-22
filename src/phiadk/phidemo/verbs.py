"""Typed Verbs for Phidemo Agent."""

from enum import Enum


class PhidemoVerb(str, Enum):
    DEMO_ACTION = "demo_action"
    DEMO_STATUS = "demo_status"
