"""PhiMen Executive operations.

The virtual CEO agent that orchestrates cross-domain decisions.
PhiMen doesn't own data — it traverses other agents' spaces and
composes their morphisms into strategic fiber bundles.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg._core.topology import Fiber, Manifold, Morphism
from phiegg.phimen.card import PHIMEN_CARD
from phiegg.phimen.verbs import PhiMenVerb


class ExecutiveAgent(PhiAgent):
    """Virtual CEO — extends PhiAgent with the standard recursive lifecycle.

    PhiMen's lifecycle:
        envision: Assess the situation across all domains
        apply:    Delegate to domain agents, compose results into a strategic fiber
        eval:     Score outcomes against strategic objectives
        iterate:  Decide next action — escalate, scale, or conclude
    """

    agent_id = "phimen"
    agent_name = "PhiMen"
    domain = "executive"
    layer = AgentLayer.EXECUTIVE
    description = "Virtual CEO — cross-domain strategic orchestration and recursive evaluation."
    card = PHIMEN_CARD

    def __init__(self, domain_clients: Optional[Dict[str, Any]] = None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self._domains = domain_clients or {}

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Assess the situation — build a manifold view across domains."""
        verb = ctx.verb or ctx.parameters.get("verb", "assess_objective")
        ctx.verb = verb
        manifold = Manifold(dimension=len(self._domains))
        ctx.results["plan"] = {
            "objective": ctx.parameters.get("objective", ""),
            "domains_available": list(self._domains.keys()),
            "manifold_dimension": manifold.dimension,
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Delegate to domain agents — compose a strategic fiber."""
        objective = ctx.parameters.get("objective", "")
        domains = ctx.parameters.get("domains", list(self._domains.keys()))

        fiber = Fiber(base_space="executive_space")
        for domain in domains:
            morphism = Morphism(
                morphism_type="delegate",
                source_space="executive_space",
                target_space=f"{domain}_space",
                parameters={"objective": objective, "domain": domain},
            )
            morphism.complete({"domain": domain, "status": "delegated"})
            fiber.add_morphism(morphism)

        fiber.status = "completed"
        ctx.results["output"] = fiber.to_dict()
        ctx.results["fiber"] = fiber
        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Score outcomes against strategic objectives."""
        fiber = ctx.results.get("fiber")
        completed = sum(1 for m in fiber.morphisms if m.status == "completed") if fiber else 0
        total = len(fiber.morphisms) if fiber else 0

        completion_rate = completed / total if total else 0.0
        ctx.confidence = 0.9 if completed == total else 0.5
        ctx.results["eval"] = {
            "completion_rate": completion_rate,
            "domains_reached": completed,
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Decide: escalate, scale, or conclude."""
        confidence = ctx.confidence

        if confidence >= 0.8:
            ctx.results["decision"] = "conclude"
        elif ctx.depth < ctx.max_depth:
            ctx.results["decision"] = "recurse"
            child = ctx.descend(new_verb=PhiMenVerb.ASSESS_OBJECTIVE)
            child.parameters["objective"] = f"refine: {ctx.parameters.get('objective', '')}"
            await self.run(child)
            ctx.results["sub_cycle"] = child.results
        else:
            ctx.results["decision"] = "escalate"

        return ctx


# Alias for naming consistency
PhiMenAgent = ExecutiveAgent


class StrategyClient:
    """Strategic operations — high-level convenience methods over the ExecutiveAgent."""

    def __init__(self, executive: Optional[ExecutiveAgent] = None) -> None:
        self._executive = executive or ExecutiveAgent()

    async def assess(self, objective: str, *, domains: Optional[List[str]] = None) -> AgentContext:
        """Run a full envision→apply→eval→iterate cycle for an objective."""
        ctx = AgentContext(parameters={"objective": objective})
        if domains:
            ctx.parameters["domains"] = domains
        return await self._executive.run(ctx)

    async def delegate(self, objective: str, domain: str) -> Morphism:
        """Delegate a single-domain task."""
        morphism = Morphism(
            morphism_type="delegate",
            source_space="executive_space",
            target_space=f"{domain}_space",
            parameters={"objective": objective, "domain": domain},
        )
        morphism.complete({"domain": domain, "status": "delegated"})
        return morphism
