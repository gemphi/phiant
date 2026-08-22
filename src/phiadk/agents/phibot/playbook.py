"""PhiBot Playbook operations.

Playbook management and execution — data via DataSet refs.
"""

from __future__ import annotations

from typing import Any, Dict, List

from phiadk._core.agent_base import DataSet
from phiadk._core.topology import Morphism, Traversal, Node


class PlaybookClient:
    """Traversals and morphisms over the automation playbook space."""

    PLAYBOOK_DATA = DataSet(set_id="playbooks", set_type="live", source="playbooks.json")

    def __init__(self, data_resolver=None) -> None:
        self._data_resolver = data_resolver

    async def list(self, *, category: str | None = None) -> Traversal:
        """Traverse the playbook space."""
        playbooks = self._resolve_list()
        if category:
            playbooks = [p for p in playbooks if p.get("category") == category]
        traversal = Traversal(origin="playbook_space", filters={"category": category or "all"})
        for pb in playbooks:
            traversal.visit(Node(node_type="playbook", properties=pb))
        return traversal

    async def execute(self, playbook_id: str) -> Morphism:
        """Execute a playbook — morphism over the automation space."""
        playbooks = {p["id"]: p for p in self._resolve_list()}
        pb = playbooks.get(playbook_id)
        m = Morphism(
            morphism_type="execute_playbook",
            source_space="playbook_space",
            target_space="execution_space",
            parameters={"playbook_id": playbook_id},
        )
        if pb:
            m.complete({"playbook_name": pb["name"], "status": "executed"})
        else:
            m.fail(f"Playbook '{playbook_id}' not found")
        return m

    def _resolve_list(self) -> List[Dict[str, Any]]:
        data = self._resolve(self.PLAYBOOK_DATA)
        return data if isinstance(data, list) else []

    def _resolve(self, dataset: DataSet) -> Any:
        if self._data_resolver:
            return self._data_resolver(dataset.source, default=[])
        return []
