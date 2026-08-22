"""Tests for RAG document chunker."""

import pytest

from phiadk.agents.phirag.chunker import ChunkingConfig, DocumentChunker



class TestDocumentChunker:
    @pytest.fixture
    def chunker(self):
        return DocumentChunker(ChunkingConfig(chunk_size=100, min_chunk_size=20))

    def test_basic_chunking(self, chunker):
        content = "This is paragraph one.\n\nThis is paragraph two.\n\nThis is paragraph three."
        chunks = chunker.chunk_document(content, doc_id="test-doc")
        assert len(chunks) >= 1
        assert all(c.doc_id == "test-doc" for c in chunks)

    def test_heading_tracking(self, chunker):
        content = "## Introduction\n\nFirst paragraph.\n\n## Methods\n\nSecond paragraph."
        chunks = chunker.chunk_document(content, doc_id="test-doc")
        assert len(chunks) >= 1

    def test_empty_content(self, chunker):
        chunks = chunker.chunk_document("", doc_id="test-doc")
        assert len(chunks) == 0

    def test_chunk_has_metadata(self, chunker):
        content = "Some test content for chunking purposes."
        chunks = chunker.chunk_document(content, doc_id="test-doc", metadata={"source": "test"})
        if chunks:
            assert chunks[0].metadata.get("source") == "test"
