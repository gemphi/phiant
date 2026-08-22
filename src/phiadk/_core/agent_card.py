"""PhiADK Agent Card Specification and Typing.

Defines the Spec → Task → Verb schema model for all domain agents.
Cards load directly from ``schema.json`` in each agent package,
making ``schema.json`` the single source of truth without hardcoded content.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Any, Dict, List, Optional, Union


class AgentLayer(str, Enum):
    """Architectural layer classification."""

    INFRASTRUCTURE = "Infrastructure"
    ENGINE = "Engine"
    DATA = "Data"
    APPLICATION = "Application"
    GATEWAY = "Gateway"
    EXECUTIVE = "Executive"


@dataclass
class PhiVerb:
    """An atomic action executed by an agent."""

    verb: str
    description: str
    parameters: Dict[str, Any] = field(default_factory=dict)
    returns: str = "Any"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "verb": self.verb,
            "description": self.description,
            "parameters": self.parameters,
            "returns": self.returns,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PhiVerb":
        return cls(
            verb=data.get("verb", ""),
            description=data.get("description", ""),
            parameters=data.get("parameters", {}),
            returns=data.get("returns", "Any"),
        )


@dataclass
class PhiTask:
    """A named group of related verbs (a chapter in the agent's capability book)."""

    task_id: str
    name: str
    description: str = ""
    verbs: List[PhiVerb] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "task_id": self.task_id,
            "name": self.name,
            "description": self.description,
            "verbs": [v.to_dict() for v in self.verbs],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PhiTask":
        return cls(
            task_id=data.get("task_id", ""),
            name=data.get("name", ""),
            description=data.get("description", ""),
            verbs=[PhiVerb.from_dict(v) for v in data.get("verbs", [])],
        )


@dataclass
class PhiSpec:
    """A testable capability claim that the agent guarantees.

    :param spec_idx: Primary version-independent specification index (e.g. 'PHIDEMO_STANDARD_SPEC').
    :param version: Version string for this specification claim (e.g. '1.5.0').
    :param spec_id: Specification identifier (defaults to spec_idx).
    :param name: Human-readable name of the specification claim.
    :param description: Detailed description of the specification.
    :param required_tasks: List of task IDs required by this specification.
    :param tasks: Detailed task list.
    """

    spec_idx: str = ""
    version: str = "1.0.0"
    spec_id: str = ""
    name: str = ""
    description: str = ""
    required_tasks: List[str] = field(default_factory=list)
    tasks: List[Any] = field(default_factory=list)

    def __post_init__(self):
        if not self.spec_idx and self.spec_id:
            self.spec_idx = self.spec_id
        elif not self.spec_id and self.spec_idx:
            self.spec_id = self.spec_idx

    def to_dict(self) -> Dict[str, Any]:
        return {
            "spec_idx": self.spec_idx or self.spec_id,
            "spec_id": self.spec_id or self.spec_idx,
            "version": self.version,
            "name": self.name,
            "description": self.description,
            "required_tasks": self.required_tasks,
            "tasks": [t.to_dict() if hasattr(t, "to_dict") else t for t in self.tasks],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PhiSpec":
        raw_spec_idx = data.get("spec_idx") or data.get("spec_id", "")
        raw_spec_id = data.get("spec_id") or raw_spec_idx
        return cls(
            spec_idx=raw_spec_idx,
            spec_id=raw_spec_id,
            version=data.get("version", "1.0.0"),
            name=data.get("name", ""),
            description=data.get("description", ""),
            required_tasks=data.get("required_tasks", []),
            tasks=data.get("tasks", []),
        )


@dataclass
class AgentCard:
    """Agent Card / Schema metadata for an agent.

    Loads directly from ``schema.json`` files.
    """

    agent_id: str
    agent_name: str
    layer: AgentLayer
    description: str
    specs: List[PhiSpec] = field(default_factory=list)
    tasks: List[PhiTask] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)
    external_services: List[str] = field(default_factory=list)
    version: str = "1.0.0"

    def get_all_verbs(self) -> List[str]:
        """List all verb IDs available across all tasks."""
        return [v.verb for t in self.tasks for v in t.verbs]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "agent_id": self.agent_id,
            "agent_name": self.agent_name,
            "layer": self.layer.value if isinstance(self.layer, AgentLayer) else str(self.layer),
            "description": self.description,
            "version": self.version,
            "specs": [s.to_dict() for s in self.specs],
            "tasks": [t.to_dict() for t in self.tasks],
            "dependencies": self.dependencies,
            "external_services": self.external_services,
            "verbs": self.get_all_verbs(),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AgentCard":
        layer_str = data.get("layer", "Infrastructure")
        try:
            layer = AgentLayer(layer_str)
        except Exception:
            layer = AgentLayer.INFRASTRUCTURE

        return cls(
            agent_id=data.get("agent_id", ""),
            agent_name=data.get("agent_name", ""),
            layer=layer,
            description=data.get("description", ""),
            version=data.get("version", "1.0.0"),
            specs=[PhiSpec.from_dict(s) for s in data.get("specs", [])],
            tasks=[PhiTask.from_dict(t) for t in data.get("tasks", [])],
            dependencies=data.get("dependencies", []),
            external_services=data.get("external_services", []),
        )

    @classmethod
    def from_file(cls, path: Union[str, Path]) -> "AgentCard":
        """Load AgentCard dynamically from a schema.json file."""
        file_path = Path(path)
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return cls.from_dict(data)

    @classmethod
    def load(cls, agent_package_dir_or_file: Union[str, Path]) -> "AgentCard":
        """Load AgentCard from directory or schema.json path."""
        p = Path(agent_package_dir_or_file)
        if p.is_dir():
            schema_file = p / "schema.json"
        else:
            schema_file = p
        if not schema_file.exists():
            raise FileNotFoundError(f"Schema file not found at {schema_file}")
        return cls.from_file(schema_file)
