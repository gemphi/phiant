"""PhiBrd - Onboarding Orchestrator agent.

Cross-domain onboarding orchestration across HR, Identity, Docs,
and Automation spaces.
"""

from phiadk.agents.phibrd._client import AsyncPhiBrdClient as AsyncPhiBrdClient
from phiadk.agents.phibrd._client import PhiBrdClient as PhiBrdClient
from phiadk.agents.phibrd.agent import PhiBrdAgent as PhiBrdAgent
from phiadk.agents.phibrd.card import PHIBRD_CARD as PHIBRD_CARD

__all__ = ["PhiBrdClient", "AsyncPhiBrdClient", "PhiBrdAgent", "PHIBRD_CARD"]
