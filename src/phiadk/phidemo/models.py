"""Domain Models for Phidemo Agent."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict

from phiadk._core.model_base import ModelBase
from phiadk._core.topology import Node, SimplexType


@dataclass
class PhidemoNode(Node, ModelBase):
    """Atomic topology node for Phidemo."""

    _model_type: str = "phidemo_node"
    name: str = ""
    status: str = "active"

    def __post_init__(self):
        self.node_type = "phidemo_node"
        self.simplex = SimplexType.POINT
