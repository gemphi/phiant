"""Agent Orchestrator - Multi-agent execution coordinator using PhiADK domain agents."""

from __future__ import annotations

import asyncio
import logging
import time
import uuid
from typing import Any

from phiadk.client import PhiADKClient
from .priority import calculate_priority, Priority
from .router import IntentRouter
from .state import AgentResult, AgentTask, OrchestratorState

logger = logging.getLogger(__name__)


class Orchestrator:
    """Multi-agent orchestrator that routes, executes, and aggregates agent results via PhiADK."""

    AGENT_ALIASES: dict[str, str] = {
        "hr": "phione",
        "identity": "phione",
        "knowledge": "phirag",
        "docs": "phidoc",
        "automation": "phibot",
        "onboarding": "phibrd",
        "quantum": "phical",
        "data": "phiora",
        "executive": "phimen",
        "telemetry": "philog",
        "logging": "philog",
        "security": "phisec",
        "governance": "phigov",
        "bus": "phibus",
        "codegen": "phigen",
        "git": "phigit",
        "llm": "phillm",
    }

    def __init__(self, client: PhiADKClient | None = None) -> None:
        self.router = IntentRouter()
        self.client = client or PhiADKClient()
        self._history: list[OrchestratorState] = []
        logger.info("Initialized Orchestrator with %d PhiADK domain agents", len(self.client.agents))

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
        resolved_name = self.AGENT_ALIASES.get(agent_name, agent_name)
        agent = self.client.agents.get(resolved_name)
        if not agent:
            return AgentResult(
                task_id=task.task_id,
                agent_name=agent_name,
                status="error",
                output=f"Unknown agent: {agent_name} (resolved to {resolved_name})",
            )

        verb = task.intent or "default"
        params = dict(task.parameters)
        if "query" not in params and task.query:
            params["query"] = task.query

        try:
            ctx = await agent.execute_verb(verb, params)
            out = ctx.results.get("output", {})
            output_str = out.get("answer") if isinstance(out, dict) and "answer" in out else str(out)
            sources = out.get("sources", []) if isinstance(out, dict) else []

            return AgentResult(
                task_id=task.task_id,
                agent_name=agent_name,
                status="success",
                output=output_str,
                data=out if isinstance(out, dict) else {"result": out},
                actions_taken=[f"executed_verb_{verb}"],
                confidence=ctx.confidence or 0.9,
                sources=sources,
            )
        except Exception as e:
            return AgentResult(
                task_id=task.task_id,
                agent_name=agent_name,
                status="error",
                output=f"Execution error on {resolved_name}: {e}",
            )

    async def _execute_sequential(self, agent_names: list[str], task: AgentTask) -> AgentResult:
        results: list[AgentResult] = []
        for name in agent_names:
            if results:
                task.context["previous_results"] = [r.to_dict() for r in results]
            results.append(await self._execute_single(name, task))
        return self._aggregate_results(results, task)

    async def _execute_parallel(self, agent_names: list[str], task: AgentTask) -> AgentResult:
        tasks = [self._execute_single(name, task) for name in agent_names]
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
        return {
            name: {
                "name": name,
                "domain": agent.domain,
                "layer": str(agent.layer),
                "version": agent.version,
                "status": "healthy",
            }
            for name, agent in self.client.agents.items()
        }

    def get_metrics(self) -> dict[str, Any]:
        total = len(self._history)
        errors = sum(1 for s in self._history if s.status == "error")
        return {
            "total_requests": total,
            "error_count": errors,
            "success_rate": round((total - errors) / total, 3) if total > 0 else 1.0,
            "agents": self.get_agents_status(),
        }
