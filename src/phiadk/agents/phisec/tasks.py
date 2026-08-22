"""Supported task types for PhiSec domain agent."""

from enum import Enum


class PhiSecTask(str, Enum):
    """Strongly-typed task categories for PhiSec (Security Agent)."""

    SECURITY_SCAN = "security_scan"
    ACCESS_AUDIT = "access_audit"
    POLICY_ENFORCEMENT = "policy_enforcement"


# P* prefix alias
PSecTask = PhiSecTask
