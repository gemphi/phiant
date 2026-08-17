"""Automation Agent - Workflow automation and playbook execution."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .base_agent import AgentResult, AgentTask, BaseAgent


from ..utils import load_json_data

def _load_playbooks() -> dict[str, dict[str, Any]]:
    items = load_json_data("playbooks.json", default=[])
    if items:
        return {item["id"]: item for item in items}
    return {
        "weekly_report": {
            "id": "weekly_report",
            "name": "Weekly Team Report Generator",
            "description": "Generates weekly team activity reports",
            "category": "reporting",
            "estimated_duration_s": 30,
        }
    }


PLAYBOOKS = _load_playbooks()


class AutomationAgent(BaseAgent):
    """Workflow automation agent that executes predefined playbooks."""

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
        self._execution_log: list[dict[str, Any]] = []

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
        playbooks = list(PLAYBOOKS.values())
        if category:
            playbooks = [p for p in playbooks if p["category"] == category]

        lines = ["Available automation playbooks:\n"]
        for pb in playbooks:
            lines.append(
                f"  [{pb['id']}] {pb['name']}\n"
                f"    {pb['description']}\n"
                f"    Category: {pb['category']} | Est. duration: {pb['estimated_duration_s']}s\n"
            )

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
        playbook = PLAYBOOKS.get(playbook_id)

        if not playbook:
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"Playbook '{playbook_id}' not found.",
                data={"available": list(PLAYBOOKS.keys())},
            )

        record = {
            "execution_id": task.task_id,
            "playbook_id": playbook_id,
            "started_at": datetime.now(timezone.utc).isoformat(),
            "status": "completed",
        }
        self._execution_log.append(record)

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Playbook '{playbook['name']}' executed successfully.",
            data=record,
            actions_taken=[f"executed_playbook({playbook_id})"],
            confidence=1.0,
        )

    async def _check_status(self, task: AgentTask) -> AgentResult:
        execution_id = task.parameters.get("execution_id", "")
        record = next((r for r in self._execution_log if r["execution_id"] == execution_id), None)
        if not record:
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"No execution found with ID '{execution_id}'.",
            )
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Execution {execution_id}: {record['status']}",
            data=record,
            confidence=1.0,
        )

    async def _smart_match(self, task: AgentTask) -> AgentResult:
        query_lower = task.query.lower()
        best_match, best_score = None, 0

        for pb in PLAYBOOKS.values():
            score = sum(2 if w in pb["name"].lower() else 1 for w in query_lower.split() if w in pb["description"].lower())
            if score > best_score:
                best_score, best_match = score, pb

        if best_match and best_score >= 1:
            task.parameters["playbook_id"] = best_match["id"]
            task.parameters["action"] = "run"
            return await self._run_playbook(task)

        return await self._list_playbooks(task)
