"""Agent Card for Phisecf Agent."""

from pathlib import Path
from phiadk._core.agent_card import AgentCard

PHISECF_CARD = AgentCard.load(Path(__file__).parent / "schema.json")
