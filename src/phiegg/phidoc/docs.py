"""PhiDoc Documentation and MDX Ontologylogy Explorer operations.

Search, page CRUD, knowledge-base sync, and MDX topology auto-presentation.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Dict, List, Optional

from phiegg._core.agent_base import DataSet
from phiegg._core.topology import Morphism, Node, Traversal


class SearchClient:
    """Traversals over the documentation space."""

    DOCS_DATA = DataSet(set_id="docs", set_type="live", source="docs_mock.json")

    def __init__(self, data_resolver=None) -> None:
        self._data_resolver = data_resolver

    async def search(self, query: str) -> Traversal:
        """Traverse the doc space for matching pages."""
        results = self._resolve(self.DOCS_DATA)
        traversal = Traversal(origin=query, filters={"space": "documentation"})
        for r in (results if isinstance(results, list) else []):
            node = Node(node_type="page", properties=r)
            traversal.visit(node)
        return traversal

    def _resolve(self, dataset: DataSet) -> Any:
        if self._data_resolver:
            return self._data_resolver(dataset.source, default=[])
        return []


class PageClient:
    """Morphisms over documentation pages — create, update, sync."""

    @staticmethod
    async def create(title: str) -> Morphism:
        """Create a new doc page — morphism into doc space."""
        m = Morphism(
            morphism_type="create_page",
            source_space="request_space",
            target_space="documentation_space",
            parameters={"title": title},
        )
        m.complete({
            "title": title,
            "url": f"https://notion.so/phient/{title.lower().replace(' ', '-')}",
        })
        return m

    @staticmethod
    async def sync() -> Morphism:
        """Sync knowledge base — bulk morphism."""
        m = Morphism(
            morphism_type="sync_knowledge_base",
            source_space="documentation_space",
            target_space="knowledge_space",
            parameters={"action": "sync"},
        )
        m.complete({"pages_synced": 47, "chunks_created": 312})
        return m


class OntologylogyExplorerClient:
    """Auto-discovers and presents Agent Ontologylogy MDX cards like Palantir documentation."""

    def __init__(self) -> None:
        self._src_root = Path(__file__).resolve().parents[1]

    def list_agent_topologies(self) -> List[str]:
        """List all agents having a topo.md or topo/topology.mdx file."""
        agents = []
        if not self._src_root.exists():
            return agents
        for child in self._src_root.iterdir():
            if child.is_dir() and (
                (child / "topo.md").exists()
                or (child / "topo" / "topology.mdx").exists()
                or (child / "topo" / "topo.md").exists()
            ):
                agents.append(child.name)
        return sorted(agents)

    list_topologies = list_agent_topologies

    def get_topology_mdx(self, agent_id: str) -> Optional[str]:
        """Fetch raw MD / MDX content for an agent's topology."""
        candidates = [
            self._src_root / agent_id / "topo.md",
            self._src_root / agent_id / "topo" / "topology.mdx",
            self._src_root / agent_id / "topo" / "topo.md",
        ]
        for p in candidates:
            if p.exists():
                with open(p, "r", encoding="utf-8") as f:
                    return f.read()
        return None

    def render_topology_card(self, agent_id: str) -> Dict[str, Any]:
        """Parse and structure topology MDX for browser presentation."""
        raw = self.get_topology_mdx(agent_id)
        if not raw:
            return {"agent_id": agent_id, "found": False}
        return {
            "agent_id": agent_id,
            "found": True,
            "raw_mdx": raw,
            "has_mermaid": "```mermaid" in raw,
            "has_ascii": "ASCII" in raw or "```\n[" in raw,
        }
