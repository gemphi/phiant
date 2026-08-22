"""PhiGit Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiGitVerb(str, Enum):
    STORE_BLOB = "store_blob"
    GET_BLOB = "get_blob"
    STORE_TREE = "store_tree"
    GET_TREE = "get_tree"
    SET_REF = "set_ref"
    GET_REF = "get_ref"
    LIST_REFS = "list_refs"
    COMMIT = "commit"
    GET_COMMIT = "get_commit"
    LOG = "log"
    DIFF = "diff"


class PhiGitTask(str, Enum):
    OBJECT_OPERATIONS = "object_operations"
    REF_OPERATIONS = "ref_operations"
    COMMIT_OPERATIONS = "commit_operations"


class PhiGitSpec(str, Enum):
    CONTENT_ADDRESSABLE_STORAGE_V1 = "CONTENT_ADDRESSABLE_STORAGE_V1"
