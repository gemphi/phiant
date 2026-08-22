"""PhiOra Task enumeration."""

from enum import Enum


class PhiOraTask(str, Enum):
    KV_STORAGE = "kv_storage"
    VECTOR_STORAGE = "vector_storage"
    DATASET_RESOLUTION = "dataset_resolution"
