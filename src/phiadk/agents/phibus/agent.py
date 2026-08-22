"""PhiBus domain agent implementation."""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.phibus.bus import GLOBAL_PBUS, PBusClient
from phiadk.agents.phibus.card import PHIBUS_CARD
from phiadk.agents.phibus.models import PBusEvent
from phiadk.agents.phibus.verbs import PhiBusVerb


class PhiBusAgent(PhiAgent):
    """Event Bus domain agent coordinating PBusEvent broadcasting and subscriptions."""

    agent_id = "phibus"
    agent_name = "PhiBus"
    domain = "event_bus"
    layer = AgentLayer.INFRASTRUCTURE
    version = "1.0.0"
    description = "Universal Ontologylogical Pub/Sub Event Bus Manager with PBusEvent routing"
    card = PHIBUS_CARD

    def __init__(self, data_resolver=None, bus_client: Optional[PBusClient] = None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.bus = bus_client or GLOBAL_PBUS

    async def envision(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb or ctx.parameters.get("verb", PhiBusVerb.PUB.value)
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "event_bus_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        verb = ctx.verb
        params = ctx.parameters

        if verb in (PhiBusVerb.PUBLISH_EVENT, PhiBusVerb.PUBLISH_EVENT.value, PhiBusVerb.EMIT_EVENT, PhiBusVerb.EMIT_EVENT.value, "pub", "publish", "emit"):
            topic = params.get("topic", "default")
            payload = params.get("payload", {})
            evt = PBusEvent(
                topic=topic,
                payload=payload,
                source_agent=params.get("source_agent", "system"),
                commit_sha1=params.get("commit_sha1"),
            )
            published = self.bus.pub(topic, evt)
            ctx.results["output"] = {"status": "PUBLISHED", "event": published.to_dict()}
            ctx.confidence = 1.0

        elif verb in (PhiBusVerb.SUBSCRIBE_TOPIC, PhiBusVerb.SUBSCRIBE_TOPIC.value, "sub", "subscribe"):
            topic = params.get("topic", "*")
            ctx.results["output"] = {"status": "SUBSCRIBED", "topic": topic}
            ctx.confidence = 1.0



        elif verb == PhiBusVerb.LIST_TOPICS or verb == PhiBusVerb.LIST_TOPICS.value:
            topics = self.bus.list_topics()
            ctx.results["output"] = {"topics": topics, "count": len(topics)}
            ctx.confidence = 1.0

        elif verb == PhiBusVerb.GET_HISTORY or verb == PhiBusVerb.GET_HISTORY.value:
            topic = params.get("topic")
            limit = int(params.get("limit", 50))
            events = self.bus.get_history(topic=topic, limit=limit)
            ctx.results["output"] = {"events": [e.to_dict() for e in events], "count": len(events)}
            ctx.confidence = 1.0

        else:
            ctx.results["error"] = f"Unknown PhiBus verb '{verb}'."
            ctx.confidence = 0.0

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        if "error" in ctx.results:
            ctx.confidence = 0.0
        else:
            ctx.confidence = max(ctx.confidence, 0.95)
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        return ctx


# P* prefix alias
PBusAgent = PhiBusAgent
