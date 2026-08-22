"""Agent Card for {{agent_name}} Agent."""

from pathlib import Path
from phiadk._core.agent_card import AgentCard

{{card_name}} = AgentCard.load(Path(__file__).parent / "schema.json")
