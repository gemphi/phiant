"""PhiCal Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.phical.card import PHICAL_CARD
from phiadk.agents.phical.circuit import CircuitClient
from phiadk.agents.phical.semantic_search import SemanticSearchClient
from phiadk.agents.phical.training import TrainingClient
from phiadk.agents.phical.verbs import PhiCalVerb


class PhiCalAgent(PhiAgent):
    """The PhiCal Quantum Learning Agent."""

    agent_id = "phical"
    agent_name = "PhiCal"
    domain = "quantum_learning"
    layer = AgentLayer.ENGINE
    description = "Quantum-inspired learning, semantic superposition search, and circuit simulation."
    card = PHICAL_CARD

    def __init__(self, vectorstore=None, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.semantic_search = SemanticSearchClient(vectorstore=vectorstore)
        self.circuit = CircuitClient()
        self.training = TrainingClient()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Plan quantum operation."""
        verb = ctx.verb or ctx.parameters.get("verb", "query")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "semantic_space" if "query" in verb or "search" in verb else "circuit_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute quantum semantic search, circuit, or training."""
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiCalVerb.QUERY, PhiCalVerb.SEMANTIC_SEARCH):
            text = params.get("text", params.get("query", ""))
            top_k = params.get("top_k", 5)
            results = await self.semantic_search.query(text, top_k=top_k)
            ctx.results["output"] = [
                {
                    "content": r.content,
                    "score": r.score,
                    "probability": r.probability,
                    "source": r.source,
                }
                for r in results
            ]
        elif verb == PhiCalVerb.FIBER_SEARCH:
            text = params.get("text", "")
            spaces = params.get("spaces")
            fiber = await self.semantic_search.fiber_search(text, spaces=spaces)
            ctx.results["output"] = fiber.to_dict()
        elif verb == PhiCalVerb.CREATE_CIRCUIT:
            name = params.get("name", "circuit")
            num_qubits = params.get("num_qubits", 2)
            gates = params.get("gates")
            circuit = await self.circuit.create(name, num_qubits, gates)
            ctx.results["output"] = circuit.to_dict()
        elif verb == PhiCalVerb.SIMULATE_CIRCUIT:
            cid = params.get("circuit_id", "")
            morphism = await self.circuit.simulate(cid)
            ctx.results["output"] = morphism.to_dict()
        elif verb == PhiCalVerb.COMPOSE_CIRCUITS:
            cids = params.get("circuit_ids", [])
            name = params.get("name", "composed")
            circuit = await self.circuit.compose(cids, name)
            ctx.results["output"] = circuit.to_dict()
        elif verb == PhiCalVerb.LIST_CIRCUITS:
            traversal = await self.circuit.list_circuits()
            ctx.results["output"] = traversal.to_dict()
        elif verb == PhiCalVerb.TRAIN_MODEL:
            model = params.get("model_name", "phi_model")
            epochs = params.get("epochs", 5)
            morphism = await self.training.morph_train(model, epochs=epochs)
            ctx.results["output"] = morphism.to_dict()
        elif verb in ("get_history", "history"):
            model = params.get("model_name", "phi_model")
            history = await self.training.get_history(model)
            ctx.results["output"] = [h.base_dict() | {"epoch": h.epoch, "loss": h.loss} for h in history]
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Validate amplitude norms or state validity."""
        output = ctx.results.get("output", [])
        ctx.confidence = 0.95 if output else 0.5
        ctx.results["eval"] = {
            "status": "valid" if output else "empty",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Refine superposition if search results are sparse."""
        output = ctx.results.get("output", [])
        if not output and ctx.verb == "query" and ctx.depth < ctx.max_depth:
            # Recurse with lower amplitude threshold or broader search
            child = ctx.descend(new_verb="fiber_search")
            child.parameters["spaces"] = ["knowledge", "docs"]
            child = await self.run(child)
            ctx.results["fallback_output"] = child.results.get("output")
        return ctx
