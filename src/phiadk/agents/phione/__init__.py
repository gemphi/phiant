"""PhiOne - HR & Identity domain agent.

The identity authority and HR data space for the PhiADK ecosystem.
Combines user identity, employee records, groups, and leave management
under a unified topology space.
"""

from phiadk.agents.phione._client import AsyncPhiOneClient as AsyncPhiOneClient
from phiadk.agents.phione._client import PhiOneClient as PhiOneClient
from phiadk.agents.phione.agent import PhiOneAgent as PhiOneAgent
from phiadk.agents.phione.card import PHIONE_CARD as PHIONE_CARD

__all__ = ["PhiOneClient", "AsyncPhiOneClient", "PhiOneAgent", "PHIONE_CARD"]
