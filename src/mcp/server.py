"""MCP Server - Model Context Protocol server for Claude integration."""

from __future__ import annotations

import logging
from typing import Any

from .tools import MCP_TOOLS, TOOL_QUERY_TEMPLATES

logger = logging.getLogger(__name__)


class MCPServer:
    """MCP server that exposes agent capabilities as tools."""

    def __init__(self, orchestrator: Any = None) -> None:
        self.orchestrator = orchestrator
        self._tools = MCP_TOOLS

    async def handle_tool_call(self, tool_name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        """Handle an MCP tool call by dispatching to orchestrator using query templates."""
        if not self.orchestrator:
            return {"error": "Orchestrator not initialized"}

        if tool_name == "agent_status":
            return self.orchestrator.get_agents_status()

        template = TOOL_QUERY_TEMPLATES.get(tool_name)
        if not template:
            return {"error": f"Unknown tool: {tool_name}"}

        try:
            query = template.format(**arguments)
            result = await self.orchestrator.process(query=query, user_id="mcp-client")
            return result.to_dict() if hasattr(result, "to_dict") else result
        except Exception as exc:
            logger.error("MCP tool error (%s): %s", tool_name, exc)
            return {"error": str(exc)}

    def get_tools(self) -> list[dict[str, Any]]:
        return self._tools

    def get_server_info(self) -> dict[str, str]:
        return {
            "name": "phiant-agents",
            "version": "1.0.0",
            "description": "Phiant AI Ops Agent Platform",
        }
