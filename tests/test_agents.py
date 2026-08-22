"""Tests for all 15 Canonical PhiADK Domain Agents."""

import pytest
from phiadk.client import PhiADKClient


@pytest.fixture
def client():
    return PhiADKClient()


class TestCanonicalDomainAgents:
    @pytest.mark.asyncio
    async def test_phirag_knowledge_agent(self, client):
        agent = client.agents["phirag"]
        ctx = await agent.execute_verb("answer_query", {"query": "What is the leave policy?", "top_k": 3})
        out = ctx.results.get("output", {})
        assert "answer" in out
        assert isinstance(out.get("sources", []), list)

    @pytest.mark.asyncio
    async def test_phibot_automation_agent(self, client):
        agent = client.agents["phibot"]
        ctx = await agent.execute_verb("list_playbooks", {})
        out = ctx.results.get("output", {})
        assert "traversal_id" in out or "result_count" in out or "nodes" in out


        ctx_run = await agent.execute_verb("execute_playbook", {"playbook_id": "weekly_report"})
        assert ctx_run.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phione_identity_and_hr(self, client):
        agent = client.agents["phione"]
        ctx_user = await agent.execute_verb("lookup_user", {"email": "jane@phient.com"})
        assert ctx_user.results.get("output") is not None

        ctx_emp = await agent.execute_verb("lookup_employee", {"email": "jane@phient.com"})
        assert ctx_emp.results.get("output") is not None

        ctx_leave = await agent.execute_verb("get_leave_balance", {"email": "jane@phient.com"})
        assert ctx_leave.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phidoc_documentation_agent(self, client):
        agent = client.agents["phidoc"]
        ctx = await agent.execute_verb("search_pages", {"query": "architecture"})
        assert ctx.results.get("output") is not None

        ctx_create = await agent.execute_verb("create_page", {"title": "Test Runbook", "content": "# Test"})
        assert ctx_create.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phibrd_onboarding_agent(self, client):
        agent = client.agents["phibrd"]
        ctx = await agent.execute_verb(
            "onboard_employee",
            {
                "full_name": "Jane Muthoni",
                "email": "jane.m@phient.com",
                "department": "Engineering",
                "title": "Software Engineer",
                "start_date": "2026-08-01",
                "country": "KE",
            },
        )
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_philog_telemetry_agent(self, client):
        agent = client.agents["philog"]
        records = agent.tail(5)
        assert isinstance(records, list)

        entry = agent.emit("TEST_AUDIT_EVENT", actor="tester", details={"key": "val"})
        assert entry is not None

    @pytest.mark.asyncio
    async def test_phical_quantum_agent(self, client):
        agent = client.agents["phical"]
        ctx = await agent.execute_verb("execute_circuit", {"circuit": "bell_state", "gates": "H:0,CNOT:0:1"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phigit_git_agent(self, client):
        agent = client.agents["phigit"]
        ctx = await agent.execute_verb("get_status", {})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phisec_security_agent(self, client):
        agent = client.agents["phisec"]
        ctx = await agent.execute_verb("scan_vulnerability", {"target": "workspace"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phigov_governance_agent(self, client):
        agent = client.agents["phigov"]
        ctx = await agent.execute_verb("check_compliance", {"policy": "data_retention"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phibus_event_bus_agent(self, client):
        agent = client.agents["phibus"]
        ctx = await agent.execute_verb("publish_event", {"topic": "system.ready", "payload": {"status": "ok"}})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phimen_executive_agent(self, client):
        agent = client.agents["phimen"]
        ctx = await agent.execute_verb("plan_strategy", {"objective": "scale operations"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phiora_storage_agent(self, client):
        agent = client.agents["phiora"]
        ctx = await agent.execute_verb("resolve_dataset", {"dataset_id": "knowledge_base"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phillm_gateway_agent(self, client):
        agent = client.agents["phillm"]
        ctx = await agent.execute_verb("generate_completion", {"prompt": "Hello Phient"})
        assert ctx.results.get("output") is not None

    @pytest.mark.asyncio
    async def test_phigen_codegen_agent(self, client):
        agent = client.agents["phigen"]
        ctx = await agent.execute_verb("generate_types", {})
        assert ctx.results.get("output") is not None
