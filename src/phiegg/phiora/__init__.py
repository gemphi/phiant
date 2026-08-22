"""PhiOra — Vector/Git-based Data Layer agent.

The data authority for the PhiEgg ecosystem.  Provides content-
addressable key-value storage (git-inspired), vector embeddings,
and DataSet resolution.  All other agents resolve their data
through PhiOra — strict separation of data and code.
"""

from phiegg.phiora._client import AsyncPhiOraClient as AsyncPhiOraClient
from phiegg.phiora._client import PhiOraClient as PhiOraClient
from phiegg.phiora.agent import PhiOraAgent as PhiOraAgent
from phiegg.phiora.card import PHIORA_CARD as PHIORA_CARD

__all__ = ["PhiOraClient", "AsyncPhiOraClient", "PhiOraAgent", "PHIORA_CARD"]
