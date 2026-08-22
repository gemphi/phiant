"""PhiADK SDK Errors — unified error hierarchy.

Re-exports all error types.  Mirrors ``foundry_sdk._errors``.
"""

from phiadk._errors.base import NotAuthenticated as NotAuthenticated
from phiadk._errors.base import PermissionDenied as PermissionDenied
from phiadk._errors.base import PhiADKException as PhiADKException
from phiadk._errors.agent_errors import AgentExecutionError as AgentExecutionError
from phiadk._errors.agent_errors import AgentNotFound as AgentNotFound
from phiadk._errors.agent_errors import AgentTimeout as AgentTimeout
from phiadk._errors.agent_errors import SpaceTraversalError as SpaceTraversalError
from phiadk._errors.agent_errors import MorphismFailedError as MorphismFailedError
from phiadk._errors.validation import InvalidParameterError as InvalidParameterError
from phiadk._errors.validation import MissingFieldError as MissingFieldError
from phiadk._errors.validation import ValidationError as ValidationError

__all__ = [
    "PhiADKException",
    "NotAuthenticated",
    "PermissionDenied",
    "AgentNotFound",
    "AgentTimeout",
    "AgentExecutionError",
    "SpaceTraversalError",
    "MorphismFailedError",
    "ValidationError",
    "MissingFieldError",
    "InvalidParameterError",
]
