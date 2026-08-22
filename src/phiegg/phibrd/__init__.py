"""PhiBrd — Onboarding Orchestrator agent.

Cross-domain onboarding orchestration across HR, Identity, Docs,
and Automation spaces.
"""

from phiegg.phibrd._client import AsyncPhiBrdClient as AsyncPhiBrdClient
from phiegg.phibrd._client import PhiBrdClient as PhiBrdClient
from phiegg.phibrd.agent import PhiBrdAgent as PhiBrdAgent
from phiegg.phibrd.card import PHIBRD_CARD as PHIBRD_CARD

__all__ = ["PhiBrdClient", "AsyncPhiBrdClient", "PhiBrdAgent", "PHIBRD_CARD"]
