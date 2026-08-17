"""Vector store wrapper for the RAG pipeline.

Provides a unified interface for ChromaDB with collection management,
hybrid search, and metadata filtering.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

from ..config import settings

logger = logging.getLogger(__name__)


@dataclass
class SearchResult:
    """A single search result from the vector store."""

    chunk_id: str
    content: str
    score: float
    metadata: dict[str, Any]


class VectorStore:
    """ChromaDB vector store wrapper with collection management.

    Provides semantic search, metadata filtering, and collection-level
    operations for the RAG pipeline.
    """

    # Default collections for Phiant knowledge domains
    DEFAULT_COLLECTIONS = [
        "phiant_policies",
        "phiant_technical",
        "phiant_processes",
        "phiant_general",
    ]

    def __init__(self, persist_dir: str | None = None) -> None:
        self._persist_dir = persist_dir or settings.chroma_persist_dir
        self._client = None
        self._collections: dict[str, Any] = {}

    @property
    def client(self) -> Any:
        """Lazily initialize ChromaDB client."""
        if self._client is None:
            try:
                import chromadb

                self._client = chromadb.PersistentClient(path=self._persist_dir)
                logger.info("ChromaDB client initialized at %s", self._persist_dir)
            except ImportError:
                logger.warning("chromadb not installed, using in-memory fallback")
                import chromadb

                self._client = chromadb.Client()
        return self._client

    def get_or_create_collection(self, name: str) -> Any:
        """Get or create a ChromaDB collection."""
        if name not in self._collections:
            self._collections[name] = self.client.get_or_create_collection(
                name=name,
                metadata={"hnsw:space": "cosine"},
            )
        return self._collections[name]

    def initialize_collections(self) -> None:
        """Initialize all default collections."""
        for name in self.DEFAULT_COLLECTIONS:
            self.get_or_create_collection(name)
        logger.info("Initialized %d collections", len(self.DEFAULT_COLLECTIONS))

    async def add_documents(
        self,
        collection: str,
        documents: list[str],
        ids: list[str],
        metadatas: list[dict[str, Any]] | None = None,
    ) -> None:
        """Add documents to a collection.

        Args:
            collection: Collection name.
            documents: List of document texts.
            ids: List of unique IDs for each document.
            metadatas: Optional metadata for each document.
        """
        coll = self.get_or_create_collection(collection)
        coll.add(
            documents=documents,
            ids=ids,
            metadatas=metadatas,
        )
        logger.info("Added %d documents to collection '%s'", len(documents), collection)

    async def search(
        self,
        query: str,
        collection: str | None = None,
        top_k: int = 5,
        metadata_filter: dict[str, Any] | None = None,
    ) -> list[dict[str, Any]]:
        """Search for relevant documents.

        Args:
            query: Search query text.
            collection: Specific collection to search (None = search all).
            top_k: Number of results to return.
            metadata_filter: Optional metadata filters.

        Returns:
            List of search results with content, score, and metadata.
        """
        collections_to_search = (
            [collection] if collection else self.DEFAULT_COLLECTIONS
        )

        all_results: list[dict[str, Any]] = []

        for coll_name in collections_to_search:
            try:
                coll = self.get_or_create_collection(coll_name)

                query_params: dict[str, Any] = {
                    "query_texts": [query],
                    "n_results": top_k,
                }
                if metadata_filter:
                    query_params["where"] = metadata_filter

                results = coll.query(**query_params)

                if results and results["documents"]:
                    for i, doc in enumerate(results["documents"][0]):
                        score = 1.0 - (results["distances"][0][i] if results["distances"] else 0.0)
                        metadata = results["metadatas"][0][i] if results["metadatas"] else {}
                        all_results.append(
                            {
                                "content": doc,
                                "score": round(score, 4),
                                "chunk_id": results["ids"][0][i],
                                "collection": coll_name,
                                **metadata,
                            }
                        )
            except Exception as exc:
                logger.warning("Error searching collection '%s': %s", coll_name, exc)

        # Sort by score descending and return top_k
        all_results.sort(key=lambda x: x["score"], reverse=True)
        return all_results[:top_k]

    async def delete_collection(self, name: str) -> None:
        """Delete a collection."""
        self.client.delete_collection(name)
        self._collections.pop(name, None)
        logger.info("Deleted collection '%s'", name)

    def get_stats(self) -> dict[str, Any]:
        """Get statistics about all collections."""
        stats = {}
        for name in self.DEFAULT_COLLECTIONS:
            try:
                coll = self.get_or_create_collection(name)
                stats[name] = {"count": coll.count()}
            except Exception:
                stats[name] = {"count": 0, "error": "unavailable"}
        return stats
