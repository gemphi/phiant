"""PhiADK base exceptions."""

from __future__ import annotations


class PhiADKException(Exception):
    """Root exception for all PhiADK SDK errors."""

    def __init__(self, message: str = "", *, details: dict | None = None) -> None:
        super().__init__(message)
        self.details = details or {}


class NotAuthenticated(PhiADKException):
    """Raised when no valid credentials are available."""


class PermissionDenied(PhiADKException):
    """Raised when the authenticated identity lacks required permissions."""
