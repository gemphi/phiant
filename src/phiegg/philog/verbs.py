"""PhiLog Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiLogVerb(str, Enum):
    LOG = "log"
    DEBUG = "debug"
    INFO = "info"
    WARN = "warn"
    ERROR = "error"
    TAIL = "tail"
    QUERY = "query"
    COUNT = "count"
    RECORD_AUDIT = "record_audit"


class PhiLogTask(str, Enum):
    LOGGING_OPERATIONS = "logging_operations"
    QUERY_OPERATIONS = "query_operations"
    AUDIT_OPERATIONS = "audit_operations"


class PhiLogSpec(str, Enum):
    TELEMETRY_ARCHIVAL_V1 = "TELEMETRY_ARCHIVAL_V1"
