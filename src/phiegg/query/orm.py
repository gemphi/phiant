"""PhiEgg Ontologylogy ORM (Object-Ontologylogy Mapping).

Maps domain ``Node`` entities to/from topological and content-addressed storage.
Provides schema validation, field descriptors, and repository operations.
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Callable, Dict, Generic, List, Optional, Type, TypeVar, Union

from phiegg._core.model_base import ModelBase
from phiegg._core.topology import Edge, Node, SimplexType, Space
from phiegg.phiora.store import StoreClient

T = TypeVar("T", bound=Node)


# ── Field Descriptors ────────────────────────────────────────────────

class Field:
    """Base field descriptor."""

    def __init__(
        self,
        field_type: Type[Any] = str,
        default: Any = None,
        required: bool = False,
        primary_key: bool = False,
    ) -> None:
        self.field_type = field_type
        self.default = default
        self.required = required
        self.primary_key = primary_key
        self.name = ""

    def __set_name__(self, owner: Type[Any], name: str) -> None:
        self.name = name

    def __get__(self, instance: Any, owner: Type[Any]) -> Any:
        if instance is None:
            return self
        return instance.__dict__.get(self.name, self.default)

    def __set__(self, instance: Any, value: Any) -> None:
        if value is None and self.required:
            raise ValueError(f"Field '{self.name}' is required and cannot be None.")
        instance.__dict__[self.name] = value


class StringField(Field):
    def __init__(self, default: str = "", required: bool = False, primary_key: bool = False) -> None:
        super().__init__(field_type=str, default=default, required=required, primary_key=primary_key)


class IntegerField(Field):
    def __init__(self, default: int = 0, required: bool = False) -> None:
        super().__init__(field_type=int, default=default, required=required)


class FloatField(Field):
    def __init__(self, default: float = 0.0, required: bool = False) -> None:
        super().__init__(field_type=float, default=default, required=required)


class RelationshipField:
    """Edge relationship descriptor between nodes."""

    def __init__(self, target_node_type: str, edge_type: str = "relates_to", multiple: bool = False) -> None:
        self.target_node_type = target_node_type
        self.edge_type = edge_type
        self.multiple = multiple
        self.name = ""

    def __set_name__(self, owner: Type[Any], name: str) -> None:
        self.name = name

    def __get__(self, instance: Any, owner: Type[Any]) -> Any:
        if instance is None:
            return self
        return instance.__dict__.get(self.name, [] if self.multiple else None)

    def __set__(self, instance: Any, value: Any) -> None:
        instance.__dict__[self.name] = value


# ── Repository Pattern ───────────────────────────────────────────────

class Repository(Generic[T]):
    """Generic repository managing persistence of ORM Node entities in a topology space."""

    def __init__(self, entity_class: Type[T], store_client: Optional[StoreClient] = None, collection: str = "") -> None:
        self.entity_class = entity_class
        self.store = store_client or StoreClient()
        self.collection = collection or entity_class.__name__.lower()
        self._space = Space(space_type=self.collection)

    def save(self, entity: T, commit_message: Optional[str] = None) -> T:
        """Persist entity node into store collection with git lineage."""
        node_id = getattr(entity, "node_id", None) or str(uuid.uuid4())
        setattr(entity, "node_id", node_id)
        if hasattr(entity, "mark_updated"):
            entity.mark_updated()

        payload = entity.to_dict() if hasattr(entity, "to_dict") else entity.__dict__
        self.store.put(
            collection=self.collection,
            key=node_id,
            value=payload,
            message=commit_message or f"Save {self.entity_class.__name__}:{node_id}",
        )
        self._space.add_node(entity)
        return entity

    def find_by_id(self, node_id: str) -> Optional[T]:
        """Fetch entity by its node identifier."""
        record = self.store.get(self.collection, node_id)
        if not record or not record.value:
            return None
        return self._instantiate(record.value)

    def find_all(self) -> List[T]:
        """Fetch all entities in this collection."""
        records = self.store.values(self.collection)
        return [self._instantiate(v) for v in records if v]

    def filter(self, predicate: Callable[[T], bool]) -> List[T]:
        """Filter entities matching a predicate."""
        return [e for e in self.find_all() if predicate(e)]

    def delete(self, node_id: str, commit_message: Optional[str] = None) -> bool:
        """Delete entity by node identifier."""
        return bool(self.store.put(self.collection, node_id, None, message=commit_message or f"Delete {node_id}"))

    def _instantiate(self, data: Dict[str, Any]) -> T:
        if isinstance(data, self.entity_class):
            return data
        try:
            return self.entity_class(**data)
        except Exception:
            # Fallback for dynamic props
            inst = self.entity_class.__new__(self.entity_class)
            inst.__dict__.update(data)
            return inst
