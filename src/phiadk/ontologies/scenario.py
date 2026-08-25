"""Ontology Scenario Client - What-if simulation and branching."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class Scenario:
    """A what-if simulation branch in Ontology."""
    scenario_id: str
    name: str
    base_commit: str
    status: str = "ACTIVE"


# Compatibility alias
OntologyScenario = Scenario


class ScenarioClient:
    """Client for branched scenario analysis in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def create(
        self,
        name: str = "",
        scenario_id: Optional[str] = None,
        base_commit: str = "HEAD",
        base_branch: str = "main",
        **kwargs: Any,
    ) -> Scenario:
        sid = scenario_id or (f"scenario_{name.lower().replace(' ', '_')}" if name else "scenario_branch")
        return Scenario(
            scenario_id=sid,
            name=name or sid,
            base_commit=base_commit,
            status="ACTIVE",
        )


AsyncScenarioClient = ScenarioClient
