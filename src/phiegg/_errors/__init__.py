"""PhiEgg SDK Errors — unified error hierarchy.

Re-exports all error types.  Mirrors ``foundry_sdk._errors``.
"""

from phiegg._errors.base import NotAuthenticated as NotAuthenticated
from phiegg._errors.base import PermissionDenied as PermissionDenied
from phiegg._errors.base import PhiEggException as PhiEggException
from phiegg._errors.agent_errors import AgentExecutionError as AgentExecutionError
from phiegg._errors.agent_errors import AgentNotFound as AgentNotFound
from phiegg._errors.agent_errors import AgentTimeout as AgentTimeout
from phiegg._errors.agent_errors import SpaceTraversalError as SpaceTraversalError
from phiegg._errors.agent_errors import MorphismFailedError as MorphismFailedError
from phiegg._errors.validation import InvalidParameterError as InvalidParameterError
from phiegg._errors.validation import MissingFieldError as MissingFieldError
from phiegg._errors.validation import ValidationError as ValidationError

__all__ = [
    "PhiEggException",
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
