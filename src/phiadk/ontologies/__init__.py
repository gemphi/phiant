"""Phient Ontologies Package — Concise, modular 1:1 Palantir Symmetrical Ontology Engine."""

from __future__ import annotations

from .action import (
    ActionClient,
    ActionParameter,
    ActionType,
    ActionTypeClient,
    ActionTypeMetadata,
    ActionTypeFullMetadata,
    AsyncActionClient,
    AsyncActionTypeClient,
)
from .attachment import (
    Attachment,
    AttachmentClient,
    AttachmentProperty,
    AsyncAttachmentClient,
)
from .cipher import (
    CipherClient,
    CipherProperty,
    CipherTextProperty,
    AsyncCipherClient,
)
from .engine import (
    GLOBAL_ONTOLOGY,
    GLOBAL_TOPOS,
    OntologyEngine,
    POntologyEngine,
    ToposEngine,
)

from .errors import (
    ActionExecutionError,
    LinkTypeNotFoundError,
    ObjectNotFoundError,
    OntologyError,
)
from .geo import (
    GeoPoint,
    GeoShape,
    GeoProperty,
    GeotemporalSeriesProperty,
    GeoClient,
    GeotemporalClient,
    AsyncGeoClient,
    AsyncGeotemporalClient,
)
from .interface import (
    Interface,
    InterfaceClient,
    InterfaceProperty,
    OntologyInterface,
    AsyncInterfaceClient,
)
from .link import (
    LinkClient,
    LinkType,
    LinkedObjectClient,
    AsyncLinkClient,
    AsyncLinkedObjectClient,
)
from .media import (
    MediaClient,
    MediaProperty,
    MediaReference,
    MediaReferenceProperty,
    AsyncMediaClient,
)
from .object import (
    ObjectClient,
    ObjectProperty,
    ObjectSet,
    ObjectSetClient,
    ObjectType,
    ObjectTypeClient,
    OntologyObject,
    OntologyObjectSet,
    PropertyType,
    AsyncObjectClient,
    AsyncObjectSetClient,
    AsyncObjectTypeClient,
    OntologyObjectClient,
    OntologyObjectSetClient,
)
from .query import (
    Query,
    QueryClient,
    QueryParameter,
    QueryType,
    QueryTypeClient,
    AsyncQueryClient,
    AsyncQueryTypeClient,
)
from .scenario import (
    Scenario,
    OntologyScenario,
    ScenarioClient,
    AsyncScenarioClient,
)
from .time import (
    TimeProperty,
    TimeSeriesProperty,
    TimeSeriesPropertyV2,
    TimeSeriesValueBankProperty,
    TimeSeriesPoint,
    TimeSeriesClient,
    AsyncTimeSeriesClient,
    TimeClient,
    AsyncTimeClient,
)
from .transaction import (
    Transaction,
    OntologyTransaction,
    TransactionClient,
    AsyncTransactionClient,
)
from .value import (
    ValueType,
    ValueTypeClient,
    AsyncValueTypeClient,
)
from ._client import (
    AsyncOntologyClient,
    AsyncOntologiesClient,
    OntologyClient,
    OntologiesClient,
)

Ontology = OntologyClient

__all__ = [
    # Top-Level Engine & Schema
    "Ontology",
    "OntologyClient",
    "AsyncOntologyClient",
    "OntologiesClient",
    "AsyncOntologiesClient",
    "OntologyEngine",
    "POntologyEngine",
    "ToposEngine",
    "GLOBAL_ONTOLOGY",
    "GLOBAL_TOPOS",


    # Core Entity Types (Clean Concise Naming)
    "ObjectType",
    "PropertyType",
    "ObjectProperty",
    "ObjectSet",
    "LinkType",
    "ActionType",
    "ActionParameter",
    "ActionTypeMetadata",
    "ActionTypeFullMetadata",
    "OntologyObject",
    "OntologyObjectSet",
    "OntologyInterface",
    "Interface",
    "InterfaceProperty",
    "OntologyTransaction",
    "Transaction",
    "OntologyScenario",
    "Scenario",
    "ValueType",
    "QueryType",
    "Query",
    "QueryParameter",

    # Property Specializations (Clean Concise 1-2 Word Naming)
    "Attachment",
    "AttachmentProperty",
    "CipherProperty",
    "CipherTextProperty",
    "MediaReference",
    "MediaProperty",
    "MediaReferenceProperty",
    "GeoPoint",
    "GeoShape",
    "GeoProperty",
    "GeotemporalSeriesProperty",
    "TimeProperty",
    "TimeSeriesPoint",
    "TimeSeriesProperty",
    "TimeSeriesPropertyV2",
    "TimeSeriesValueBankProperty",

    # Specialized Clients
    "ObjectClient",
    "AsyncObjectClient",
    "ObjectSetClient",
    "AsyncObjectSetClient",
    "ObjectTypeClient",
    "AsyncObjectTypeClient",
    "ActionClient",
    "AsyncActionClient",
    "ActionTypeClient",
    "AsyncActionTypeClient",
    "LinkClient",
    "AsyncLinkClient",
    "LinkedObjectClient",
    "AsyncLinkedObjectClient",
    "InterfaceClient",
    "AsyncInterfaceClient",
    "TransactionClient",
    "AsyncTransactionClient",
    "ScenarioClient",
    "AsyncScenarioClient",
    "ValueTypeClient",
    "AsyncValueTypeClient",
    "AttachmentClient",
    "AsyncAttachmentClient",
    "CipherClient",
    "AsyncCipherClient",
    "GeoClient",
    "AsyncGeoClient",
    "GeotemporalClient",
    "AsyncGeotemporalClient",
    "MediaClient",
    "AsyncMediaClient",
    "TimeClient",
    "AsyncTimeClient",
    "TimeSeriesClient",
    "AsyncTimeSeriesClient",
    "QueryClient",
    "AsyncQueryClient",
    "QueryTypeClient",
    "AsyncQueryTypeClient",

    # Errors
    "OntologyError",
    "ObjectNotFoundError",
    "LinkTypeNotFoundError",
    "ActionExecutionError",
]
