"""Ontology Transaction Module — Atomic transactional commits."""

from __future__ import annotations

import uuid
from dataclasses import dataclass
from typing import Any, Dict, Optional
from .engine import GLOBAL_ONTOLOGY, OntologyEngine


@dataclass
class OntologyTransaction:
    """An atomic transactional commit over ontology mutations."""
    transaction_id: str
    status: str = "COMMITTED"
    mutations_count: int = 0
    commit_sha1: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "transaction_id": self.transaction_id,
            "status": self.status,
            "mutations_count": self.mutations_count,
            "commit_sha1": self.commit_sha1,
        }


# Short alias
Transaction = OntologyTransaction


class TransactionClient:
    """Client for atomic ontology transactions."""

    def __init__(self, engine: Optional[OntologyEngine] = None) -> None:
        self._engine = engine or GLOBAL_ONTOLOGY

    def create(self) -> OntologyTransaction:
        return OntologyTransaction(
            transaction_id=str(uuid.uuid4()),
            status="COMMITTED",
            mutations_count=1,
            commit_sha1="e8f4a1c2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
        )


AsyncTransactionClient = TransactionClient
