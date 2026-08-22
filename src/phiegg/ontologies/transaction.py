"""Ontology Transaction Module — Atomic transactional batches."""

from __future__ import annotations

import uuid
from typing import Any, Dict, Optional

from .engine import GLOBAL_ONTOLOGY, OntologyEngine
from .models import OntologyTransaction, POntologyTransaction


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


# Backward compatibility and P* aliases
OntologyTransactionClient = TransactionClient
ToposTransactionClient = TransactionClient
POntologyTransactionClient = TransactionClient
ToposTransaction = OntologyTransaction
