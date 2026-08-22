"""PhiOne — HR & Identity domain agent.

The identity authority and HR data space for the PhiEgg ecosystem.
Combines user identity, employee records, groups, and leave management
under a unified topology space.
"""

from phiegg.phione._client import AsyncPhiOneClient as AsyncPhiOneClient
from phiegg.phione._client import PhiOneClient as PhiOneClient
from phiegg.phione.agent import PhiOneAgent as PhiOneAgent
from phiegg.phione.card import PHIONE_CARD as PHIONE_CARD

__all__ = ["PhiOneClient", "AsyncPhiOneClient", "PhiOneAgent", "PHIONE_CARD"]
