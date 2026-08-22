"""Ontology Models Module — Entities, Objects, ObjectSets, Interfaces, and Transactions."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class OntologyObject:
    """A runtime instance of an Ontology Object Type."""
    object_type: str
    primary_key: str
    properties: Dict[str, Any] = field(default_factory=dict)
    version: str = "1.0.0"

    def get(self, key: str, default: Any = None) -> Any:
        return self.properties.get(key, default)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "object_type": self.object_type,
            "primary_key": self.primary_key,
            "properties": self.properties,
            "version": self.version,
        }


@dataclass
class OntologyObjectSet:
    """A collection of Ontology Objects with query, filter, and aggregation."""
    object_type: str
    objects: List[OntologyObject] = field(default_factory=list)

    def filter(self, predicate) -> OntologyObjectSet:
        filtered = [obj for obj in self.objects if predicate(obj)]
        return OntologyObjectSet(self.object_type, filtered)

    def count(self) -> int:
        return len(self.objects)

    def __len__(self) -> int:
        return len(self.objects)

    def __iter__(self):
        return iter(self.objects)

    def __getitem__(self, index):
        return self.objects[index]

    def to_list(self) -> List[Dict[str, Any]]:
        return [obj.to_dict() for obj in self.objects]


@dataclass
class OntologyInterface:
    """A polymorphic ontology interface contract across multiple Object Types."""
    api_name: str
    display_name: str
    description: str = ""
    implemented_by: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "implemented_by": self.implemented_by,
        }


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


# Standard P* and Backward Aliases
POntologyObject = OntologyObject
POntologyObjectSet = OntologyObjectSet
POntologyInterface = OntologyInterface
POntologyTransaction = OntologyTransaction
ToposObject = OntologyObject
ToposObjectSet = OntologyObjectSet
ToposInterface = OntologyInterface
ToposTransaction = OntologyTransaction
PToposObject = OntologyObject
PToposObjectSet = OntologyObjectSet
PToposInterface = OntologyInterface
PToposTransaction = OntologyTransaction
