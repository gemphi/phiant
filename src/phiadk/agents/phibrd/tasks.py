"""PhiBrd Task and Spec enumerations."""

from enum import Enum


class PhiBrdTask(str, Enum):
    ONBOARDING_LIFECYCLE = "onboarding_lifecycle"


class PhiBrdSpec(str, Enum):
    EMPLOYEE_ONBOARDING_LIFECYCLE_V1 = "EMPLOYEE_ONBOARDING_LIFECYCLE_V1"
