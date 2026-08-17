"""HR Agent - HiBob HRIS integration."""

from __future__ import annotations

from typing import Any

from ..utils import load_json_data
from .base_agent import AgentResult, AgentTask, BaseAgent


class HRAgent(BaseAgent):
    """HiBob HRIS integration agent."""

    name = "hr"
    description = "Query employee data, leave balances, and org structure from HiBob"
    capabilities = ["employee_lookup", "org_structure", "leave_balance", "team_report", "headcount_report"]

    def __init__(self, hibob_connector: Any = None) -> None:
        super().__init__()
        self.hibob = hibob_connector

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "employee_lookup")
        handlers = {
            "employee_lookup": self._lookup_employee,
            "leave_balance": self._check_leave_balance,
            "org_structure": self._get_org_structure,
            "team_report": self._team_report,
            "headcount": self._headcount_report,
        }
        return await handlers.get(action, self._lookup_employee)(task)

    async def _lookup_employee(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        mock = load_json_data("hr_mock.json", default={})
        employee = mock.get("employee", {})
        employee["email"] = email if "@" in email else f"{email}@phiant.com"

        lines = [
            f"Employee: {employee.get('display_name', 'Unknown')}",
            f"  Email: {employee.get('email', email)}",
            f"  Title: {employee.get('title', 'N/A')}",
            f"  Department: {employee.get('department', 'N/A')} / {employee.get('division', 'N/A')}",
            f"  Location: {employee.get('site', 'N/A')}",
            f"  Manager: {employee.get('manager', 'N/A')}",
            f"  Start Date: {employee.get('start_date', 'N/A')}",
            f"  Status: {employee.get('status', 'active')}",
            f"  Type: {employee.get('employment_type', 'full-time')}",
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=employee,
            actions_taken=[f"looked_up_employee({email})"],
            confidence=1.0,
        )

    async def _check_leave_balance(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        mock = load_json_data("hr_mock.json", default={})
        balances = mock.get("leave_balances", [])
        lines = [f"Leave balance for {email}:\n"] + [
            f"  {b['type']}: {b['available']}/{b['total']} days available ({b['used']} used, {b['pending']} pending)"
            for b in balances
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"email": email, "balances": balances},
            actions_taken=[f"checked_leave_balance({email})"],
            confidence=1.0,
        )

    async def _get_org_structure(self, task: AgentTask) -> AgentResult:
        mock = load_json_data("hr_mock.json", default={})
        org = mock.get("org_structure", {})
        lines = [f"Org structure under {org.get('manager', 'Manager')}:\n"] + [
            f"  - {dr['name']} ({dr['title']}) - {dr['location']}" for dr in org.get("direct_reports", [])
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=org,
            actions_taken=["queried_org_structure"],
            confidence=1.0,
        )

    async def _team_report(self, task: AgentTask) -> AgentResult:
        department = task.parameters.get("department", "Engineering")
        report = {
            "department": department,
            "total_headcount": 47,
            "by_country": {"Kenya": 18, "Nigeria": 12, "Uganda": 8, "Ghana": 5, "South Africa": 2, "United Kingdom": 2},
        }
        lines = [f"Team Report: {department}\n  Total headcount: {report['total_headcount']}\n  By Country:"]
        lines.extend([f"    {c}: {n}" for c, n in report["by_country"].items()])
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=report,
            actions_taken=[f"generated_team_report({department})"],
            confidence=1.0,
        )

    async def _headcount_report(self, task: AgentTask) -> AgentResult:
        group_by = task.parameters.get("group_by", "country")
        mock = load_json_data("hr_mock.json", default={})
        headcount = mock.get("headcount", {"total": 2534, "by_country": {}})
        lines = [f"M-KOPA Global Headcount: {headcount['total']}\n  By {group_by.title()}:"]
        lines.extend([f"    {k}: {v} ({round(v / headcount['total'] * 100, 1)}%)" for k, v in headcount.get("by_country", {}).items()])
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=headcount,
            actions_taken=[f"generated_headcount({group_by})"],
            confidence=1.0,
        )
