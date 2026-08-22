"""Action verbs for PhiSec domain agent."""

from enum import Enum


class PhiSecVerb(str, Enum):
    """Strongly-typed action verbs for PhiSec (Security Agent)."""

    SCAN_VULNERABILITY = "scan_vulnerability"
    AUDIT_ACCESS = "audit_access"
    VERIFY_TOKEN = "verify_token"
    ENFORCE_POLICY = "enforce_policy"
    QUARANTINE_THREAT = "quarantine_threat"


# P* prefix alias
PSecVerb = PhiSecVerb
