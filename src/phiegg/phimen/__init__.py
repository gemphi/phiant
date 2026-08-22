"""PhiMen — Virtual CEO Agent.

The executive orchestrator that sits atop the agent topology.
PhiMen reasons across all domain agents, making strategic decisions
by running the envision→apply→eval→iterate lifecycle at the
highest level — delegating to domain agents as sub-cycles.
"""

from phiegg.phimen._client import AsyncPhiMenClient as AsyncPhiMenClient
from phiegg.phimen._client import PhiMenClient as PhiMenClient
from phiegg.phimen.executive import ExecutiveAgent as ExecutiveAgent
from phiegg.phimen.executive import PhiMenAgent as PhiMenAgent
from phiegg.phimen.card import PHIMEN_CARD as PHIMEN_CARD

__all__ = ["PhiMenClient", "AsyncPhiMenClient", "PhiMenAgent", "ExecutiveAgent", "PHIMEN_CARD"]
