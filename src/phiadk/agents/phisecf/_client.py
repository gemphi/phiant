"""Domain client for Phisecf Agent."""

from __future__ import annotations

from typing import Any, Dict, Optional
from phiadk.agents.phisecf.agent import PhisecfAgent


class PhisecfClient:
    """Sync client for Phisecf."""

    def __init__(self, auth=None, hostname=None, config=None, data_resolver=None) -> None:
        self._agent = PhisecfAgent(data_resolver=data_resolver)

    async def execute(self, verb: str, parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        ctx = await self._agent.execute_verb(verb, parameters or {})
        return ctx.results.get("output", {})


class AsyncPhisecfClient(PhisecfClient):
    """Async variant for Phisecf."""
    pass
