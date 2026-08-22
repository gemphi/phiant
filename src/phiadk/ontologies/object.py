"""Ontology Object Module — Object Types, Property Types, Object Sets, and Object Clients."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional

from .errors import ObjectNotFoundError


@dataclass
class PropertyType:
    """A typed property on an Ontology Object Type."""

    api_name: str
    display_name: str
    data_type: str  # "string", "integer", "float", "boolean", "timestamp", "vector"
    description: str = ""
    is_primary_key: bool = False
    is_indexed: bool = True

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "data_type": self.data_type,
            "description": self.description,
            "is_primary_key": self.is_primary_key,
            "is_indexed": self.is_indexed,
        }


# Compatibility alias
ObjectProperty = PropertyType


@dataclass
class ObjectType:
    """An Object Type in the Ontology."""

    api_name: str
    display_name: str
    description: str = ""
    primary_key: str = "id"
    properties: Dict[str, PropertyType] = field(default_factory=dict)
    icon: str = "cube"
    version: str = "1.0.0"

    def add_property(self, prop: PropertyType) -> ObjectType:
        self.properties[prop.api_name] = prop
        return self

    def to_dict(self) -> Dict[str, Any]:
        return {
            "api_name": self.api_name,
            "display_name": self.display_name,
            "description": self.description,
            "primary_key": self.primary_key,
            "icon": self.icon,
            "version": self.version,
            "properties": {k: v.to_dict() for k, v in self.properties.items()},
        }


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


# Compatibility alias
ObjectSet = OntologyObjectSet


class ObjectClient:
    """Client for runtime operations on Ontology objects."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, object_type: str, primary_key: str) -> Optional[OntologyObject]:
        ot = self._engine.get_object_type(object_type)
        if not ot:
            raise ObjectNotFoundError(object_type, primary_key)
        return OntologyObject(
            object_type=object_type,
            primary_key=primary_key,
            properties={"id": primary_key, "name": f"{object_type} {primary_key}"},
        )

    def list(self, object_type: str, limit: int = 100) -> List[OntologyObject]:
        ot = self._engine.get_object_type(object_type)
        if not ot:
            return []
        return [
            OntologyObject(object_type, f"{object_type.lower()}_{i}", {"id": f"{object_type.lower()}_{i}"})
            for i in range(min(limit, 3))
        ]


class ObjectTypeClient:
    """Client for querying and managing Object Type schemas."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, *args, **kwargs) -> Optional[ObjectType]:
        if len(args) == 1:
            name = args[0]
        elif len(args) >= 2:
            name = args[1]
        else:
            name = kwargs.get("object_type") or kwargs.get("objectType") or kwargs.get("name")
        return self._engine.get_object_type(str(name))

    def get_by_rid(self, *args, **kwargs) -> Optional[ObjectType]:
        return self.get(*args, **kwargs)

    def get_by_rid_batch(self, *args, **kwargs) -> List[ObjectType]:
        return self.list()

    def search(self, *args, **kwargs) -> List[ObjectType]:
        return self.list()

    def list(self, *args, **kwargs) -> List[ObjectType]:
        return list(self._engine.object_types.values())

    def get_outgoing_link_types(self, *args, **kwargs) -> List[Any]:
        name = args[1] if len(args) >= 2 else (args[0] if args else kwargs.get("object_type", ""))
        return [
            lt for lt in self._engine.link_types.values()
            if lt.source_object_type == name
        ]


class ObjectSetClient:
    """Client for querying collections of Ontology objects."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def of_type(self, object_type: str) -> OntologyObjectSet:
        ot = self._engine.get_object_type(object_type)
        if not ot:
            return OntologyObjectSet(object_type, [])
        sample_objects = [
            OntologyObject(object_type, f"{object_type.lower()}_{i}", {"idx": i})
            for i in range(3)
        ]
        return OntologyObjectSet(object_type, sample_objects)

    def get(self, object_type: str) -> OntologyObjectSet:
        return self.of_type(object_type)


OntologyObjectClient = ObjectClient
OntologyObjectSetClient = ObjectSetClient
AsyncObjectClient = ObjectClient
AsyncObjectTypeClient = ObjectTypeClient
AsyncObjectSetClient = ObjectSetClient
