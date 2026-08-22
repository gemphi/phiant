"""PhiOne Leave space traversals.

Leave balance management — data resolved via ``DataSet``.
"""

from __future__ import annotations

from typing import Any, Dict, List

from phiegg._core.agent_base import DataSet
from phiegg.phione.models import LeaveBalance


class LeaveClient:
    """Traversals over the leave-balance topology space."""

    HR_DATA = DataSet(set_id="hr_employees", set_type="live", source="hr_mock.json")

    def __init__(self, data_resolver=None) -> None:
        self._data_resolver = data_resolver

    async def traverse_balance(self, email: str) -> List[LeaveBalance]:
        """Traverse leave balances for an employee node."""
        data = self._resolve(self.HR_DATA)
        return [
            LeaveBalance(
                leave_type=b["type"],
                total=b["total"],
                used=b["used"],
                pending=b["pending"],
            )
            for b in data.get("leave_balances", [])
        ]

    def _resolve(self, dataset: DataSet) -> Dict[str, Any]:
        if self._data_resolver:
            return self._data_resolver(dataset.source, default={})
        return {}
