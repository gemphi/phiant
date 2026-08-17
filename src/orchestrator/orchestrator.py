"""Agent Orchestrator - Multi-agent execution coordinator."""

from __future__ import annotations

import asyncio
import logging
import time
import uuid
from typing import Any

from ..agents.automation_agent import AutomationAgent
from ..agents.base_agent import AgentResult, AgentTask, BaseAgent, Priority
from ..agents.docs_agent import DocsAgent
from ..agents.hr_agent import HRAgent
from ..agents.identity_agent import IdentityAgent
from ..agents.knowledge_agent import KnowledgeAgent
from ..agents.onboarding_agent import OnboardingAgent
from .priority import calculate_priority
from .router import IntentRouter
from .state import OrchestratorState

logger = logging.getLogger(__name__)


class Orchestrator:
    """Multi-agent orchestrator that routes, executes, and aggregates agent results."""

    def __init__(self) -> None:
        self.router = IntentRouter()
        self._agents: dict[str, BaseAgent] = {}
        self._history: list[OrchestratorState] = []
        self._initialize_agents()

    def _initialize_agents(self) -> None:
        self._agents = {
            "knowledge": KnowledgeAgent(),
            "automation": AutomationAgent(),
            "identity": IdentityAgent(),
            "hr": HRAgent(),
            "docs": DocsAgent(),
            "onboarding": OnboardingAgent(agent_registry=self._agents),
        }
        logger.info("Initialized %d agents", len(self._agents))

    async def process(
        self,
        query: str,
        user_id: str = "anonymous",
        session_id: str = "",
        priority: Priority | None = None,
    ) -> AgentResult:
        start_time = time.monotonic()
        request_id = str(uuid.uuid4())
        state = OrchestratorState(request_id=request_id, user_query=query, user_id=user_id)

        try:
            state.status = "routing"
            routing = await self.router.route(query)
            state.classified_intent = routing.intent
            state.selected_agents = routing.agents
            state.execution_mode = routing.execution_mode

            state.priority = priority or calculate_priority(query=query, intent=routing.intent)

            task = AgentTask(
                task_id=request_id,
                query=query,
                intent=routing.intent,
                parameters=routing.parameters,
                priority=state.priority,
                requested_by=user_id,
            )

            state.status = "executing"
            if routing.execution_mode == "single":
                result = await self._execute_single(routing.agents[0], task)
            elif routing.execution_mode == "parallel":
                result = await self._execute_parallel(routing.agents, task)
            else:
                result = await self._execute_sequential(routing.agents, task)

            elapsed_ms = int((time.monotonic() - start_time) * 1000)
            result.duration_ms = elapsed_ms
            state.final_response = result.output
            state.status = "complete"

        except Exception as exc:
            state.status = "error"
            state.error = str(exc)
            result = AgentResult(
                task_id=request_id,
                agent_name="orchestrator",
                status="error",
                output=f"Orchestration error: {exc}",
            )

        self._history.append(state)
        return result

    async def _execute_single(self, agent_name: str, task: AgentTask) -> AgentResult:
        agent = self._agents.get(agent_name)
        if not agent:
            return AgentResult(
                task_id=task.task_id,
                agent_name="orchestrator",
                status="error",
                output=f"Unknown agent: {agent_name}",
            )
        return await agent.run(task)

    async def _execute_sequential(self, agent_names: list[str], task: AgentTask) -> AgentResult:
        results: list[AgentResult] = []
        for agent_name in agent_names:
            agent = self._agents.get(agent_name)
            if not agent:
                continue
            if results:
                task.context["previous_results"] = [r.to_dict() for r in results]
            results.append(await agent.run(task))
        return self._aggregate_results(results, task)

    async def _execute_parallel(self, agent_names: list[str], task: AgentTask) -> AgentResult:
        tasks = [self._agents[name].run(task) for name in agent_names if name in self._agents]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        valid = [r for r in results if isinstance(r, AgentResult)]
        return self._aggregate_results(valid, task)

    def _aggregate_results(self, results: list[AgentResult], task: AgentTask) -> AgentResult:
        if not results:
            return AgentResult(
                task_id=task.task_id,
                agent_name="orchestrator",
                status="error",
                output="No agents produced results.",
            )

        if len(results) == 1:
            return results[0]

        combined_output = "\n\n---\n\n".join(f"[{r.agent_name.upper()}] {r.output}" for r in results)
        actions, tokens, sources = [], 0, []
        for r in results:
            actions.extend(r.actions_taken)
            tokens += r.tokens_used
            sources.extend(r.sources)

        return AgentResult(
            task_id=task.task_id,
            agent_name="orchestrator",
            status="success",
            output=combined_output,
            data={"agent_results": {r.agent_name: r.to_dict() for r in results}},
            actions_taken=actions,
            tokens_used=tokens,
            confidence=sum(r.confidence for r in results) / len(results),
            sources=sources,
        )

    def get_agents_status(self) -> dict[str, Any]:
        return {name: agent.health for name, agent in self._agents.items()}

    def get_metrics(self) -> dict[str, Any]:
        total = len(self._history)
        errors = sum(1 for s in self._history if s.status == "error")
        return {
            "total_requests": total,
            "error_count": errors,
            "success_rate": round((total - errors) / total, 3) if total > 0 else 1.0,
            "agents": self.get_agents_status(),
        }
