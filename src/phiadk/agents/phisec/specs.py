"""Formal specifications implemented by PhiSec domain agent."""

from enum import Enum


class PhiSecSpec(str, Enum):
    """Specification identifier constants for PhiSec."""

    SECURITY_GOVERNANCE_V1 = "SECURITY_GOVERNANCE_V1"


# P* prefix alias
PSecSpec = PhiSecSpec
