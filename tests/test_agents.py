"""Tests for Phient agents."""

import pytest

from src.agents.automation_agent import AutomationAgent
from src.agents.base_agent import AgentTask
from src.agents.docs_agent import DocsAgent
from src.agents.hr_agent import HRAgent
from src.agents.identity_agent import IdentityAgent
from src.agents.knowledge_agent import KnowledgeAgent
from src.agents.onboarding_agent import OnboardingAgent


class TestKnowledgeAgent:
    @pytest.fixture
    def agent(self):
        return KnowledgeAgent()

    async def test_execute_returns_result(self, agent):
        result = await agent.run(AgentTask(query="What is the leave policy?"))
        assert result.status == "success"
        assert result.agent_name == "knowledge"

    async def test_empty_query_rejected(self, agent):
        result = await agent.run(AgentTask(query=""))
        assert result.status == "error"

    async def test_sources_included(self, agent):
        result = await agent.run(AgentTask(query="What is the leave policy?"))
        assert isinstance(result.sources, list)

    async def test_health_metrics(self, agent):
        await agent.run(AgentTask(query="What is the leave policy?"))
        assert agent.health["name"] == "knowledge"
        assert agent.health["requests_total"] == 1


class TestAutomationAgent:
    @pytest.fixture
    def agent(self):
        return AutomationAgent()

    async def test_list_playbooks(self, agent):
        result = await agent.run(AgentTask(query="list automations", parameters={"action": "list"}))
        assert result.status == "success"

    async def test_run_playbook(self, agent):
        result = await agent.run(AgentTask(query="run report", parameters={"action": "run", "playbook_id": "weekly_report"}))
        assert result.status == "success"

    async def test_unknown_playbook(self, agent):
        result = await agent.run(AgentTask(query="run unknown", parameters={"action": "run", "playbook_id": "nonexistent"}))
        assert result.status == "error"


class TestIdentityAgent:
    @pytest.fixture
    def agent(self):
        return IdentityAgent()

    async def test_user_lookup(self, agent):
        result = await agent.run(AgentTask(query="Look up user", parameters={"action": "lookup", "email": "jane@phient.com"}))
        assert result.status == "success"

    async def test_create_user_requires_approval(self, agent):
        result = await agent.run(AgentTask(query="Create user", parameters={"action": "create_user", "email": "test@phient.com"}))
        assert result.status == "needs_approval"

    async def test_disable_user_requires_approval(self, agent):
        result = await agent.run(AgentTask(query="Disable user", parameters={"action": "disable_user", "email": "test@phient.com"}))
        assert result.status == "needs_approval"


class TestHRAgent:
    @pytest.fixture
    def agent(self):
        return HRAgent()

    async def test_employee_lookup(self, agent):
        result = await agent.run(AgentTask(query="Look up employee", parameters={"action": "employee_lookup", "email": "jane@phient.com"}))
        assert result.status == "success"

    async def test_leave_balance(self, agent):
        result = await agent.run(AgentTask(query="Check leave balance", parameters={"action": "leave_balance", "email": "jane@phient.com"}))
        assert result.status == "success"

    async def test_headcount(self, agent):
        result = await agent.run(AgentTask(query="Headcount report", parameters={"action": "headcount"}))
        assert result.status == "success"


class TestDocsAgent:
    @pytest.fixture
    def agent(self):
        return DocsAgent()

    async def test_search_docs(self, agent):
        result = await agent.run(AgentTask(query="runbook", parameters={"action": "search"}))
        assert result.status == "success"

    async def test_create_page(self, agent):
        result = await agent.run(AgentTask(query="Create page", parameters={"action": "create", "title": "Test"}))
        assert result.status == "success"


class TestOnboardingAgent:
    @pytest.fixture
    def agent(self):
        return OnboardingAgent()

    async def test_onboard_employee(self, agent):
        task = AgentTask(
            query="Onboard new employee",
            parameters={
                "action": "onboard",
                "full_name": "Jane Muthoni",
                "email": "jane.m@phient.com",
                "department": "Engineering",
                "title": "Software Engineer",
                "start_date": "2026-08-01",
                "country": "KE",
            },
        )
        result = await agent.run(task)
        assert result.status == "success"

    async def test_missing_fields(self, agent):
        result = await agent.run(AgentTask(query="Onboard", parameters={"action": "onboard", "full_name": "Jane"}))
        assert result.status == "error"

    async def test_checklist(self, agent):
        result = await agent.run(AgentTask(query="Onboarding checklist", parameters={"action": "checklist"}))
        assert result.status == "success"
