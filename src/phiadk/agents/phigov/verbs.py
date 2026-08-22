"""Action verbs for PhiGov domain agent."""

from enum import Enum


class PhiGovVerb(str, Enum):
    """Strongly-typed action verbs for PhiGov (Governance Agent)."""

    CHECK_COMPLIANCE = "check_compliance"
    EVALUATE_POLICY = "evaluate_policy"
    AUDIT_LINEAGE = "audit_lineage"
    REGISTER_REGULATION = "register_regulation"
    GET_COMPLIANCE_SCORE = "get_compliance_score"


# P* prefix alias
PGovVerb = PhiGovVerb
