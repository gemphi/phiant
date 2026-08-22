"""Typed client interface for PhiBus domain agent."""

from __future__ import annotations

import typing
from typing import Any, Callable, Dict, List, Optional

from phiegg.phibus.bus import GLOBAL_PBUS, PBusClient
from phiegg.phibus.models import PBusEvent


class PhiBusClient:
    """Synchronous client interface for PhiBus Event Bus strictly with pub/sub."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        bus_client: Optional[PBusClient] = None,
    ) -> None:
        self._bus = bus_client or GLOBAL_PBUS

    def pub(self, topic: str, event: typing.Union[PBusEvent, Dict[str, Any]]) -> PBusEvent:
        """Publish a PBusEvent to a given topic."""
        if isinstance(event, dict):
            event = PBusEvent(topic=topic, payload=event)
        return self._bus.pub(topic, event)

    def sub(self, topic: str, handler: Callable[[PBusEvent], None]) -> Callable[[], None]:
        """Subscribe a handler callback to a given topic."""
        return self._bus.sub(topic, handler)

    def list_topics(self) -> List[str]:
        return self._bus.list_topics()

    def get_history(self, topic: Optional[str] = None, limit: int = 50) -> List[PBusEvent]:
        return self._bus.get_history(topic=topic, limit=limit)


class AsyncPhiBusClient:
    """Async variant of PhiBusClient."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        bus_client: Optional[PBusClient] = None,
    ) -> None:
        self._bus = bus_client or GLOBAL_PBUS

    async def pub(self, topic: str, event: typing.Union[PBusEvent, Dict[str, Any]]) -> PBusEvent:
        if isinstance(event, dict):
            event = PBusEvent(topic=topic, payload=event)
        return self._bus.pub(topic, event)

    async def sub(self, topic: str, handler: Callable[[PBusEvent], None]) -> Callable[[], None]:
        return self._bus.sub(topic, handler)

    async def list_topics(self) -> List[str]:
        return self._bus.list_topics()

    async def get_history(self, topic: Optional[str] = None, limit: int = 50) -> List[PBusEvent]:
        return self._bus.get_history(topic=topic, limit=limit)
