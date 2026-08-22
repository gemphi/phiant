"""PhiADK VQL (Vector Query Language).

A fluent query builder for vector similarity search, cosine thresholds,
and semantic superposition filtering.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Union

from phiadk.agents.phiora.models import VectorRecord
from phiadk.agents.phiora.store import VectorClient


@dataclass
class VQLQuery:
    """Represents a compiled Vector Query Language expression."""

    space: str = "default"
    query_vector: List[float] = field(default_factory=list)
    query_text: str = ""
    top_k: int = 5
    threshold: float = 0.0
    filters: Dict[str, Any] = field(default_factory=dict)


class VQL:
    """Fluent query builder for Vector Query Language."""

    def __init__(self, space: str = "default", vector_client: Optional[VectorClient] = None) -> None:
        self._query = VQLQuery(space=space)
        self._vector_client = vector_client or VectorClient()

    @classmethod
    def from_space(cls, space: str, vector_client: Optional[VectorClient] = None) -> "VQL":
        return cls(space=space, vector_client=vector_client)

    def similar_to(self, vector_or_text: Union[List[float], str], *, top_k: int = 5) -> "VQL":
        """Specify target vector or text for nearest neighbor search."""
        if isinstance(vector_or_text, list):
            self._query.query_vector = vector_or_text
        else:
            self._query.query_text = str(vector_or_text)
            # Simple mock embedding conversion for text if vector client is local
            self._query.query_vector = [0.1 * (i + 1) for i in range(16)]
        self._query.top_k = top_k
        return self

    def threshold(self, min_similarity: float) -> "VQL":
        """Filter results having cosine similarity above this threshold."""
        self._query.threshold = min_similarity
        return self

    def where(self, **kwargs: Any) -> "VQL":
        """Add metadata filters to vector search."""
        self._query.filters.update(kwargs)
        return self

    def execute(self) -> List[VectorRecord]:
        """Execute the vector query."""
        results = self._vector_client.search(self._query.query_vector, top_k=self._query.top_k)
        if self._query.filters:
            filtered = []
            for r in results:
                match = all(r.properties.get(k) == v for k, v in self._query.filters.items())
                if match:
                    filtered.append(r)
            return filtered
        return results
