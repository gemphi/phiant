"""Intent Router - Classifies user intent and selects appropriate agents."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class RoutingDecision:
    """Result of intent classification and agent routing."""

    intent: str
    agents: list[str]
    execution_mode: str
    parameters: dict[str, Any]
    confidence: float


def _load_intent_patterns() -> dict[str, dict[str, Any]]:
    p = Path(__file__).resolve().parents[3] / "data" / "intents.json"
    if p.exists():
        try:
            with open(p, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "knowledge_query": {"keywords": ["leave", "policy", "faq", "what is"], "agents": ["knowledge"], "mode": "single"},
        "identity_operation": {"keywords": ["user", "access", "entra", "account"], "agents": ["identity"], "mode": "single"},
        "hr_operation": {"keywords": ["employee", "org", "leave balance", "hr"], "agents": ["hr"], "mode": "single"},
        "docs_operation": {"keywords": ["notion", "docs", "documentation", "runbook"], "agents": ["docs"], "mode": "single"},
        "automation_operation": {"keywords": ["run", "automate", "playbook", "report"], "agents": ["automation"], "mode": "single"},
        "onboarding_workflow": {"keywords": ["onboard", "new hire", "starting"], "agents": ["onboarding"], "mode": "single"},
    }


class IntentRouter:
    """Routes user queries to the appropriate agent(s)."""

    def __init__(self) -> None:
        self._client: Any = None
        self._patterns = _load_intent_patterns()

    @property
    def client(self) -> Any:
        return self._client

    async def route(self, query: str, context: dict[str, Any] | None = None) -> RoutingDecision:
        return self._keyword_classify(query)

    def _keyword_classify(self, query: str) -> RoutingDecision:
        query_lower = query.lower()
        best_intent, best_score = "knowledge_query", 0

        for intent, pattern in self._patterns.items():
            score = sum(1 for kw in pattern.get("keywords", []) if kw in query_lower)
            if score > best_score:
                best_score, best_intent = score, intent

        pattern = self._patterns.get(best_intent, {"agents": ["knowledge"], "mode": "single"})
        return RoutingDecision(
            intent=best_intent,
            agents=pattern.get("agents", ["knowledge"]),
            execution_mode=pattern.get("mode", "single"),
            parameters={},
            confidence=min(0.5 + best_score * 0.1, 0.9),
        )
