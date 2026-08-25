"""PhiOne domain models - topology types for HR & Identity.

Each model extends the core topology ``Node`` with domain-specific
properties, forming the vertices of the phione topology space.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from phiadk._core.topology import Edge, Node, SimplexType, Space
from phiadk._core.model_base import ModelBase


# ── Node types ───────────────────────────────────────────────────────

@dataclass
class EmployeeNode(Node, ModelBase):
    """An employee entity in the HR topology space."""

    _model_type: str = "employee"
    display_name: str = ""
    email: str = ""
    title: str = ""
    department: str = ""
    division: str = ""
    site: str = ""
    manager: str = ""
    start_date: str = ""
    status: str = "active"
    employment_type: str = "full-time"
    country: str = ""

    def __post_init__(self):
        self.node_type = "employee"
        self.simplex = SimplexType.POINT


@dataclass
class IdentityNode(Node, ModelBase):
    """A user identity in the Entra ID topology space."""

    _model_type: str = "identity"
    email: str = ""
    display_name: str = ""
    job_title: str = ""
    department: str = ""
    office_location: str = ""
    account_enabled: bool = True
    groups: List[str] = field(default_factory=list)
    licenses: List[str] = field(default_factory=list)

    def __post_init__(self):
        self.node_type = "identity"
        self.simplex = SimplexType.POINT


@dataclass
class LeaveBalance(ModelBase):
    """Leave balance record attached to an employee node."""

    _model_type: str = "leave_balance"
    leave_type: str = ""
    total: float = 0.0
    used: float = 0.0
    pending: float = 0.0

    @property
    def remaining(self) -> float:
        return self.total - self.used

    @property
    def available(self) -> float:
        return self.total - self.used - self.pending

    def to_dict(self) -> Dict[str, Any]:
        d = super().to_dict()
        d["remaining"] = self.remaining
        d["available"] = self.available
        return d


@dataclass
class GroupNode(Node, ModelBase):
    """A security/distribution group - a 2-simplex in identity space."""

    _model_type: str = "group"
    group_name: str = ""
    group_type: str = "security"
    member_count: int = 0

    def __post_init__(self):
        self.node_type = "group"
        self.simplex = SimplexType.FACE


@dataclass
class OrgNode(Node, ModelBase):
    """An organisational unit - a 3-simplex aggregating employees."""

    _model_type: str = "org_unit"
    manager_name: str = ""
    direct_reports: List[Dict[str, Any]] = field(default_factory=list)

    def __post_init__(self):
        self.node_type = "org_unit"
        self.simplex = SimplexType.VOLUME


# ── Edge types ───────────────────────────────────────────────────────

@dataclass
class ManagesEdge(Edge):
    """Manager-to-report relationship edge."""

    def __post_init__(self):
        self.edge_type = "manages"


@dataclass
class MemberOfEdge(Edge):
    """Identity-to-group membership edge."""

    def __post_init__(self):
        self.edge_type = "member_of"


# ── Space types ──────────────────────────────────────────────────────

@dataclass
class EmployeeSpace(Space):
    """The HR employee topology space."""

    def __post_init__(self):
        self.space_type = "employee_space"


@dataclass
class IdentitySpace(Space):
    """The Entra ID identity topology space."""

    def __post_init__(self):
        self.space_type = "identity_space"
