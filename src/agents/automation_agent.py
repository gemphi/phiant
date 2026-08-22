"""Automation Agent - Workflow automation and playbook execution (Delegates to PhiBot domain agent)."""

from __future__ import annotations

from typing import Any

from phiegg.phibot.agent import PhiBotAgent
from .base_agent import AgentResult, AgentTask, BaseAgent


class AutomationAgent(BaseAgent):
    """Workflow automation agent that executes predefined playbooks (Legacy Adapter over PhiBot)."""

    name = "automation"
    description = "Execute workflow automations and operational playbooks"
    capabilities = [
        "run_automation",
        "list_automations",
        "schedule_automation",
        "check_automation_status",
    ]

    def __init__(self) -> None:
        super().__init__()
        self._phibot = PhiBotAgent()

    async def execute(self, task: AgentTask) -> AgentResult:
        intent = task.parameters.get("action", "list")
        if intent == "list":
            return await self._list_playbooks(task)
        elif intent == "run":
            return await self._run_playbook(task)
        elif intent == "status":
            return await self._check_status(task)
        return await self._smart_match(task)

    async def _list_playbooks(self, task: AgentTask) -> AgentResult:
        category = task.parameters.get("category")
        ctx = await self._phibot.execute_verb("list_playbooks", {"category": category})
        traversal = ctx.results.get("output", {})
        nodes = traversal.get("nodes", []) if isinstance(traversal, dict) else []
        playbooks = [n.get("properties", {}) for n in nodes]

        lines = ["Available Automation Playbooks:\n"]
        for p in playbooks:
            lines.append(f"  [{p.get('id')}] {p.get('name')} ({p.get('category')})\n    {p.get('description')}\n")

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"playbooks": playbooks, "count": len(playbooks)},
            actions_taken=["listed_playbooks"],
            confidence=1.0,
        )

    async def _run_playbook(self, task: AgentTask) -> AgentResult:
        playbook_id = task.parameters.get("playbook_id", "")
        ctx = await self._phibot.execute_verb("execute_playbook", {
            "playbook_id": playbook_id,
            "parameters": task.parameters.get("playbook_params", {}),
        })
        out = ctx.results.get("output", {})
        if not out.get("completed", True) or out.get("status") == "failed" or "error" in out or out.get("error"):
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"Unknown playbook '{playbook_id}'. Use action='list' to see available playbooks.",
                data={"error": f"Playbook not found: {playbook_id}"},
                confidence=0.0,
            )

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Playbook '{playbook_id}' executed successfully.",
            data=out,
            actions_taken=[f"executed_playbook({playbook_id})"],
            confidence=1.0,
        )

    async def _check_status(self, task: AgentTask) -> AgentResult:
        run_id = task.parameters.get("run_id", "")
        ctx = await self._phibot.execute_verb("check_status", {"run_id": run_id})
        out = ctx.results.get("output", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Execution status for {run_id}: completed",
            data=out,
            actions_taken=[f"checked_status({run_id})"],
            confidence=1.0,
        )

    async def _smart_match(self, task: AgentTask) -> AgentResult:
        return await self._list_playbooks(task)
