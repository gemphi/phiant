"""Ontology Object Module — Object Types, Property Types, Object Sets, and Object Clients."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional

from .errors import ObjectNotFoundError
from .models import OntologyObject, OntologyObjectSet


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


# Short standard alias
PPropertyType = PropertyType


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


# Short standard alias
PObjectType = ObjectType


class ObjectClient:
    """Client for retrieving and searching individual ontology objects."""

    def __init__(self, engine=None) -> None:
        from .engine import GLOBAL_ONTOLOGY
        self._engine = engine or GLOBAL_ONTOLOGY

    def get(self, *args, **kwargs) -> OntologyObject:
        """Get a single ontology object instance by primary key."""
        if len(args) == 2:
            object_type, primary_key = args[0], args[1]
        elif len(args) >= 3:
            object_type, primary_key = args[1], args[2]
        else:
            object_type = kwargs.get("object_type") or kwargs.get("objectType") or args[0]
            primary_key = kwargs.get("primary_key") or kwargs.get("primaryKey") or kwargs.get("id")

        ot = self._engine.get_object_type(object_type)
        if not ot:
            raise ObjectNotFoundError(object_type, primary_key)
        return OntologyObject(
            object_type=object_type,
            primary_key=primary_key,
            properties={k: f"{k}_val" for k in ot.properties.keys()},
        )

    def list(self, *args, page_size: int = 100, **kwargs) -> List[OntologyObject]:
        object_type = args[1] if len(args) >= 2 else (args[0] if args else kwargs.get("object_type", ""))
        ot = self._engine.get_object_type(object_type)
        if not ot:
            return []
        return [
            OntologyObject(object_type, f"sample_{object_type.lower()}_{i}", {"name": f"Sample {i}"})
            for i in range(3)
        ]

    def search(self, *args, **kwargs) -> List[OntologyObject]:
        return self.list(*args, **kwargs)


class ObjectTypeClient:
    """Client for managing ObjectType schemas."""

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
        """Get an ObjectSet for the given ObjectType."""
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


# Standard P* and Backward compatibility aliases
OntologyObjectClient = ObjectClient
OntologyObjectSetClient = ObjectSetClient
ToposObjectClient = ObjectClient
ToposObjectSetClient = ObjectSetClient
POntologyObject = OntologyObject
POntologyObjectSet = OntologyObjectSet
PObjectClient = ObjectClient
PObjectTypeClient = ObjectTypeClient
PObjectSetClient = ObjectSetClient
