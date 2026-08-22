"""PhiADK Agent Lifecycle Base.

Defines the universal ``PhiAgent`` lifecycle that ALL domain agents
extend without redefining.  The lifecycle is recursive:

    envision → apply → eval → iterate/scale

At each stage the same four operations apply, allowing fractal
composition — an agent's ``apply`` step can itself contain a full
envision→apply→eval→iterate sub-cycle.

Data and code are strictly separated.  Agents never contain inline
datasets — all data flows through ``DataSet`` references resolved
by the ``phiora`` data layer.
"""

from __future__ import annotations

import logging
import time
import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Callable, Dict, Generic, List, Optional, Tuple, TypeVar

from phiadk._core.agent_card import AgentCard, AgentLayer, PhiSpec, PhiTask, PhiVerb
from phiadk._core.topology import Morphism, Node, Space, Traversal

logger = logging.getLogger(__name__)

T = TypeVar("T")


# ──────────────────────────────────────────────────────────────────────
# Lifecycle phases
# ──────────────────────────────────────────────────────────────────────

class Phase(str, Enum):
    """The four recursive lifecycle phases."""

    ENVISION = "envision"   # Define intent, plan the topology
    APPLY = "apply"         # Execute morphisms over spaces
    EVAL = "eval"           # Measure, score, validate
    ITERATE = "iterate"     # Scale, refine, recurse


# ──────────────────────────────────────────────────────────────────────
# DataSet reference — strict separation of data and code
# ──────────────────────────────────────────────────────────────────────

@dataclass
class DataSet:
    """A reference to an external data set — never inline data.

    Data sets are resolved by ``phiora`` (the data layer).  This
    reference is passed around but never contains the data itself.

    :param set_id: Unique identifier for the data set.
    :param set_type: Classification (e.g. ``mock``, ``live``, ``snapshot``).
    :param source: Origin URI or path.
    :param schema: Expected shape/schema hint.
    """

    set_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    set_type: str = "live"
    source: str = ""
    schema: Dict[str, Any] = field(default_factory=dict)
    version: str = "1.0"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "set_id": self.set_id,
            "set_type": self.set_type,
            "source": self.source,
            "schema": self.schema,
            "version": self.version,
        }


# ──────────────────────────────────────────────────────────────────────
# Execution context
# ──────────────────────────────────────────────────────────────────────

@dataclass
class AgentContext:
    """Execution context passed through every lifecycle phase."""

    request_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    phase: Phase = Phase.ENVISION
    depth: int = 0           # Recursion depth
    max_depth: int = 5       # Guard against infinite recursion
    verb: str = ""           # Target verb / action
    data_sets: Dict[str, DataSet] = field(default_factory=dict)
    parameters: Dict[str, Any] = field(default_factory=dict)
    results: Dict[str, Any] = field(default_factory=dict)
    trace: List[str] = field(default_factory=list)
    confidence: float = 1.0

    def descend(self, new_verb: str = "") -> "AgentContext":
        """Create a child context for recursive sub-cycles."""
        return AgentContext(
            request_id=self.request_id,
            phase=Phase.ENVISION,
            depth=self.depth + 1,
            max_depth=self.max_depth,
            verb=new_verb or self.verb,
            data_sets=self.data_sets,
            parameters=dict(self.parameters),
            trace=list(self.trace),
        )


# ──────────────────────────────────────────────────────────────────────
# Universal PhiAgent base
# ──────────────────────────────────────────────────────────────────────

class PhiAgent(ABC):
    """Universal base for ALL PhiADK domain agents.

    Every agent implements the same four lifecycle methods — no agent
    redefines the abstract layer.  The lifecycle is recursive: each
    phase can spawn sub-cycles at increased depth.

    Lifecycle:
        1. ``envision(ctx)`` — define intent, plan topology operations
        2. ``apply(ctx)`` — execute morphisms over spaces
        3. ``eval(ctx)`` — measure outcomes, compute metrics
        4. ``iterate(ctx)`` — decide: scale, refine, or terminate

    Data separation:
        Agents reference ``DataSet`` objects but never contain inline data.
        All data I/O goes through the ``data_resolver`` callable which is
        backed by ``phiora``.
    """

    # Class-level identity & card
    agent_id: str = "base"
    agent_name: str = "PhiAgent"
    domain: str = ""
    description: str = ""
    layer: AgentLayer = AgentLayer.INFRASTRUCTURE
    version: str = "1.0.0"
    card: Optional[AgentCard] = None

    def __init__(self, data_resolver=None, version: Optional[str] = None) -> None:
        """
        :param data_resolver: Callable(source, **kwargs) -> Any.
            Resolves a ``DataSet`` reference to actual data.
            Backed by ``phiora`` in production.
        :param version: Optional override version for this agent instance.
        """
        if version:
            self.version = version
        if data_resolver is None:
            try:
                from pathlib import Path
                from phiadk.agents.phiora.store import ResolverClient, StoreClient
                default_dir = Path(__file__).resolve().parents[3] / "data"
                self._data_resolver = ResolverClient(data_dir=default_dir, store_client=StoreClient())
            except Exception:
                self._data_resolver = None
        else:
            self._data_resolver = data_resolver
        if self.card is None:
            self.card = self.load_card()
        if self.card and self.card.version:
            self.version = self.card.version
        self._request_count = 0
        self._error_count = 0
        self._total_duration_ms = 0

    @classmethod
    def load_card(cls) -> Optional[AgentCard]:
        """Load AgentCard dynamically from schema.json in the agent package directory."""
        import inspect
        from pathlib import Path
        try:
            mod_file = inspect.getfile(cls)
            schema_path = Path(mod_file).parent / "schema.json"
            if schema_path.exists():
                return AgentCard.from_file(schema_path)
        except Exception:
            pass
        return None

    # ── The lifecycle — do NOT override these ────────────────────────

    async def run(self, ctx: AgentContext) -> AgentContext:
        """Execute the full lifecycle: envision → apply → eval → iterate.

        This is the ONLY entry point.  It orchestrates the four phases
        in order, with timing and error handling.  Do NOT override.
        """
        if ctx.depth > ctx.max_depth:
            ctx.trace.append(f"{self.agent_id}: max depth reached")
            return ctx

        start = time.monotonic()
        try:
            ctx.phase = Phase.ENVISION
            ctx.trace.append(f"{self.agent_id}:envision@d{ctx.depth}")
            ctx = await self.envision(ctx)

            ctx.phase = Phase.APPLY
            ctx.trace.append(f"{self.agent_id}:apply@d{ctx.depth}")
            ctx = await self.apply(ctx)

            ctx.phase = Phase.EVAL
            ctx.trace.append(f"{self.agent_id}:eval@d{ctx.depth}")
            ctx = await self.eval(ctx)

            ctx.phase = Phase.ITERATE
            ctx.trace.append(f"{self.agent_id}:iterate@d{ctx.depth}")
            ctx = await self.iterate(ctx)

            self._request_count += 1

        except Exception as exc:
            self._error_count += 1
            ctx.trace.append(f"{self.agent_id}:error:{exc}")
            ctx.results["error"] = str(exc)

        elapsed_ms = int((time.monotonic() - start) * 1000)
        self._total_duration_ms += elapsed_ms
        ctx.results["duration_ms"] = elapsed_ms
        return ctx

    async def execute_verb(self, verb: str, payload: Optional[Dict[str, Any]] = None) -> AgentContext:
        """Execute a specific verb through the complete recursive lifecycle.

        :param verb: The verb to execute.
        :param payload: Input parameters.
        :returns: Completed ``AgentContext``.
        """
        ctx = AgentContext(
            verb=verb,
            parameters=payload or {},
        )
        return await self.run(ctx)

    # ── The four phases — agents implement these ────────────────────

    @abstractmethod
    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Define intent, plan topology operations.

        Determine WHAT to do based on context and parameters.
        Populate ``ctx.results["plan"]`` with the execution plan.
        """

    @abstractmethod
    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute morphisms over topology spaces.

        Carry out the plan — run traversals, execute morphisms,
        transform data.  Populate ``ctx.results["output"]``.
        """

    @abstractmethod
    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Measure outcomes, validate, score.

        Assess the quality of the apply phase.  Set confidence
        scores, validate invariants, compute metrics.
        """

    @abstractmethod
    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Scale, refine, or terminate.

        Decide whether to recurse (spawn a sub-cycle at depth+1),
        scale the operation, or accept the result and terminate.
        """

    # ── DRY Data Resolution & Traversal Helpers ──────────────────────

    def resolve_dataset(
        self,
        dataset: DataSet,
        path: Tuple[str, ...] = (),
        default: Any = None,
    ) -> Any:
        """Resolve a DataSet reference via phiora and extract optional nested path.

        NEVER put inline data in agent code.  Always use this method.

        :param dataset: The data set reference.
        :param path: Optional tuple of nested keys.
        :param default: Default value if not found.
        :returns: Resolved data slice.
        """
        if self._data_resolver is None:
            return default if default is not None else {}

        raw = self._data_resolver(dataset.source, default=default if default is not None else {})
        if not path:
            return raw

        current = raw
        for key in path:
            if isinstance(current, dict):
                current = current.get(key, {})
            else:
                return default if default is not None else {}
        return current

    def build_traversal_from_set(
        self,
        dataset: DataSet,
        path: Tuple[str, ...],
        origin: str,
        filters: Dict[str, Any],
        node_builder: Callable[[str, Any], Node],
    ) -> Traversal:
        """Build a Traversal over resolved dataset entries without boilerplate."""
        data = self.resolve_dataset(dataset, path, default={})
        traversal = Traversal(origin=origin, filters=filters)
        if isinstance(data, dict):
            for k, v in data.items():
                traversal.visit(node_builder(k, v))
        elif isinstance(data, list):
            for idx, item in enumerate(data):
                traversal.visit(node_builder(str(idx), item))
        return traversal

    # ── Introspection & Health ───────────────────────────────────────

    def describe(self) -> Dict[str, Any]:
        """Return the agent's schema card or introspective description."""
        if self.card:
            return self.card.to_dict()
        return {
            "agent_id": self.agent_id,
            "agent_name": self.agent_name,
            "domain": self.domain,
            "layer": self.layer.value,
            "description": self.description,
        }

    @property
    def health(self) -> Dict[str, Any]:
        avg_ms = (
            self._total_duration_ms / self._request_count
            if self._request_count > 0 else 0
        )
        error_rate = (
            self._error_count / self._request_count
            if self._request_count > 0 else 0.0
        )
        return {
            "agent_id": self.agent_id,
            "agent_name": self.agent_name,
            "domain": self.domain,
            "status": "healthy" if error_rate < 0.1 else "degraded",
            "requests_total": self._request_count,
            "errors_total": self._error_count,
            "error_rate": round(error_rate, 3),
            "avg_duration_ms": round(avg_ms, 1),
        }

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} id='{self.agent_id}' domain='{self.domain}'>"
