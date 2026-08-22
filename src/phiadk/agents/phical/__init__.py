"""PhiCal — Quantum Learning domain agent.

A domain agent inspired by phi-oml's quantum module and the PHICAL
quantum computing spec.  Provides quantum-inspired semantic search,
circuit simulation, and training morphisms.
"""

from phiadk.agents.phical._client import AsyncPhiCalClient as AsyncPhiCalClient
from phiadk.agents.phical._client import PhiCalClient as PhiCalClient
from phiadk.agents.phical.agent import PhiCalAgent as PhiCalAgent
from phiadk.agents.phical.card import PHICAL_CARD as PHICAL_CARD

__all__ = ["PhiCalClient", "AsyncPhiCalClient", "PhiCalAgent", "PHICAL_CARD"]
