"""PhiGit Task enumeration."""

from enum import Enum


class PhiGitTask(str, Enum):
    OBJECT_OPERATIONS = "object_operations"
    REF_OPERATIONS = "ref_operations"
    COMMIT_OPERATIONS = "commit_operations"
