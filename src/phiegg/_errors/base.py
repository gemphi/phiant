"""PhiEgg base exceptions."""

from __future__ import annotations


class PhiEggException(Exception):
    """Root exception for all PhiEgg SDK errors."""

    def __init__(self, message: str = "", *, details: dict | None = None) -> None:
        super().__init__(message)
        self.details = details or {}


class NotAuthenticated(PhiEggException):
    """Raised when no valid credentials are available."""


class PermissionDenied(PhiEggException):
    """Raised when the authenticated identity lacks required permissions."""
