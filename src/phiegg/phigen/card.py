"""PhiGen Agent Card — loaded dynamically from schema.json."""

from pathlib import Path
from phiegg._core.agent_card import AgentCard

PHIGEN_CARD = AgentCard.load(Path(__file__).parent / "schema.json")
CARD = PHIGEN_CARD
