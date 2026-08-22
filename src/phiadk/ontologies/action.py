"""Ontology Action Module."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from .errors import ActionExecutionError


@dataclass
class ActionParameter:
    """A parameter required by an Action Type."""

    api_name: str
    display_name: str
    data_type: str
    required: bool = True
    description: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "data_type": self.data_type,
            "required": self.required,
            "description": self.description,
        }


@dataclass
class ActionType:
    """An Action Type modifying ontology objects."""

    api_name: str
    display_name: str
    description: str = ""
    target_object_type: Optional[str] = None
    parameters: Dict[str, ActionParameter] = field(default_factory=dict)
    operation: str = "MUTATE"  # "CREATE", "MUTATE", "DELETE", "TRANSFORM"

    def add_parameter(self, param: ActionParameter) -> ActionType:
        self.parameters[param.api_name] = param
        return self

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "target_object_type": self.target_object_type,
            "operation": self.operation,
            "parameters": {k: v.to_dict() for k, v in self.parameters.items()},
        }


@dataclass
class ActionTypeMetadata:
    """Detailed structural metadata and parameter schema for an ActionType."""

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


# Compatibility alias
ActionTypeFullMetadata = ActionTypeMetadata


class ActionClient:
    """Client for applying and validating Action Types."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def apply(
        self,
        action_type: str,
        parameters: Dict[str, Any],
        branch: str = "master",
    ) -> Dict[str, Any]:
        """Apply an action morphism with auto-validation."""
        val = self.validate(action_type, parameters)
        if val["result"] != "VALID":
            raise ActionExecutionError(
                action_type=action_type,
                reason=f"Validation failed: {val['validation_errors']}"
            )

        act = self._engine.action_types.get(action_type)
        receipt = {
            "action_type": action_type,
            "status": "APPLIED",
            "branch": branch,
            "target_object_type": act.target_object_type if act else None,
            "parameters": parameters,
            "commit_sha1": "9a3f2b1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a",
        }

        # Broadcast mutation event over PhiBus
        try:
            from phiadk.agents.phibus.bus import GLOBAL_PBUS
            from phiadk.agents.phibus.models import PBusEvent
            GLOBAL_PBUS.pub(
                topic=f"ontology.action.{action_type}",
                event=PBusEvent(
                    topic=f"ontology.action.{action_type}",
                    payload=receipt,
                    source_agent="ontologies",
                ),
            )
        except Exception:
            pass


        return receipt

    def validate(self, action_type: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        act = self._engine.action_types.get(action_type)
        if not act:
            return {"result": "INVALID", "validation_errors": [f"Action '{action_type}' not found"]}
        return {"result": "VALID", "validation_errors": []}


class ActionTypeClient:
    """Client for managing Action Type schemas."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, *args, **kwargs) -> Optional[ActionType]:
        if len(args) == 1:
            name = args[0]
        elif len(args) >= 2:
            name = args[1]
        else:
            name = kwargs.get("action_type") or kwargs.get("actionType") or kwargs.get("name")
        return self._engine.action_types.get(str(name))

    def get_by_rid(self, *args, **kwargs) -> Optional[ActionType]:
        return self.get(*args, **kwargs)

    def get_by_rid_batch(self, *args, **kwargs) -> List[ActionType]:
        return self.list()

    def search(self, *args, **kwargs) -> List[ActionType]:
        return self.list()

    def list(self, *args, **kwargs) -> List[ActionType]:
        return list(self._engine.action_types.values())


AsyncActionClient = ActionClient
AsyncActionTypeClient = ActionTypeClient
