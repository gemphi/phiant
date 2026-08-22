"""Domain Models for Phisecf Agent."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict

from phiegg._core.model_base import ModelBase
from phiegg._core.topology import Node, SimplexType


@dataclass
class PhisecfNode(Node, ModelBase):
    """Atomic topology node for Phisecf."""

    _model_type: str = "phisecf_node"
    name: str = ""
    status: str = "active"

    def __post_init__(self):
        self.node_type = "phisecf_node"
        self.simplex = SimplexType.POINT
