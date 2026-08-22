"""PhiOne Task enumeration — capability chapters."""

from enum import Enum


class PhiOneTask(str, Enum):
    """Tasks / chapters exposed by the PhiOne agent."""

    EMPLOYEE_DIRECTORY = "employee_directory"
    LEAVE_MANAGEMENT = "leave_management"
    IDENTITY_MANAGEMENT = "identity_management"
