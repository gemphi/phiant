"""Intent Router - Classifies user intent and selects appropriate agents."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import Any

from anthropic import AsyncAnthropic

from ..config import settings
from ..utils import load_json_data


@dataclass
class RoutingDecision:
    """Result of intent classification and agent routing."""

    intent: str
    agents: list[str]
    execution_mode: str
    parameters: dict[str, Any]
    confidence: float


def _load_intent_patterns() -> dict[str, dict[str, Any]]:
    return load_json_data("intents.json", default={})


class IntentRouter:
    """Routes user queries to the appropriate agent(s)."""

    def __init__(self) -> None:
        self._client: AsyncAnthropic | None = None
        self._patterns = _load_intent_patterns()

    @property
    def client(self) -> AsyncAnthropic | None:
        if self._client is None and settings.anthropic_api_key:
            self._client = AsyncAnthropic(api_key=settings.anthropic_api_key)
        return self._client

    async def route(self, query: str, context: dict[str, Any] | None = None) -> RoutingDecision:
        if self.client:
            try:
                return await self._llm_classify(query, context)
            except Exception:
                pass
        return self._keyword_classify(query)

    async def _llm_classify(self, query: str, context: dict[str, Any] | None = None) -> RoutingDecision:
        system_prompt = (
            "Analyse the user's request and classify the intent.\n\n"
            "Available agents: knowledge, automation, identity, hr, docs, onboarding.\n"
            "Respond with ONLY JSON: {\"intent\": \"...\", \"agents\": [\"...\"], \"execution_mode\": \"single\", \"parameters\": {}, \"confidence\": 0.9}"
        )
        response = await self.client.messages.create(
            model=settings.anthropic_model,
            max_tokens=256,
            system=system_prompt,
            messages=[{"role": "user", "content": query}],
        )

        text = response.content[0].text.strip()
        if text.startswith("```"):
            text = re.sub(r"```\w*\n?", "", text).strip()

        data = json.loads(text)
        return RoutingDecision(
            intent=data.get("intent", "knowledge_query"),
            agents=data.get("agents", ["knowledge"]),
            execution_mode=data.get("execution_mode", "single"),
            parameters=data.get("parameters", {}),
            confidence=data.get("confidence", 0.5),
        )

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
