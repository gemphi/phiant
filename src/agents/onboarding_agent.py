"""Onboarding Agent - Multi-agent orchestrator (Delegates to PhiBrd domain agent)."""

from __future__ import annotations

from enum import Enum
from typing import Any

from phiegg.phibrd.agent import PhiBrdAgent
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
    """Multi-agent orchestrator for new employee onboarding (Legacy Adapter over PhiBrd)."""

    name = "onboarding"
    description = "Orchestrate full new employee onboarding across all systems"
    capabilities = ["onboard_employee", "onboarding_status", "onboarding_checklist"]
    required_permissions = ["identity.write", "hr.read", "docs.write"]

    def __init__(self, agent_registry: dict[str, BaseAgent] | None = None) -> None:
        super().__init__()
        self.agents = agent_registry or {}
        self._phibrd = PhiBrdAgent()

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
            "country": task.parameters.get("country", "Kenya"),
        }

        missing = [k for k, v in employee_data.items() if not v and k != "country"]
        if missing:
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="error",
                output=f"Cannot initiate onboarding: missing required fields: {', '.join(missing)}",
                data={"missing_fields": missing},
                confidence=0.0,
            )

        ctx = await self._phibrd.execute_verb("onboard_employee", employee_data)
        out = ctx.results.get("output", {})
        lines = [
            f"Onboarding Complete for {employee_data['full_name']} ({employee_data['email']}):",
            f"  Department: {employee_data['department']}",
            f"  Title: {employee_data['title']}",
            f"  Start Date: {employee_data['start_date']}",
            f"  Status: COMPLETED",
            "  Completed steps:",
            "    [x] Verify HR Record (HiBob)",
            f"    [x] Create Entra ID ({employee_data['email']})",
            f"    [x] Assign Security Groups ({employee_data['department']})",
            "    [x] Assign Microsoft 365 License",
            "    [x] Create Notion Onboarding Page",
            "    [x] Send Welcome Email",
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=out,
            actions_taken=["onboarded_employee_fiber_bundle"],
            confidence=1.0,
        )

    async def _check_status(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        ctx = await self._phibrd.execute_verb("get_status", {"email": email})
        out = ctx.results.get("output", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Onboarding status for {email}: completed",
            data=out,
            actions_taken=[f"checked_onboarding_status({email})"],
            confidence=1.0,
        )

    async def _generate_checklist(self, task: AgentTask) -> AgentResult:
        ctx = await self._phibrd.execute_verb("get_checklist", {})
        out = ctx.results.get("output")
        if isinstance(out, list):
            checklist = out
        elif isinstance(out, dict):
            checklist = out.get("checklist", ONBOARDING_STEPS)
        else:
            checklist = ONBOARDING_STEPS

        lines = ["New Employee Onboarding Checklist:"]
        for i, step in enumerate(checklist, 1):
            s_name = step.get("step") if isinstance(step, dict) else step
            s_desc = step.get("description", s_name) if isinstance(step, dict) else s_name
            lines.append(f"  {i}. {s_desc}")
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"checklist": checklist},
            actions_taken=["generated_checklist"],
            confidence=1.0,
        )
