"""Domain Models for {{agent_name}} Agent."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict

from phiadk._core.model_base import ModelBase
from phiadk._core.topology import Node, SimplexType


@dataclass
class {{agent_name}}Node(Node, ModelBase):
    """Atomic topology node for {{agent_name}}."""

    _model_type: str = "{{agent_id}}_node"
    name: str = ""
    status: str = "active"

    def __post_init__(self):
        self.node_type = "{{agent_id}}_node"
        self.simplex = SimplexType.POINT
