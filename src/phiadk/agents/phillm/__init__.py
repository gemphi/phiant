"""PhiLLM — Language Model & Inference domain agent.

Multi-provider model endpoint management, completions, embeddings,
and parameter hot-swapping.
"""

from phiadk.agents.phillm._client import AsyncPhiLLMClient as AsyncPhiLLMClient
from phiadk.agents.phillm._client import PhiLLMClient as PhiLLMClient
from phiadk.agents.phillm.agent import PhiLLMAgent as PhiLLMAgent
from phiadk.agents.phillm.card import PHILLM_CARD as PHILLM_CARD

__all__ = ["PhiLLMClient", "AsyncPhiLLMClient", "PhiLLMAgent", "PHILLM_CARD"]
