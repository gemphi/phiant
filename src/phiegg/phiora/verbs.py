"""PhiOra Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiOraVerb(str, Enum):
    PUT_RECORD = "put_record"
    GET_RECORD = "get_record"
    LIST_KEYS = "list_keys"
    SNAPSHOT_COLLECTION = "snapshot_collection"
    INDEX_VECTOR = "index_vector"
    SEARCH_VECTOR = "search_vector"
    RESOLVE_DATASET = "resolve_dataset"


class PhiOraTask(str, Enum):
    KV_STORAGE = "kv_storage"
    VECTOR_STORAGE = "vector_storage"
    DATASET_RESOLUTION = "dataset_resolution"


class PhiOraSpec(str, Enum):
    CONTENT_ADDRESSED_KV_V1 = "CONTENT_ADDRESSED_KV_V1"
    VECTOR_EMBEDDING_STORE_V1 = "VECTOR_EMBEDDING_STORE_V1"
