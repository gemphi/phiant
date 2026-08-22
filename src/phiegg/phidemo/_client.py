"""Domain client for Phidemo Agent."""

from __future__ import annotations

from typing import Any, Dict, Optional
from phiegg.phidemo.agent import PhidemoAgent


class PhidemoClient:
    """Sync client for Phidemo."""

    def __init__(self, auth=None, hostname=None, config=None, data_resolver=None) -> None:
        self._agent = PhidemoAgent(data_resolver=data_resolver)

    async def execute(self, verb: str, parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        ctx = await self._agent.execute_verb(verb, parameters or {})
        return ctx.results.get("output", {})


class AsyncPhidemoClient(PhidemoClient):
    """Async variant for Phidemo."""
    pass
