"""PhiCal Quantum Semantic Search.

Implements superposition-inspired vector search with amplitude-weighted
scoring - the topology equivalent of Palantir's ontology search but
grounded in quantum probability amplitudes.

Inspired by phi-oml's ``quantum/search.rs`` (superposition search).
"""

from __future__ import annotations

import math
from typing import Any, Dict, List, Optional

from phiadk._core.topology import Fiber, Traversal
from phiadk.agents.phical.models import SemanticResult, SemanticSpace


class SemanticSearchClient:
    """Quantum-inspired semantic search over knowledge spaces.

    Uses amplitude superposition to rank results - each document
    exists in a superposition of relevance states until the search
    query "collapses" the state into ranked probabilities.
    """

    def __init__(self, vectorstore=None) -> None:
        self._vectorstore = vectorstore
        self._space = SemanticSpace()

    async def query(
        self,
        text: str,
        *,
        top_k: int = 5,
        amplitude_threshold: float = 0.1,
    ) -> List[SemanticResult]:
        """Execute a quantum-inspired semantic search.

        Each result is assigned a probability amplitude.  Results with
        ``|amplitude|² < threshold`` are filtered out (decoherence).

        :param text: Search query text.
        :param top_k: Maximum number of results.
        :param amplitude_threshold: Minimum |amplitude|² to include.
        :returns: Ranked list of ``SemanticResult`` objects.
        """
        # In production, this would call a vector store.  For now,
        # simulate superposition search with mock data.
        raw_results = await self._retrieve(text, top_k)

        # Apply Born rule scoring - normalise amplitudes
        if raw_results:
            total_score = sum(r.score for r in raw_results) or 1.0
            for r in raw_results:
                # Amplitude is sqrt(normalised_score) * phase
                normalised = r.score / total_score
                r.amplitude = complex(math.sqrt(normalised), 0)

        # Filter by decoherence threshold
        results = [
            r for r in raw_results
            if r.probability >= amplitude_threshold
        ]

        # Sort by probability (Born rule)
        results.sort(key=lambda r: r.probability, reverse=True)
        return results[:top_k]

    async def fiber_search(
        self,
        text: str,
        *,
        spaces: Optional[List[str]] = None,
        top_k: int = 5,
    ) -> Fiber:
        """Execute a fiber bundle search across multiple spaces.

        The fiber bundles results from different topology spaces into
        a single coherent result set - analogous to searching across
        multiple databases simultaneously in superposition.

        :param text: Search query.
        :param spaces: Space types to search across.
        :param top_k: Maximum results per space.
        :returns: A ``Fiber`` containing search morphisms per space.
        """
        from phiadk._core.topology import Morphism

        fiber = Fiber(base_space="semantic_space")
        target_spaces = spaces or ["knowledge", "documentation", "quantum"]

        for space in target_spaces:
            results = await self.query(text, top_k=top_k)
            morphism = Morphism(
                morphism_type="semantic_search",
                source_space="query_space",
                target_space=space,
                parameters={"query": text, "top_k": top_k},
            )
            morphism.complete({
                "result_count": len(results),
                "results": [
                    {"content": r.content, "probability": r.probability}
                    for r in results
                ],
            })
            fiber.add_morphism(morphism)

        fiber.status = "completed"
        return fiber

    async def _retrieve(self, query: str, top_k: int) -> List[SemanticResult]:
        """Retrieve raw results from the underlying store."""
        if self._vectorstore:
            raw = await self._vectorstore.search(query=query, top_k=top_k)
            return [
                SemanticResult(
                    content=r.get("content", ""),
                    score=r.get("score", 0.0),
                    source=r.get("source", ""),
                )
                for r in raw
            ]

        # Mock results for demonstration
        return [
            SemanticResult(
                content=f"Quantum result for '{query}' - superposition state {i}",
                score=1.0 / (i + 1),
                source=f"quantum_kb_{i}",
            )
            for i in range(min(top_k, 3))
        ]
