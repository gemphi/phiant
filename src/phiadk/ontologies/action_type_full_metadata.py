"""Palantir Foundry Symmetrical ActionTypeFullMetadata Definitions."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
from .action import ActionType, ActionParameter


@dataclass
class ActionTypeFullMetadata:
    """Complete metadata descriptor for an ActionType in the ontology."""

    api_name: str
    display_name: str
    description: str
    parameters: Dict[str, ActionParameter] = field(default_factory=dict)
    rid: Optional[str] = None
    status: str = "ACTIVE"
    operations: List[Dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "parameters": {k: v.to_dict() if hasattr(v, "to_dict") else v for k, v in self.parameters.items()},
            "rid": self.rid,
            "status": self.status,
            "operations": self.operations,
        }


# P* prefix standard alias
PActionTypeFullMetadata = ActionTypeFullMetadata
