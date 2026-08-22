"""Agent Card for Phidemo Agent."""

from pathlib import Path
from phiegg._core.agent_card import AgentCard

PHIDEMO_CARD = AgentCard.load(Path(__file__).parent / "schema.json")
