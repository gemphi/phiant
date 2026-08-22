"""PhiOne Employee space operations.

Refactored from the original ``hr_agent.py``.  All data flows through
``DataSet`` references resolved by ``phiora`` — no inline datasets.
Common traversal logic is factored into ``_traverse_keyed``.
"""

from __future__ import annotations

from typing import Any, Callable, Dict, List, Optional, Tuple

from phiadk._core.agent_base import DataSet
from phiadk._core.topology import Traversal
from phiadk.agents.phione.models import EmployeeNode, EmployeeSpace, OrgNode


class EmployeeClient:
    """Operations over the employee topology space.

    All methods resolve data via ``DataSet`` refs — never inline.
    Repeated resolve→traverse→visit patterns are consolidated into
    ``_traverse_keyed``.
    """

    # DataSet references — resolved by phiora, never inline
    HR_DATA = DataSet(set_id="hr_employees", set_type="live", source="hr_mock.json")

    def __init__(self, data_resolver=None) -> None:
        self._data_resolver = data_resolver
        self._space = EmployeeSpace()

    # ── Traversals ───────────────────────────────────────────────────

    async def lookup(self, email: str) -> EmployeeNode:
        """Traverse the employee space to find a node by email."""
        employee = self._resolve_key("employee")
        canonical = email if "@" in email else f"{email}@phient.com"

        node = EmployeeNode(
            display_name=employee.get("display_name", "Unknown"),
            email=canonical,
            title=employee.get("title", "N/A"),
            department=employee.get("department", "N/A"),
            division=employee.get("division", "N/A"),
            site=employee.get("site", "N/A"),
            manager=employee.get("manager", "N/A"),
            start_date=employee.get("start_date", "N/A"),
            status=employee.get("status", "active"),
            employment_type=employee.get("employment_type", "full-time"),
        )
        node.set_provenance("phione", "employee.lookup")
        return node

    async def traverse_team(self, department: str = "Engineering") -> Traversal:
        """Traverse the employee space to produce a team report."""
        return self._traverse_keyed(
            data_path=("team_report", "by_country"),
            origin=department,
            filters={"space": "employee"},
            node_builder=lambda country, count: EmployeeNode(
                display_name=f"{country} ({count})",
                department=department,
                country=country,
                properties={"count": count},
            ),
        )

    async def traverse_headcount(self, group_by: str = "country") -> Traversal:
        """Traverse the full employee space for headcount analytics."""
        total = self._resolve_key("headcount").get("total", 1) or 1
        return self._traverse_keyed(
            data_path=("headcount", "by_country"),
            origin="global",
            filters={"group_by": group_by},
            node_builder=lambda key, value: EmployeeNode(
                display_name=key,
                country=key,
                properties={"count": value, "percentage": round(value / total * 100, 1)},
            ),
        )

    async def traverse_org(self) -> OrgNode:
        """Traverse the org structure to build an org-tree node."""
        org = self._resolve_key("org_structure")
        return OrgNode(
            manager_name=org.get("manager", "Manager"),
            direct_reports=org.get("direct_reports", []),
        )

    # ── Shared traversal logic ───────────────────────────────────────

    def _traverse_keyed(
        self,
        *,
        data_path: Tuple[str, ...],
        origin: str,
        filters: Dict[str, Any],
        node_builder: Callable[[str, Any], EmployeeNode],
    ) -> Traversal:
        """Build a traversal by resolving a data path and mapping items to nodes.

        This consolidates the resolve→extract→iterate→visit pattern
        used by all keyed traversal methods.

        :param data_path: Tuple of nested keys to drill into the data set.
        :param origin: Traversal origin label.
        :param filters: Traversal filter dict.
        :param node_builder: ``(key, value) -> EmployeeNode`` factory.
        """
        data = self._resolve_path(data_path)
        traversal = Traversal(origin=origin, filters=filters)
        for key, value in data.items():
            traversal.visit(node_builder(key, value))
        return traversal

    # ── Data resolution ──────────────────────────────────────────────

    def _resolve_path(self, path: Tuple[str, ...]) -> Dict[str, Any]:
        """Resolve HR_DATA and drill into nested keys."""
        data = self._resolve(self.HR_DATA)
        for key in path:
            data = data.get(key, {}) if isinstance(data, dict) else {}
        return data if isinstance(data, dict) else {}

    def _resolve_key(self, key: str) -> Dict[str, Any]:
        """Shorthand: resolve HR_DATA and extract one top-level key."""
        return self._resolve_path((key,))

    def _resolve(self, dataset: DataSet) -> Dict[str, Any]:
        """Resolve a DataSet reference.  Returns empty dict if no resolver."""
        if self._data_resolver:
            return self._data_resolver(dataset.source, default={})
        return {}
