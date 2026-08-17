"""Tests for priority framework and intent router."""

import pytest

from src.agents.base_agent import Priority
from src.orchestrator.priority import calculate_priority
from src.orchestrator.router import IntentRouter


class TestPriority:
    def test_urgent_keywords_boost_priority(self):
        priority = calculate_priority("URGENT: need access now", "identity_operation")
        assert priority in (Priority.P1_CRITICAL, Priority.P2_HIGH)

    def test_normal_query_standard_priority(self):
        priority = calculate_priority("What is the leave policy?", "knowledge_query")
        assert priority in (Priority.P3_STANDARD, Priority.P4_LOW)

    def test_security_intent_high_priority(self):
        priority = calculate_priority("Security incident detected", "identity_operation")
        assert priority in (Priority.P1_CRITICAL, Priority.P2_HIGH)


class TestIntentRouter:
    @pytest.fixture
    def router(self):
        return IntentRouter()

    async def test_knowledge_routing(self, router):
        result = await router.route("What is the company leave policy?")
        assert "knowledge" in result.agents

    async def test_identity_routing(self, router):
        result = await router.route("Add user to the Engineering group in Entra")
        assert "identity" in result.agents

    async def test_hr_routing(self, router):
        result = await router.route("Check my leave balance")
        assert "hr" in result.agents

    async def test_docs_routing(self, router):
        result = await router.route("Search Notion for deployment runbook")
        assert "docs" in result.agents

    async def test_onboarding_routing(self, router):
        result = await router.route("Onboard a new employee starting Monday")
        assert "onboarding" in result.agents
