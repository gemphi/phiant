"""PhiDoc — Documentation domain agent.

Documentation search, Notion workspace sync, and knowledge base
page generation.
"""

from phiegg.phidoc._client import AsyncPhiDocClient as AsyncPhiDocClient
from phiegg.phidoc._client import PhiDocClient as PhiDocClient
from phiegg.phidoc.agent import PhiDocAgent as PhiDocAgent
from phiegg.phidoc.card import PHIDOC_CARD as PHIDOC_CARD

__all__ = ["PhiDocClient", "AsyncPhiDocClient", "PhiDocAgent", "PHIDOC_CARD"]
