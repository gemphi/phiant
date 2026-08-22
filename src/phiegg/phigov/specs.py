"""Formal specifications implemented by PhiGov domain agent."""

from enum import Enum


class PhiGovSpec(str, Enum):
    """Specification identifier constants for PhiGov."""

    ENTERPRISE_GOVERNANCE_V1 = "ENTERPRISE_GOVERNANCE_V1"


# P* prefix alias
PGovSpec = PhiGovSpec
