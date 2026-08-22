"""PhiEgg validation exceptions."""

from __future__ import annotations

from phiegg._errors.base import PhiEggException


class ValidationError(PhiEggException):
    """Raised when input data fails validation."""


class MissingFieldError(ValidationError):
    """Raised when a required field is absent."""

    def __init__(self, field_name: str, **kwargs) -> None:
        super().__init__(f"Missing required field: '{field_name}'", **kwargs)
        self.field_name = field_name


class InvalidParameterError(ValidationError):
    """Raised when a parameter value is out of range or malformed."""

    def __init__(self, param: str, value: object, reason: str = "", **kwargs) -> None:
        msg = f"Invalid parameter '{param}' = {value!r}"
        if reason:
            msg += f": {reason}"
        super().__init__(msg, **kwargs)
        self.param = param
        self.value = value
