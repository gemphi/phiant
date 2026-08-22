"""PhiEgg agent-specific exceptions."""

from __future__ import annotations

from phiegg._errors.base import PhiEggException


class AgentNotFound(PhiEggException):
    """Raised when a requested domain agent does not exist."""


class AgentTimeout(PhiEggException):
    """Raised when an agent operation exceeds its timeout."""


class AgentExecutionError(PhiEggException):
    """Raised when an agent fails during morphism execution."""


class SpaceTraversalError(PhiEggException):
    """Raised when a topology traversal encounters an error.

    This can happen when the traversal crosses a space boundary without
    valid edges, or when filter criteria produce an empty path.
    """


class MorphismFailedError(PhiEggException):
    """Raised when a topology morphism fails to complete.

    Morphisms are structure-preserving transformations — this error
    indicates the transformation could not preserve required invariants.
    """
