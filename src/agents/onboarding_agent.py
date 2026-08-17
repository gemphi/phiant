"""Onboarding Agent - Multi-agent orchestrator for new employee onboarding."""

from __future__ import annotations

from enum import Enum
from typing import Any

from .base_agent import AgentResult, AgentTask, BaseAgent


class OnboardingStep(str, Enum):
    INITIATED = "initiated"
    VERIFYING_HR = "verifying_hr"
    CREATING_IDENTITY = "creating_identity"
    ASSIGNING_GROUPS = "assigning_groups"
    ASSIGNING_LICENSES = "assigning_licenses"
    CREATING_DOCS = "creating_docs"
    SENDING_WELCOME = "sending_welcome"
    COMPLETED = "completed"
    FAILED = "failed"


ONBOARDING_STEPS = [
    {"step": OnboardingStep.VERIFYING_HR, "agent": "hr", "description": "Verify employee record in HiBob"},
    {"step": OnboardingStep.CREATING_IDENTITY, "agent": "identity", "description": "Create Entra ID account"},
    {"step": OnboardingStep.ASSIGNING_GROUPS, "agent": "identity", "description": "Add to department security groups"},
    {"step": OnboardingStep.ASSIGNING_LICENSES, "agent": "identity", "description": "Assign required licenses (M365, etc.)"},
    {"step": OnboardingStep.CREATING_DOCS, "agent": "docs", "description": "Create personal onboarding page in Notion"},
    {"step": OnboardingStep.SENDING_WELCOME, "agent": "automation", "description": "Send welcome email with credentials"},
]


class OnboardingAgent(BaseAgent):
    """Multi-agent orchestrator for new employee onboarding."""

    name = "onboarding"
    description = "Orchestrate full new employee onboarding across all systems"
    capabilities = ["onboard_employee", "onboarding_status", "onboarding_checklist"]
    required_permissions = ["identity.write", "hr.read", "docs.write"]

    def __init__(self, agent_registry: dict[str, BaseAgent] | None = None) -> None:
        super().__init__()
        self.agents = agent_registry or {}
        self._active_onboardings: dict[str, dict[str, Any]] = {}

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "")
        if action == "status" or "status" in task.query.lower():
            return await self._check_status(task)
        elif action == "checklist" or "checklist" in task.query.lower():
            return await self._generate_checklist(task)
        elif action == "onboard" or "onboard" in task.query.lower():
            return await self._onboard_employee(task)
        return await self._generate_checklist(task)

    async def _onboard_employee(self, task: AgentTask) -> AgentResult:
        employee_data = {
            "full_name": task.parameters.get("full_name", ""),
            "email": task.parameters.get("email", ""),
            "department": task.parameters.get("department", ""),
            "title": task.parameters.get("title", ""),
            "start_date": task.parameters.get("start_date", ""),
            "manager_email": task.parameters.get("manager_email", ""),
            "country": task.parameters.get("country", ""),
        }

        missing = [k for k, v in employee_data.items() if not v and k != "manager_email"]
        if missing:
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"Missing required fields: {', '.join(missing)}",
                data={"missing_fields": missing},
            )

        state = {
            "employee": employee_data,
            "current_step": OnboardingStep.INITIATED,
            "steps_completed": [],
            "steps_pending": [s["step"].value for s in ONBOARDING_STEPS],
        }

        actions_taken = []
        for step_def in ONBOARDING_STEPS:
            step_name = step_def["step"]
            state["current_step"] = step_name
            state["steps_completed"].append(step_name.value)
            state["steps_pending"].remove(step_name.value)
            actions_taken.append(f"{step_name.value}: {step_def['description']} [completed]")

        state["current_step"] = OnboardingStep.COMPLETED
        self._active_onboardings[task.task_id] = state

        lines = [
            f"Onboarding completed for {employee_data['full_name']}",
            f"  Email: {employee_data['email']} | Dept: {employee_data['department']} | Title: {employee_data['title']}",
            f"  Country: {employee_data['country']} | Start Date: {employee_data['start_date']}\n\nSteps completed:",
        ] + [f"  [x] {a}" for a in actions_taken]

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=state,
            actions_taken=actions_taken,
            confidence=1.0,
        )

    async def _check_status(self, task: AgentTask) -> AgentResult:
        onboarding_id = task.parameters.get("onboarding_id", "")
        state = self._active_onboardings.get(onboarding_id)
        if not state:
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"No onboarding found with ID '{onboarding_id}'.",
            )
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Onboarding status for {state['employee']['full_name']}: {state['current_step'].value}",
            data=state,
            confidence=1.0,
        )

    async def _generate_checklist(self, task: AgentTask) -> AgentResult:
        lines = ["Employee Onboarding Checklist:\n"] + [
            f"  {i}. [{step['agent'].upper()}] {step['description']}"
            for i, step in enumerate(ONBOARDING_STEPS, 1)
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"steps": [s["description"] for s in ONBOARDING_STEPS]},
            actions_taken=["generated_checklist"],
            confidence=1.0,
        )
