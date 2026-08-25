"""PhiBus Client - Pure Pub/Sub Event Bus Manager."""

from __future__ import annotations

import collections
from typing import Any, Callable, Dict, List, Optional
from phiadk.agents.phibus.models import PBusEvent


class PBusClient:
    """Event Bus Client strictly exposing `pub` and `sub` methods for PBusEvent."""

    def __init__(self) -> None:
        self._subscribers: Dict[str, List[Callable[[PBusEvent], None]]] = collections.defaultdict(list)
        self._history: collections.deque[PBusEvent] = collections.deque(maxlen=1000)

    def pub(self, topic: str, event: PBusEvent) -> PBusEvent:
        """Publish a PBusEvent to a given topic."""
        event.topic = topic
        self._history.append(event)
        
        # Dispatch synchronously to registered subscriber handlers
        handlers = self._subscribers.get(topic, []) + self._subscribers.get("*", [])
        for handler in handlers:
            try:
                handler(event)
            except Exception as e:
                pass
        return event

    def sub(self, topic: str, handler: Callable[[PBusEvent], None]) -> Callable[[], None]:
        """Subscribe a handler callback to a given topic. Returns unsubscribe callback."""
        self._subscribers[topic].append(handler)

        def unsubscribe():
            if handler in self._subscribers[topic]:
                self._subscribers[topic].remove(handler)

        return unsubscribe

    # Aliases for convenience
    publish = pub
    subscribe = sub

    def list_topics(self) -> List[str]:
        """List active subscription topics and recorded event topics."""
        topics = set(self._subscribers.keys()) | {e.topic for e in self._history}
        return sorted(list(topics))

    def get_history(self, topic: Optional[str] = None, limit: int = 50) -> List[PBusEvent]:
        """Retrieve recent event history from the ring buffer."""
        events = list(self._history)
        if topic:
            events = [e for e in events if e.topic == topic or topic == "*"]
        return events[-limit:]


GLOBAL_PBUS = PBusClient()
