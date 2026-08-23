"""PhiADK SDK — Ontologylogy-based Agent Platform.

The unified Python SDK for the PhiADK ecosystem. Modelled after
Palantir's ``foundry_sdk`` with topology concepts replacing ontology
jargon, strict data separation, and a universal recursive agent lifecycle.

Domain agents (each ``phi*`` — 3-letter suffix):

    phione — HR & Identity (user identity, employees, groups, leave)
    phical — Quantum Learning (semantic superposition search, circuits, training)
    phirag — Knowledge Retrieval & Augmented Generation
    phidoc — Documentation (workspace knowledge, Notion sync)
    phibot — Automation (playbook execution, workflows)
    phibrd — Onboarding (cross-domain lifecycle orchestration)
    phiora — Data Layer (content-addressed git KV store, vector search, DataSet resolution)
    phigit — Git-Core Storage Engine (blobs, trees, commits, refs, diffs)
    philog — Distributed Telemetry (structured logging, audit trails)
    phillm — Language Models (OpenAI, Anthropic, Gemini multi-provider access)
    phimen — Virtual CEO (executive strategic orchestration, recursive evaluation)

Query & ORM Layer:
    ORM    — Object-Ontologylogy Mapping & Repositories
    VQL    — Vector Query Language for semantic similarity
    RQL    — Relational Query Language for structured tabular operations
    OQL    — Object / Ontologylogy Query Language for graph traversals
"""

# Core types
from phiadk._core.auth import ApiKeyAuth as ApiKeyAuth
from phiadk._core.auth import Auth as Auth
from phiadk._core.auth import EnvAuth as EnvAuth
from phiadk._core.auth import TokenAuth as TokenAuth
from phiadk._core.config import Config as Config
from phiadk._core.api_client import ApiClient as ApiClient
from phiadk._core.api_client import AsyncApiClient as AsyncApiClient
from phiadk._core.api_client import ApiResponse as ApiResponse
from phiadk._core.api_client import AsyncPageIterator as AsyncPageIterator
from phiadk._core.api_client import PageIterator as PageIterator
from phiadk._core.api_client import RequestInfo as RequestInfo
from phiadk._core.api_client import SseEvent as SseEvent
from phiadk._core.api_client import StreamedApiResponse as StreamedApiResponse
from phiadk._core.api_client import async_with_raw_response as async_with_raw_response
from phiadk._core.api_client import async_with_streaming_response as async_with_streaming_response
from phiadk._core.api_client import with_raw_response as with_raw_response
from phiadk._core.api_client import with_streaming_response as with_streaming_response
from phiadk._core.agent_base import AgentContext as AgentContext
from phiadk._core.agent_base import DataSet as DataSet
from phiadk._core.agent_base import Phase as Phase
from phiadk._core.agent_base import PhiAgent as PhiAgent
from phiadk._core.agent_card import AgentCard as AgentCard
from phiadk._core.agent_card import AgentLayer as AgentLayer
from phiadk._core.agent_card import PhiSpec as PhiSpec
from phiadk._core.agent_card import PhiTask as PhiTask
from phiadk._core.agent_card import PhiVerb as PhiVerb

# Ontologylogy primitives
from phiadk._core.topology import Edge as Edge
from phiadk._core.topology import Fiber as Fiber
from phiadk._core.topology import Manifold as Manifold
from phiadk._core.topology import Morphism as Morphism
from phiadk._core.topology import Node as Node
from phiadk._core.topology import SimplexType as SimplexType
from phiadk._core.topology import Space as Space
from phiadk._core.topology import Ontologylogy as Ontologylogy
from phiadk._core.topology import Traversal as Traversal

# Errors
from phiadk._errors import AgentExecutionError as AgentExecutionError
from phiadk._errors import AgentNotFound as AgentNotFound
from phiadk._errors import AgentTimeout as AgentTimeout
from phiadk._errors import MorphismFailedError as MorphismFailedError
from phiadk._errors import NotAuthenticated as NotAuthenticated
from phiadk._errors import PermissionDenied as PermissionDenied
from phiadk._errors import PhiADKException as PhiADKException
from phiadk._errors import SpaceTraversalError as SpaceTraversalError
from phiadk._errors import ValidationError as ValidationError

# Domain Agents (Clean Phi* naming)
from phiadk.agents.phione import PhiOneAgent as PhiOneAgent, PhiOneAgent as PhiOne
from phiadk.agents.phical import PhiCalAgent as PhiCalAgent, PhiCalAgent as PhiCal
from phiadk.agents.phirag import PhiRAGAgent as PhiRAGAgent, PhiRAGAgent as PhiRAG
from phiadk.agents.phidoc import PhiDocAgent as PhiDocAgent, PhiDocAgent as PhiDoc
from phiadk.agents.phibot import PhiBotAgent as PhiBotAgent, PhiBotAgent as PhiBot
from phiadk.agents.phibrd import PhiBrdAgent as PhiBrdAgent, PhiBrdAgent as PhiBrd
from phiadk.agents.phiora import PhiOraAgent as PhiOraAgent, PhiOraAgent as PhiOra
from phiadk.agents.phigit import PhiGitAgent as PhiGitAgent, PhiGitAgent as PhiGit
from phiadk.agents.philog import PhiLogAgent as PhiLogAgent, PhiLogAgent as PhiLog
from phiadk.agents.phillm import PhiLLMAgent as PhiLLMAgent, PhiLLMAgent as PhiLLM
from phiadk.agents.phisec import PhiSecAgent as PhiSecAgent, PhiSecAgent as PhiSec
from phiadk.agents.phigov import PhiGovAgent as PhiGovAgent, PhiGovAgent as PhiGov
from phiadk.agents.phibus import PhiBusAgent as PhiBusAgent, PhiBusAgent as PhiBus
from phiadk.agents.phimen import PhiMenAgent as PhiMenAgent, PhiMenAgent as PhiMen

# Domain Agent Cards
from phiadk.agents.phione import PHIONE_CARD as PHIONE_CARD
from phiadk.agents.phical import PHICAL_CARD as PHICAL_CARD
from phiadk.agents.phirag import PHIRAG_CARD as PHIRAG_CARD
from phiadk.agents.phidoc import PHIDOC_CARD as PHIDOC_CARD
from phiadk.agents.phibot import PHIBOT_CARD as PHIBOT_CARD
from phiadk.agents.phibrd import PHIBRD_CARD as PHIBRD_CARD
from phiadk.agents.phiora import PHIORA_CARD as PHIORA_CARD
from phiadk.agents.phigit import PHIGIT_CARD as PHIGIT_CARD
from phiadk.agents.philog import PHILOG_CARD as PHILOG_CARD
from phiadk.agents.phillm import PHILLM_CARD as PHILLM_CARD
from phiadk.agents.phisec import PHISEC_CARD as PHISEC_CARD
from phiadk.agents.phigov import PHIGOV_CARD as PHIGOV_CARD
from phiadk.agents.phibus import PHIBUS_CARD as PHIBUS_CARD
from phiadk.agents.phimen import PHIMEN_CARD as PHIMEN_CARD

# P* Prefix Standard
from phiadk.agents.phibus.models import PBusEvent as PBusEvent
from phiadk.agents.phibus.bus import PBusClient as PBusClient
from phiadk._core import (
    PAgent as PAgent,
    PAgentCard as PAgentCard,
    PAgentContext as PAgentContext,
    PNode as PNode,
    PSpace as PSpace,
    PMorphism as PMorphism,
    PFiber as PFiber,
    PTraversal as PTraversal,
    PManifold as PManifold,
)

# Ontologies Layer
from phiadk.ontologies import ObjectType as ObjectType
from phiadk.ontologies import PropertyType as PropertyType
from phiadk.ontologies import LinkType as LinkType
from phiadk.ontologies import ActionType as ActionType
from phiadk.ontologies import ActionParameter as ActionParameter
from phiadk.ontologies import POntologyEngine as POntologyEngine
from phiadk.ontologies import GLOBAL_ONTOLOGY as GLOBAL_ONTOLOGY


# Query Engine & ORM
from phiadk.query import OQL as OQL
from phiadk.query import RQL as RQL
from phiadk.query import VQL as VQL
from phiadk.query import QML as QML
from phiadk.query import Field as Field
from phiadk.query import FloatField as FloatField
from phiadk.query import IntegerField as IntegerField
from phiadk.query import RelationshipField as RelationshipField
from phiadk.query import Repository as Repository
from phiadk.query import StringField as StringField

# Domain Typed Verbs, Tasks, Specs
from phiadk.agents.phione.verbs import PhiOneVerb as PhiOneVerb
from phiadk.agents.phione.tasks import PhiOneTask as PhiOneTask
from phiadk.agents.phione.specs import PhiOneSpec as PhiOneSpec

from phiadk.agents.phical.verbs import PhiCalVerb as PhiCalVerb
from phiadk.agents.phical.tasks import PhiCalTask as PhiCalTask
from phiadk.agents.phical.specs import PhiCalSpec as PhiCalSpec

from phiadk.agents.phirag.verbs import PhiRAGVerb as PhiRAGVerb
from phiadk.agents.phirag.tasks import PhiRAGTask as PhiRAGTask
from phiadk.agents.phirag.specs import PhiRAGSpec as PhiRAGSpec

from phiadk.agents.phidoc.verbs import PhiDocVerb as PhiDocVerb
from phiadk.agents.phidoc.tasks import PhiDocTask as PhiDocTask
from phiadk.agents.phidoc.specs import PhiDocSpec as PhiDocSpec
from phiadk.agents.phibot.verbs import PhiBotVerb as PhiBotVerb
from phiadk.agents.phibot.tasks import PhiBotTask as PhiBotTask
from phiadk.agents.phibot.specs import PhiBotSpec as PhiBotSpec
from phiadk.agents.phibrd.verbs import PhiBrdVerb as PhiBrdVerb
from phiadk.agents.phibrd.tasks import PhiBrdTask as PhiBrdTask
from phiadk.agents.phibrd.specs import PhiBrdSpec as PhiBrdSpec
from phiadk.agents.phiora.verbs import PhiOraVerb as PhiOraVerb
from phiadk.agents.phiora.tasks import PhiOraTask as PhiOraTask
from phiadk.agents.phiora.specs import PhiOraSpec as PhiOraSpec
from phiadk.agents.phigit.verbs import PhiGitVerb as PhiGitVerb
from phiadk.agents.phigit.tasks import PhiGitTask as PhiGitTask
from phiadk.agents.phigit.specs import PhiGitSpec as PhiGitSpec
from phiadk.agents.philog.verbs import PhiLogVerb as PhiLogVerb
from phiadk.agents.philog.tasks import PhiLogTask as PhiLogTask
from phiadk.agents.philog.specs import PhiLogSpec as PhiLogSpec
from phiadk.agents.phillm.verbs import PhiLLMVerb as PhiLLMVerb
from phiadk.agents.phillm.tasks import PhiLLMTask as PhiLLMTask
from phiadk.agents.phillm.specs import PhiLLMSpec as PhiLLMSpec
from phiadk.agents.phimen.verbs import PhiMenVerb as PhiMenVerb
from phiadk.agents.phimen.tasks import PhiMenTask as PhiMenTask
from phiadk.agents.phimen.specs import PhiMenSpec as PhiMenSpec

# Git & Telemetry Types
from phiadk.agents.phigit import Blob as Blob
from phiadk.agents.phigit import Commit as Commit
from phiadk.agents.phigit import DiffResult as DiffResult
from phiadk.agents.phigit import GitEngine as GitEngine
from phiadk.agents.phigit import Ref as Ref
from phiadk.agents.phigit import Tree as Tree
from phiadk.agents.phigit import TreeEntry as TreeEntry
from phiadk.agents.philog import AuditEntry as AuditEntry
from phiadk.agents.philog import LogLevel as LogLevel
from phiadk.agents.philog import LogRecord as LogRecord
from phiadk.agents.philog import StructuredLogger as StructuredLogger


# Ontologies Platform Classes
from phiadk.ontologies import (
    OntologyClient as OntologyClient,
    OntologiesClient as OntologiesClient,
    AsyncOntologyClient as AsyncOntologyClient,
    AsyncOntologiesClient as AsyncOntologiesClient,
    Ontology as Ontology,
    OntologyEngine as OntologyEngine,
    GLOBAL_ONTOLOGY as GLOBAL_ONTOLOGY,
    ObjectType as ObjectType,
    PropertyType as PropertyType,
    ObjectProperty as ObjectProperty,
    ObjectSet as ObjectSet,
    LinkType as LinkType,
    ActionType as ActionType,
    ActionParameter as ActionParameter,
    ActionTypeFullMetadata as ActionTypeFullMetadata,
    OntologyObject as OntologyObject,
    OntologyObjectSet as OntologyObjectSet,
    OntologyInterface as OntologyInterface,
    Interface as Interface,
    OntologyTransaction as OntologyTransaction,
    Transaction as Transaction,
    OntologyScenario as OntologyScenario,
    Scenario as Scenario,
    ValueType as ValueType,
    QueryType as QueryType,
    Query as Query,
    QueryParameter as QueryParameter,
    Attachment as Attachment,
    AttachmentProperty as AttachmentProperty,
    CipherTextProperty as CipherTextProperty,
    MediaReference as MediaReference,
    MediaReferenceProperty as MediaReferenceProperty,
    GeoPoint as GeoPoint,
    GeoShape as GeoShape,
    GeotemporalSeriesProperty as GeotemporalSeriesProperty,
    TimeSeriesPoint as TimeSeriesPoint,
    TimeSeriesProperty as TimeSeriesProperty,
    TimeSeriesPropertyV2 as TimeSeriesPropertyV2,
)


# AIP API Platform
from phiadk.phiapi import create_app as create_app

# SDK Client (Phi* First & Clean Aliases)
from phiadk.client import (
    PhiClient as PhiClient,
    PhiAsyncClient as PhiAsyncClient,
    PhiAsync as PhiAsync,
    PhientClient as PhientClient,
    PhientAsyncClient as PhientAsyncClient,
    Client as Client,
    AsyncClient as AsyncClient,
    PClient as PClient,
    PAsyncClient as PAsyncClient,
    # Backward compatibility
    AsyncPhiClient as AsyncPhiClient,
    PhiADKClient as PhiADKClient,
    AsyncPhiADKClient as AsyncPhiADKClient,
)


# Version
from phiadk._version import __version__ as __version__

__all__ = [
    "__version__",
    # Master Client (Phi* First)
    "PhiClient",
    "PhiAsyncClient",
    "PhiAsync",
    "PhientClient",
    "PhientAsyncClient",
    "Client",
    "AsyncClient",
    "PClient",
    "PAsyncClient",
    "PhiADKClient",
    "AsyncPhiADKClient",

    # Domain Agents (Clean Phi* naming)
    "PhiOne",
    "PhiCal",
    "PhiRAG",
    "PhiDoc",
    "PhiBot",
    "PhiBrd",
    "PhiOra",
    "PhiGit",
    "PhiLog",
    "PhiLLM",
    "PhiSec",
    "PhiGov",
    "PhiBus",
    "PhiMen",


    # Ontologies
    "Ontology",
    "OntologyClient",
    "AsyncOntologyClient",
    "OntologiesClient",
    "AsyncOntologiesClient",
    "OntologyEngine",
    "GLOBAL_ONTOLOGY",
    "ObjectType",
    "PropertyType",
    "ObjectProperty",
    "ObjectSet",
    "LinkType",
    "ActionType",
    "ActionParameter",
    "ActionTypeFullMetadata",
    "OntologyObject",
    "OntologyObjectSet",
    "OntologyInterface",
    "Interface",
    "OntologyTransaction",
    "Transaction",
    "OntologyScenario",
    "Scenario",
    "ValueType",
    "QueryType",
    "Query",
    "QueryParameter",
    "Attachment",
    "AttachmentProperty",
    "CipherTextProperty",
    "MediaReference",
    "MediaReferenceProperty",
    "GeoPoint",
    "GeoShape",
    "GeotemporalSeriesProperty",
    "TimeSeriesPoint",
    "TimeSeriesProperty",
    "TimeSeriesPropertyV2",

    # Auth

    "Auth", "TokenAuth", "ApiKeyAuth", "EnvAuth",
    # Config
    "Config",
    # API Client & Request/Response
    "ApiClient", "AsyncApiClient", "ApiResponse", "RequestInfo",
    "StreamedApiResponse", "SseEvent", "PageIterator", "AsyncPageIterator",
    "with_raw_response", "async_with_raw_response",
    "with_streaming_response", "async_with_streaming_response",
    # Agent lifecycle
    "PhiAgent", "AgentContext", "Phase", "DataSet",
    # Agent Cards & Typing
    "AgentCard", "AgentLayer", "PhiSpec", "PhiTask", "PhiVerb",
    # Ontologylogy
    "Node", "Edge", "Space", "Morphism", "Traversal",
    "Fiber", "Manifold", "SimplexType", "Ontologylogy",
    # Errors
    "PhiADKException", "NotAuthenticated", "PermissionDenied",
    "AgentNotFound", "AgentTimeout", "AgentExecutionError",
    "SpaceTraversalError", "MorphismFailedError", "ValidationError",
    # Domain Agents (14)
    "PhiOneAgent", "PhiCalAgent", "PhiRAGAgent", "PhiDocAgent",
    "PhiBotAgent", "PhiBrdAgent", "PhiOraAgent", "PhiGitAgent",
    "PhiLogAgent", "PhiLLMAgent", "PhiMenAgent",
    "PhiSecAgent", "PhiGovAgent", "PhiBusAgent",
    # Domain Cards
    "PHIONE_CARD", "PHICAL_CARD", "PHIRAG_CARD", "PHIDOC_CARD",
    "PHIBOT_CARD", "PHIBRD_CARD", "PHIORA_CARD", "PHIGIT_CARD",
    "PHILOG_CARD", "PHILLM_CARD", "PHIMEN_CARD",
    "PHISEC_CARD", "PHIGOV_CARD", "PHIBUS_CARD",
    # P* Prefix Standard
    "PBusEvent", "PBusClient", "PAgent", "PNode", "PSpace", "PMorphism",
    "PFiber", "PTraversal", "PManifold", "PAgentCard", "PAgentContext",
    # Git & Telemetry Types
    "Blob", "Tree", "TreeEntry", "Commit", "Ref", "DiffResult", "GitEngine",
    "StructuredLogger", "LogLevel", "LogRecord", "AuditEntry",
    # Query Engine & ORM
    "Repository", "Field", "StringField", "IntegerField", "FloatField", "RelationshipField",
    "VQL", "RQL", "OQL", "QML",
]

# Alias all agent modules on phiadk.<agent> for direct access and backwards compatibility
import sys as _sys
for _agent_name in [
    "phibot", "phibrd", "phibus", "phical", "phidoc", "phigen",
    "phigit", "phigov", "phillm", "philog", "phimen", "phione", "phiora",
    "phirag", "phisec"
]:

    try:
        _mod = __import__(f"phiadk.agents.{_agent_name}", fromlist=[_agent_name])
        _sys.modules[f"phiadk.{_agent_name}"] = _mod
        globals()[_agent_name] = _mod
    except ImportError:
        pass


