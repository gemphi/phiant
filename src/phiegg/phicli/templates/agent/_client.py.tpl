"""Domain client for {{agent_name}} Agent."""

from __future__ import annotations

from typing import Any, Dict, Optional
from phiegg.{{agent_id}}.agent import {{class_name}}


class {{client_name}}:
    """Sync client for {{agent_name}}."""

    def __init__(self, auth=None, hostname=None, config=None, data_resolver=None) -> None:
        self._agent = {{class_name}}(data_resolver=data_resolver)

    async def execute(self, verb: str, parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        ctx = await self._agent.execute_verb(verb, parameters or {})
        return ctx.results.get("output", {})


class {{async_client_name}}({{client_name}}):
    """Async variant for {{agent_name}}."""
    pass
