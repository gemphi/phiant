"""PhiEgg SDK Core — shared infrastructure.

Re-exports auth, config, API client, model base, topology primitives,
and the universal agent lifecycle base with Agent Card schemas.
"""

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
from phiegg._core.model_base import ModelBase as ModelBase
from phiegg._core.topology import Edge as Edge
from phiegg._core.topology import Fiber as Fiber
from phiegg._core.topology import Manifold as Manifold
from phiegg._core.topology import Morphism as Morphism
from phiegg._core.topology import Node as Node
from phiegg._core.topology import SimplexType as SimplexType
from phiegg._core.topology import Space as Space
from phiegg._core.topology import Ontologylogy as Ontologylogy
from phiegg._core.topology import Traversal as Traversal
from phiegg._core.agent_base import AgentContext as AgentContext
from phiegg._core.agent_base import DataSet as DataSet
from phiegg._core.agent_base import Phase as Phase
from phiegg._core.agent_base import PhiAgent as PhiAgent
from phiegg._core.agent_card import AgentCard as AgentCard
from phiegg._core.agent_card import AgentLayer as AgentLayer
from phiegg._core.agent_card import PhiSpec as PhiSpec
from phiegg._core.agent_card import PhiTask as PhiTask
from phiegg._core.agent_card import PhiVerb as PhiVerb

# ── P* Prefix Standard (Phient Core Types) ───────────────────────────
PAgent = PhiAgent
PAgentContext = AgentContext
PAgentCard = AgentCard
PAgentLayer = AgentLayer
PAgentSpec = PhiSpec
PAgentTask = PhiTask
PAgentVerb = PhiVerb
PNode = Node
PEdge = Edge
PSpace = Space
PMorphism = Morphism
PTraversal = Traversal
PFiber = Fiber
PManifold = Manifold
POntologylogy = Ontologylogy

__all__ = [
    # Auth
    "Auth", "TokenAuth", "ApiKeyAuth", "EnvAuth",
    # Config
    "Config",
    # API Client & Request/Response
    "ApiClient", "AsyncApiClient", "ApiResponse", "RequestInfo",
    "StreamedApiResponse", "SseEvent", "PageIterator", "AsyncPageIterator",
    "with_raw_response", "async_with_raw_response",
    "with_streaming_response", "async_with_streaming_response",
    # Model
    "ModelBase",
    # Ontologylogy primitives
    "Node", "Edge", "Space", "Morphism", "Traversal",
    "Fiber", "Manifold", "SimplexType", "Ontologylogy",
    # Agent lifecycle
    "PhiAgent", "AgentContext", "Phase", "DataSet",
    # Agent Card & Schema
    "AgentCard", "AgentLayer", "PhiSpec", "PhiTask", "PhiVerb",
    # P* Prefix Standard
    "PAgent", "PAgentContext", "PAgentCard", "PAgentLayer",
    "PAgentSpec", "PAgentTask", "PAgentVerb",
    "PNode", "PEdge", "PSpace", "PMorphism", "PTraversal",
    "PFiber", "PManifold", "POntologylogy",
]

