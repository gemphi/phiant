"""PhiOra Spec enumeration."""

from enum import Enum


class PhiOraSpec(str, Enum):
    CONTENT_ADDRESSED_KV_V1 = "CONTENT_ADDRESSED_KV_V1"
    VECTOR_EMBEDDING_STORE_V1 = "VECTOR_EMBEDDING_STORE_V1"
