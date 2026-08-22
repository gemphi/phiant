"""Ontology Errors Module."""

from __future__ import annotations


class OntologyError(Exception):
    """Base exception for all ontology errors."""
    pass


class ObjectNotFoundError(OntologyError):
    """Raised when an object instance cannot be found in the ontology."""

    def __init__(self, object_type: str, primary_key: str) -> None:
        self.object_type = object_type
        self.primary_key = primary_key
        super().__init__(f"Object of type '{object_type}' with primary key '{primary_key}' not found in ontology.")


class LinkTypeNotFoundError(OntologyError):
    """Raised when a link type is not found in the ontology."""

    def __init__(self, link_type: str) -> None:
        self.link_type = link_type
        super().__init__(f"LinkType '{link_type}' not found in ontology.")


class ActionExecutionError(OntologyError):
    """Raised when an ontology action execution fails."""

    def __init__(self, action_type: str, reason: str) -> None:
        self.action_type = action_type
        self.reason = reason
        super().__init__(f"Action '{action_type}' failed: {reason}")


# Backward alias
ToposError = OntologyError
