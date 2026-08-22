"""PhiLog Task enumeration."""

from enum import Enum


class PhiLogTask(str, Enum):
    LOGGING_OPERATIONS = "logging_operations"
    QUERY_OPERATIONS = "query_operations"
    AUDIT_OPERATIONS = "audit_operations"
