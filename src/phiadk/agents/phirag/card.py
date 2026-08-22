"""PhiRAG Agent Card — loaded dynamically from schema.json."""

from pathlib import Path
from phiadk._core.agent_card import AgentCard

PHIRAG_CARD = AgentCard.load(Path(__file__).parent / "schema.json")
