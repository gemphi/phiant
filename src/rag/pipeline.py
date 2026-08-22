"""RAG Pipeline - End-to-end retrieval-augmented generation pipeline."""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .chunker import ChunkingConfig, DocumentChunker
from .vectorstore import VectorStore

logger = logging.getLogger(__name__)


@dataclass
class IngestedDocument:
    """A document that has been ingested into the RAG pipeline."""

    doc_id: str
    source: str
    title: str
    chunk_count: int
    metadata: dict[str, Any]


class RAGPipeline:
    """End-to-end RAG pipeline: ingest, chunk, embed, store, retrieve."""

    def __init__(
        self,
        vectorstore: VectorStore | None = None,
        chunker: DocumentChunker | None = None,
    ) -> None:
        self.vectorstore = vectorstore or VectorStore()
        self.chunker = chunker or DocumentChunker()
        self._ingested: list[IngestedDocument] = []

    async def ingest_document(
        self,
        content: str,
        doc_id: str,
        title: str = "",
        source: str = "manual",
        collection: str = "phient_general",
        metadata: dict[str, Any] | None = None,
    ) -> IngestedDocument:
        """Ingest a document into the RAG pipeline."""
        doc_metadata = {"source": source, "title": title, "doc_id": doc_id, **(metadata or {})}

        chunks = self.chunker.chunk_document(content=content, doc_id=doc_id, metadata=doc_metadata)

        if not chunks:
            logger.warning("No chunks produced for document '%s'", doc_id)
            return IngestedDocument(
                doc_id=doc_id, source=source, title=title, chunk_count=0, metadata=doc_metadata
            )

        await self.vectorstore.add_documents(
            collection=collection,
            documents=[c.content for c in chunks],
            ids=[c.chunk_id for c in chunks],
            metadatas=[
                {
                    **c.metadata,
                    "chunk_index": c.chunk_index,
                    "heading": " > ".join(c.heading_hierarchy) if c.heading_hierarchy else "",
                }
                for c in chunks
            ],
        )

        record = IngestedDocument(
            doc_id=doc_id,
            source=source,
            title=title,
            chunk_count=len(chunks),
            metadata=doc_metadata,
        )
        self._ingested.append(record)
        return record

    async def search(
        self,
        query: str,
        collection: str | None = None,
        top_k: int = 5,
        metadata_filter: dict[str, Any] | None = None,
    ) -> list[dict[str, Any]]:
        """Search the knowledge base."""
        return await self.vectorstore.search(
            query=query, collection=collection, top_k=top_k, metadata_filter=metadata_filter
        )

    async def ingest_sample_data(self) -> int:
        """Ingest sample Phient knowledge base documents from JSON file."""
        sample_path = Path(__file__).parent.parent.parent / "data" / "sample_documents.json"
        if not sample_path.exists():
            logger.warning("Sample documents file not found at %s", sample_path)
            return 0

        with open(sample_path, "r", encoding="utf-8") as f:
            sample_docs = json.load(f)

        count = 0
        for doc in sample_docs:
            await self.ingest_document(**doc)
            count += 1

        logger.info("Ingested %d sample documents", count)
        return count

    def get_stats(self) -> dict[str, Any]:
        """Get pipeline statistics."""
        return {
            "documents_ingested": len(self._ingested),
            "collections": self.vectorstore.get_stats(),
        }
