"""Supported task types for PhiGov domain agent."""

from enum import Enum


class PhiGovTask(str, Enum):
    """Strongly-typed task categories for PhiGov (Governance Agent)."""

    COMPLIANCE_CHECK = "compliance_check"
    LINEAGE_AUDIT = "lineage_audit"
    REGULATION_REGISTRY = "regulation_registry"


# P* prefix alias
PGovTask = PhiGovTask
