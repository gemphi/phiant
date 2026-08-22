"""PhiEgg Multi-Model Query Engine.

Provides 5 unified query paradigms:
    ORM — Object-Ontologylogy Mapping & Repositories
    VQL — Vector Query Language for semantic similarity
    RQL — Relational Query Language for structured tabular operations
    OQL — Object / Ontologylogy Query Language for graph traversals
    QML — Quantum Model Language for quantum superposition & Born rule measurement
"""

from phiegg.query.orm import Field as Field
from phiegg.query.orm import FloatField as FloatField
from phiegg.query.orm import IntegerField as IntegerField
from phiegg.query.orm import RelationshipField as RelationshipField
from phiegg.query.orm import Repository as Repository
from phiegg.query.orm import StringField as StringField
from phiegg.query.oql import OQL as OQL
from phiegg.query.qml import QML as QML
from phiegg.query.qml import QMLResult as QMLResult
from phiegg.query.qml import QuantumStateNode as QuantumStateNode
from phiegg.query.rql import RQL as RQL
from phiegg.query.vql import VQL as VQL

__all__ = [
    # ORM
    "Repository", "Field", "StringField", "IntegerField", "FloatField", "RelationshipField",
    # Query Builders
    "VQL", "RQL", "OQL", "QML", "QMLResult", "QuantumStateNode",
]
