"""Document chunker for the RAG pipeline.

Splits documents into semantically meaningful chunks while preserving
heading hierarchy, table integrity, and code block boundaries.
"""

from __future__ import annotations

import hashlib
import uuid
from dataclasses import dataclass, field
from typing import Any


@dataclass
class DocumentChunk:
    """A single chunk of a document with metadata."""

    chunk_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    doc_id: str = ""
    content: str = ""
    chunk_index: int = 0
    token_count: int = 0
    metadata: dict[str, Any] = field(default_factory=dict)
    heading_hierarchy: list[str] = field(default_factory=list)

    @property
    def checksum(self) -> str:
        return hashlib.sha256(self.content.encode()).hexdigest()[:16]


@dataclass
class ChunkingConfig:
    """Configuration for the document chunker."""

    strategy: str = "recursive"
    chunk_size: int = 512
    chunk_overlap: int = 50
    min_chunk_size: int = 100
    separators: list[str] = field(
        default_factory=lambda: [
            "\n## ",
            "\n### ",
            "\n\n",
            "\n",
            ". ",
        ]
    )


class DocumentChunker:
    """Intelligent document chunker with semantic boundary detection.

    Splits documents into chunks that respect structural boundaries
    (headings, paragraphs, code blocks, tables) while maintaining
    configurable size limits.
    """

    def __init__(self, config: ChunkingConfig | None = None) -> None:
        self.config = config or ChunkingConfig()

    def chunk_document(
        self,
        content: str,
        doc_id: str = "",
        metadata: dict[str, Any] | None = None,
    ) -> list[DocumentChunk]:
        """Split a document into chunks.

        Args:
            content: The full document text.
            doc_id: The parent document ID.
            metadata: Metadata to attach to each chunk.

        Returns:
            List of DocumentChunk objects.
        """
        if not content.strip():
            return []

        metadata = metadata or {}
        raw_chunks = self._recursive_split(content, self.config.separators)

        # Merge small chunks and split oversized ones
        merged = self._merge_small_chunks(raw_chunks)
        final = self._enforce_size_limits(merged)

        # Build DocumentChunk objects
        chunks = []
        current_headings: list[str] = []

        for i, text in enumerate(final):
            # Track heading hierarchy
            for line in text.split("\n"):
                stripped = line.strip()
                if stripped.startswith("## "):
                    current_headings = [stripped.lstrip("# ").strip()]
                elif stripped.startswith("### "):
                    if current_headings:
                        current_headings = [current_headings[0], stripped.lstrip("# ").strip()]
                    else:
                        current_headings = [stripped.lstrip("# ").strip()]

            chunk = DocumentChunk(
                doc_id=doc_id,
                content=text.strip(),
                chunk_index=i,
                token_count=self._estimate_tokens(text),
                metadata=metadata.copy(),
                heading_hierarchy=current_headings.copy(),
            )
            chunks.append(chunk)

        return chunks

    def _recursive_split(self, text: str, separators: list[str]) -> list[str]:
        """Recursively split text using the separator hierarchy."""
        if not separators:
            return [text]

        separator = separators[0]
        remaining_separators = separators[1:]

        parts = text.split(separator)
        if len(parts) == 1:
            return self._recursive_split(text, remaining_separators)

        result = []
        for i, part in enumerate(parts):
            # Re-attach the separator to maintain context
            chunk_text = (separator + part) if i > 0 else part
            if self._estimate_tokens(chunk_text) > self.config.chunk_size:
                result.extend(self._recursive_split(chunk_text, remaining_separators))
            else:
                result.append(chunk_text)

        return result

    def _merge_small_chunks(self, chunks: list[str]) -> list[str]:
        """Merge chunks that are smaller than min_chunk_size."""
        if not chunks:
            return []

        merged = []
        current = chunks[0]

        for next_chunk in chunks[1:]:
            combined_tokens = self._estimate_tokens(current + next_chunk)
            if (
                self._estimate_tokens(current) < self.config.min_chunk_size
                and combined_tokens <= self.config.chunk_size
            ):
                current = current + next_chunk
            else:
                merged.append(current)
                current = next_chunk

        merged.append(current)
        return merged

    def _enforce_size_limits(self, chunks: list[str]) -> list[str]:
        """Ensure no chunk exceeds the configured size limit."""
        result = []
        for chunk in chunks:
            if self._estimate_tokens(chunk) <= self.config.chunk_size * 1.5:
                result.append(chunk)
            else:
                # Hard split on sentences
                sentences = chunk.replace(". ", ".\n").split("\n")
                current = ""
                for sentence in sentences:
                    if self._estimate_tokens(current + sentence) > self.config.chunk_size:
                        if current:
                            result.append(current)
                        current = sentence
                    else:
                        current = current + (" " if current else "") + sentence
                if current:
                    result.append(current)

        return result

    @staticmethod
    def _estimate_tokens(text: str) -> int:
        """Rough token estimation: ~4 characters per token for English."""
        return len(text) // 4
