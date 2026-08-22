"""PhiEgg SDK — Ontologylogy-based Agent Platform.

The unified Python SDK for the PhiEgg ecosystem. Modelled after
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
from phiegg._core.auth import ApiKeyAuth as ApiKeyAuth
from phiegg._core.auth import Auth as Auth
from phiegg._core.auth import EnvAuth as EnvAuth
from phiegg._core.auth import TokenAuth as TokenAuth
from phiegg._core.config import Config as Config
from phiegg._core.api_client import ApiClient as ApiClient
from phiegg._core.api_client import AsyncApiClient as AsyncApiClient
from phiegg._core.api_client import ApiResponse as ApiResponse
from phiegg._core.api_client import AsyncPageIterator as AsyncPageIterator
from phiegg._core.api_client import PageIterator as PageIterator
from phiegg._core.api_client import RequestInfo as RequestInfo
from phiegg._core.api_client import SseEvent as SseEvent
from phiegg._core.api_client import StreamedApiResponse as StreamedApiResponse
from phiegg._core.api_client import async_with_raw_response as async_with_raw_response
from phiegg._core.api_client import async_with_streaming_response as async_with_streaming_response
from phiegg._core.api_client import with_raw_response as with_raw_response
from phiegg._core.api_client import with_streaming_response as with_streaming_response
from phiegg._core.agent_base import AgentContext as AgentContext
from phiegg._core.agent_base import DataSet as DataSet
from phiegg._core.agent_base import Phase as Phase
from phiegg._core.agent_base import PhiAgent as PhiAgent
from phiegg._core.agent_card import AgentCard as AgentCard
from phiegg._core.agent_card import AgentLayer as AgentLayer
from phiegg._core.agent_card import PhiSpec as PhiSpec
from phiegg._core.agent_card import PhiTask as PhiTask
from phiegg._core.agent_card import PhiVerb as PhiVerb

# Ontologylogy primitives
from phiegg._core.topology import Edge as Edge
from phiegg._core.topology import Fiber as Fiber
from phiegg._core.topology import Manifold as Manifold
from phiegg._core.topology import Morphism as Morphism
from phiegg._core.topology import Node as Node
from phiegg._core.topology import SimplexType as SimplexType
from phiegg._core.topology import Space as Space
from phiegg._core.topology import Ontologylogy as Ontologylogy
from phiegg._core.topology import Traversal as Traversal

# Errors
from phiegg._errors import AgentExecutionError as AgentExecutionError
from phiegg._errors import AgentNotFound as AgentNotFound
from phiegg._errors import AgentTimeout as AgentTimeout
from phiegg._errors import MorphismFailedError as MorphismFailedError
from phiegg._errors import NotAuthenticated as NotAuthenticated
from phiegg._errors import PermissionDenied as PermissionDenied
from phiegg._errors import PhiEggException as PhiEggException
from phiegg._errors import SpaceTraversalError as SpaceTraversalError
from phiegg._errors import ValidationError as ValidationError

# Domain Agent Classes
from phiegg.phione import PhiOneAgent as PhiOneAgent
from phiegg.phical import PhiCalAgent as PhiCalAgent
from phiegg.phirag import PhiRAGAgent as PhiRAGAgent
from phiegg.phidoc import PhiDocAgent as PhiDocAgent
from phiegg.phibot import PhiBotAgent as PhiBotAgent
from phiegg.phibrd import PhiBrdAgent as PhiBrdAgent
from phiegg.phiora import PhiOraAgent as PhiOraAgent
from phiegg.phigit import PhiGitAgent as PhiGitAgent
from phiegg.philog import PhiLogAgent as PhiLogAgent
from phiegg.phillm import PhiLLMAgent as PhiLLMAgent
from phiegg.phisec import PhiSecAgent as PhiSecAgent
from phiegg.phigov import PhiGovAgent as PhiGovAgent
from phiegg.phibus import PhiBusAgent as PhiBusAgent
from phiegg.phimen import PhiMenAgent as PhiMenAgent

# Domain Agent Cards
from phiegg.phione import PHIONE_CARD as PHIONE_CARD
from phiegg.phical import PHICAL_CARD as PHICAL_CARD
from phiegg.phirag import PHIRAG_CARD as PHIRAG_CARD
from phiegg.phidoc import PHIDOC_CARD as PHIDOC_CARD
from phiegg.phibot import PHIBOT_CARD as PHIBOT_CARD
from phiegg.phibrd import PHIBRD_CARD as PHIBRD_CARD
from phiegg.phiora import PHIORA_CARD as PHIORA_CARD
from phiegg.phigit import PHIGIT_CARD as PHIGIT_CARD
from phiegg.philog import PHILOG_CARD as PHILOG_CARD
from phiegg.phillm import PHILLM_CARD as PHILLM_CARD
from phiegg.phisec import PHISEC_CARD as PHISEC_CARD
from phiegg.phigov import PHIGOV_CARD as PHIGOV_CARD
from phiegg.phibus import PHIBUS_CARD as PHIBUS_CARD
from phiegg.phimen import PHIMEN_CARD as PHIMEN_CARD

# P* Prefix Standard
from phiegg.phibus.models import PBusEvent as PBusEvent
from phiegg.phibus.bus import PBusClient as PBusClient
from phiegg._core import (
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
from phiegg.ontologies import ObjectType as ObjectType
from phiegg.ontologies import PropertyType as PropertyType
from phiegg.ontologies import LinkType as LinkType
from phiegg.ontologies import ActionType as ActionType
from phiegg.ontologies import ActionParameter as ActionParameter
from phiegg.ontologies import POntologyEngine as POntologyEngine
from phiegg.ontologies import GLOBAL_ONTOLOGY as GLOBAL_ONTOLOGY


# Query Engine & ORM
from phiegg.query import OQL as OQL
from phiegg.query import RQL as RQL
from phiegg.query import VQL as VQL
from phiegg.query import QML as QML
from phiegg.query import Field as Field
from phiegg.query import FloatField as FloatField
from phiegg.query import IntegerField as IntegerField
from phiegg.query import RelationshipField as RelationshipField
from phiegg.query import Repository as Repository
from phiegg.query import StringField as StringField

# Domain Typed Verbs, Tasks, Specs
from phiegg.phione.verbs import PhiOneVerb as PhiOneVerb
from phiegg.phione.tasks import PhiOneTask as PhiOneTask
from phiegg.phione.specs import PhiOneSpec as PhiOneSpec

from phiegg.phical.verbs import PhiCalVerb as PhiCalVerb
from phiegg.phical.tasks import PhiCalTask as PhiCalTask
from phiegg.phical.specs import PhiCalSpec as PhiCalSpec

from phiegg.phirag.verbs import PhiRAGVerb as PhiRAGVerb
from phiegg.phirag.tasks import PhiRAGTask as PhiRAGTask
from phiegg.phirag.specs import PhiRAGSpec as PhiRAGSpec

from phiegg.phidoc.verbs import PhiDocVerb as PhiDocVerb
from phiegg.phidoc.tasks import PhiDocTask as PhiDocTask
from phiegg.phidoc.specs import PhiDocSpec as PhiDocSpec
from phiegg.phibot.verbs import PhiBotVerb as PhiBotVerb
from phiegg.phibot.tasks import PhiBotTask as PhiBotTask
from phiegg.phibot.specs import PhiBotSpec as PhiBotSpec
from phiegg.phibrd.verbs import PhiBrdVerb as PhiBrdVerb
from phiegg.phibrd.tasks import PhiBrdTask as PhiBrdTask
from phiegg.phibrd.specs import PhiBrdSpec as PhiBrdSpec
from phiegg.phiora.verbs import PhiOraVerb as PhiOraVerb
from phiegg.phiora.tasks import PhiOraTask as PhiOraTask
from phiegg.phiora.specs import PhiOraSpec as PhiOraSpec
from phiegg.phigit.verbs import PhiGitVerb as PhiGitVerb
from phiegg.phigit.tasks import PhiGitTask as PhiGitTask
from phiegg.phigit.specs import PhiGitSpec as PhiGitSpec
from phiegg.philog.verbs import PhiLogVerb as PhiLogVerb
from phiegg.philog.tasks import PhiLogTask as PhiLogTask
from phiegg.philog.specs import PhiLogSpec as PhiLogSpec
from phiegg.phillm.verbs import PhiLLMVerb as PhiLLMVerb
from phiegg.phillm.tasks import PhiLLMTask as PhiLLMTask
from phiegg.phillm.specs import PhiLLMSpec as PhiLLMSpec
from phiegg.phimen.verbs import PhiMenVerb as PhiMenVerb
from phiegg.phimen.tasks import PhiMenTask as PhiMenTask
from phiegg.phimen.specs import PhiMenSpec as PhiMenSpec

# Git & Telemetry Types
from phiegg.phigit import Blob as Blob
from phiegg.phigit import Commit as Commit
from phiegg.phigit import DiffResult as DiffResult
from phiegg.phigit import GitEngine as GitEngine
from phiegg.phigit import Ref as Ref
from phiegg.phigit import Tree as Tree
from phiegg.phigit import TreeEntry as TreeEntry
from phiegg.philog import AuditEntry as AuditEntry
from phiegg.philog import LogLevel as LogLevel
from phiegg.philog import LogRecord as LogRecord
from phiegg.philog import StructuredLogger as StructuredLogger

# Ontologies Platform & P* Standard Classes
from phiegg.ontologies import (
    OntologiesClient as OntologiesClient,
    Ontology as Ontology,
    OntologyObject as OntologyObject,
    OntologyObjectSet as OntologyObjectSet,
    OntologyInterface as OntologyInterface,
    OntologyTransaction as OntologyTransaction,
    OntologyScenario as OntologyScenario,
    POntology as POntology,
    POntologyType as POntologyType,
    PObjectType as PObjectType,
    PPropertyType as PPropertyType,
    PLinkType as PLinkType,
    PActionType as PActionType,
    PActionParameter as PActionParameter,
    POntologyObject as POntologyObject,
    POntologyObjectSet as POntologyObjectSet,
    POntologyInterface as POntologyInterface,
    POntologyTransaction as POntologyTransaction,
    POntologyScenario as POntologyScenario,
    PValueType as PValueType,
    PQueryType as PQueryType,
    POntologyEngine as POntologyEngine,
    PToposEngine as PToposEngine,
)



# AIP API Platform
from phiegg.phiapi import create_app as create_app

# SDK Client
from phiegg.client import (
    AsyncPhiEggClient as AsyncPhiEggClient,
    PhiEggClient as PhiEggClient,
    PClient as PClient,
    PAsyncClient as PAsyncClient,
)


# Version
from phiegg._version import __version__ as __version__

__all__ = [
    "__version__",
    # Client
    "PhiEggClient",
    "AsyncPhiEggClient",
    "PClient",
    "PAsyncClient",
    # Ontologies
    "Ontology",
    "POntology",
    "POntologyType",
    "OntologiesClient",
    "OntologyObject",
    "POntologyObject",
    "OntologyObjectSet",
    "POntologyObjectSet",
    "OntologyInterface",
    "POntologyInterface",
    "OntologyTransaction",
    "POntologyTransaction",
    "OntologyScenario",
    "POntologyScenario",
    "PObjectType",
    "PPropertyType",
    "PLinkType",
    "PActionType",
    "PActionParameter",
    "POntologyEngine",
    "POntologyEngine",
    "PValueType",
    "PQueryType",
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
    "PhiEggException", "NotAuthenticated", "PermissionDenied",
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

