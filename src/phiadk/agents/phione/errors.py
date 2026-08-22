"""PhiOne domain errors."""

from __future__ import annotations

from phiadk._errors.base import PhiADKException


class EmployeeNotFound(PhiADKException):
    """Raised when an employee node cannot be located in the HR space."""


class IdentityProvisionError(PhiADKException):
    """Raised when provisioning a new identity morphism fails."""


class LeaveBalanceError(PhiADKException):
    """Raised when leave balance traversal returns inconsistent data."""
