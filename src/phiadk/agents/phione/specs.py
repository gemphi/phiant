"""PhiOne Spec enumeration — capability claims."""

from enum import Enum


class PhiOneSpec(str, Enum):
    """Capability claims guaranteed by PhiOne."""

    HR_IDENTITY_DIRECTORY_V1 = "HR_IDENTITY_DIRECTORY_V1"
    LEAVE_ACCURAL_MANAGEMENT_V1 = "LEAVE_ACCURAL_MANAGEMENT_V1"
    USER_IDENTITY_SSO_V1 = "USER_IDENTITY_SSO_V1"
