"""Phient Application Agents Package."""

from __future__ import annotations

from .automation_agent import AutomationAgent
from .base_agent import AgentResult, AgentTask, BaseAgent, Priority
from .docs_agent import DocsAgent
from .hr_agent import HRAgent
from .identity_agent import IdentityAgent
from .knowledge_agent import KnowledgeAgent
from .onboarding_agent import OnboardingAgent
from .philog_agent import TelemetryAgent, LogAgent

__all__ = [
    "BaseAgent",
    "AgentTask",
    "AgentResult",
    "Priority",
    "AutomationAgent",
    "DocsAgent",
    "HRAgent",
    "IdentityAgent",
    "KnowledgeAgent",
    "OnboardingAgent",
    "TelemetryAgent",
    "LogAgent",
]
