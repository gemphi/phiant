"""PhiADK SDK Model Base.

Provides ``ModelBase`` - the base class for all domain-specific models.
Domain models extend both ``ModelBase`` and topology primitives
(``Node``, ``Space``, etc.) to gain serialization, versioning, and git-like lineage.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, Optional


@dataclass
class ModelBase:
    """Base class for all PhiADK domain models.

    Provides common serialization, timestamp tracking, versioning,
    and provenance/git-commit metadata that all domain models inherit.
    """

    _model_type: str = ""
    _model_version: str = "1.0.0"
    _commit_sha1: str = ""
    _parent_sha1: str = ""
    _updated_at: Optional[datetime] = None
    _provenance: Dict[str, Any] = field(default_factory=dict)

    def mark_updated(self) -> None:
        """Record the current timestamp as the last update time."""
        self._updated_at = datetime.now(timezone.utc)

    def set_provenance(self, agent: str, operation: str, commit_sha1: str = "") -> None:
        """Track which agent, operation, and commit produced this model."""
        self._provenance = {
            "agent": agent,
            "operation": operation,
            "commit_sha1": commit_sha1 or self._commit_sha1,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        if commit_sha1:
            self._commit_sha1 = commit_sha1

    def base_dict(self) -> Dict[str, Any]:
        """Return base metadata fields for inclusion in ``to_dict``."""
        return {
            "_model_type": self._model_type,
            "_model_version": self._model_version,
            "_commit_sha1": self._commit_sha1,
            "_parent_sha1": self._parent_sha1,
            "_updated_at": self._updated_at.isoformat() if self._updated_at else None,
            "_provenance": self._provenance,
        }

    def to_dict(self) -> Dict[str, Any]:
        """Return full dictionary representation of model."""
        import dataclasses
        if dataclasses.is_dataclass(self):
            d = dataclasses.asdict(self)
        else:
            d = dict(self.__dict__)
        d.update(self.base_dict())
        return d


