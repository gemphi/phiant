"""PhiOne domain errors."""

from __future__ import annotations

from phiegg._errors.base import PhiEggException


class EmployeeNotFound(PhiEggException):
    """Raised when an employee node cannot be located in the HR space."""


class IdentityProvisionError(PhiEggException):
    """Raised when provisioning a new identity morphism fails."""


class LeaveBalanceError(PhiEggException):
    """Raised when leave balance traversal returns inconsistent data."""
