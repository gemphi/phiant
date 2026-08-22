"""Phidemo Agent package."""

from phiadk.agents.phidemo.agent import PhidemoAgent as PhidemoAgent
from phiadk.agents.phidemo._client import PhidemoClient as PhidemoClient
from phiadk.agents.phidemo._client import AsyncPhidemoClient as AsyncPhidemoClient
from phiadk.agents.phidemo.card import PHIDEMO_CARD as PHIDEMO_CARD
from phiadk.agents.phidemo.verbs import PhidemoVerb as PhidemoVerb
from phiadk.agents.phidemo.tasks import PhidemoTask as PhidemoTask
from phiadk.agents.phidemo.specs import PhidemoSpec as PhidemoSpec

PhiDemoAgent = PhidemoAgent
PhiDemoClient = PhidemoClient
AsyncPhiDemoClient = AsyncPhidemoClient

__all__ = [
    "PhidemoAgent",
    "PhidemoClient",
    "AsyncPhidemoClient",
    "PhiDemoAgent",
    "PhiDemoClient",
    "AsyncPhiDemoClient",
    "PHIDEMO_CARD",
    "PhidemoVerb",
    "PhidemoTask",
    "PhidemoSpec",
]

