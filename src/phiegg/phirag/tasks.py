"""PhiRAG Task enumeration."""

from enum import Enum


class PhiRAGTask(str, Enum):
    KNOWLEDGE_RETRIEVAL = "knowledge_retrieval"
    CONTEXT_AUGMENTATION = "context_augmentation"
