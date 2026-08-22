"""Tests for MCP (Model Context Protocol) Server according to specs/mcp-server.md."""

import pytest
from src.mcp.server import MCPServer
from src.mcp.tools import MCP_TOOLS
from src.phiegg.client import PhiEggClient


@pytest.fixture
def mcp_server():
    client = PhiEggClient()
    return MCPServer(client=client)


class TestMCPServerCompliance:
    def test_mcp_server_info(self, mcp_server):
        info = mcp_server.get_server_info()
        assert info["name"] == "phient-agents"
        assert info["version"] == "1.0.0"

    def test_mcp_tools_list(self, mcp_server):
        tools = mcp_server.get_tools()
        assert len(tools) >= 8
        tool_names = [t["name"] for t in tools]
        assert "ask_knowledge" in tool_names
        assert "lookup_user" in tool_names
        assert "lookup_employee" in tool_names
        assert "check_leave_balance" in tool_names
        assert "search_docs" in tool_names
        assert "run_automation" in tool_names
        assert "onboard_employee" in tool_names
        assert "run_qml" in tool_names
        assert "agent_status" in tool_names

    @pytest.mark.asyncio
    async def test_mcp_ask_knowledge_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("ask_knowledge", {"query": "What is the annual leave policy?"})
        assert "answer" in res
        assert "sources" in res

    @pytest.mark.asyncio
    async def test_mcp_lookup_employee_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("lookup_employee", {"email": "jane@phient.com"})
        assert res["display_name"] == "Jane Muthoni"
        assert res["department"] == "Engineering"

    @pytest.mark.asyncio
    async def test_mcp_leave_balance_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("check_leave_balance", {"email": "jane@phient.com"})
        assert res.get("leave_type") == "Annual Leave"
        assert res.get("remaining") == 21

    @pytest.mark.asyncio
    async def test_mcp_search_docs_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("search_docs", {"query": "architecture"})
        assert "path" in res
        assert len(res["path"]) >= 1

    @pytest.mark.asyncio
    async def test_mcp_run_qml_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("run_qml", {"circuit": "mcp_circuit", "gates": "H:0,CNOT:0:1"})
        assert "|00⟩" in res["born_distribution"]
        assert "|11⟩" in res["born_distribution"]

    @pytest.mark.asyncio
    async def test_mcp_agent_status_tool(self, mcp_server):
        res = await mcp_server.handle_tool_call("agent_status", {})
        assert res["status"] == "ok"
        assert res["count"] >= 14
        assert "phione" in res["agents"]
        assert "phigit" in res["agents"]
        assert "phigen" in res["agents"]
