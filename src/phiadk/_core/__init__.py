"""PhiADK SDK Core — shared infrastructure.

Re-exports auth, config, API client, model base, topology primitives,
and the universal agent lifecycle base with Agent Card schemas.
"""

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
from phiadk._core.model_base import ModelBase as ModelBase
from phiadk._core.topology import Edge as Edge
from phiadk._core.topology import Fiber as Fiber
from phiadk._core.topology import Manifold as Manifold
from phiadk._core.topology import Morphism as Morphism
from phiadk._core.topology import Node as Node
from phiadk._core.topology import SimplexType as SimplexType
from phiadk._core.topology import Space as Space
from phiadk._core.topology import Ontologylogy as Ontologylogy
from phiadk._core.topology import Traversal as Traversal
from phiadk._core.agent_base import AgentContext as AgentContext
from phiadk._core.agent_base import DataSet as DataSet
from phiadk._core.agent_base import Phase as Phase
from phiadk._core.agent_base import PhiAgent as PhiAgent
from phiadk._core.agent_card import AgentCard as AgentCard
from phiadk._core.agent_card import AgentLayer as AgentLayer
from phiadk._core.agent_card import PhiSpec as PhiSpec
from phiadk._core.agent_card import PhiTask as PhiTask
from phiadk._core.agent_card import PhiVerb as PhiVerb

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

