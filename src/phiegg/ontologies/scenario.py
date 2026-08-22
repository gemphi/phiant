"""Ontology Scenario Client — What-if simulation and branching."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class OntologyScenario:
    scenario_id: str
    name: str
    base_commit: str
    status: str = "ACTIVE"


class ScenarioClient:
    """Client for branched scenario analysis in Ontology."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def create(self, name: str, base_commit: str = "HEAD") -> OntologyScenario:
        return OntologyScenario(
            scenario_id=f"scenario_{name.lower().replace(' ', '_')}",
            name=name,
            base_commit=base_commit,
        )


# Backward compatibility and P* aliases
OntologyScenarioClient = ScenarioClient
ToposScenarioClient = ScenarioClient
POntologyScenario = OntologyScenario
POntologyScenarioClient = ScenarioClient
ToposScenario = OntologyScenario
