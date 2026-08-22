"""HR Agent - HiBob HRIS integration (Delegates to PhiOne domain agent)."""

from __future__ import annotations

from typing import Any

from phiegg.phione.agent import PhiOneAgent
from .base_agent import AgentResult, AgentTask, BaseAgent


class HRAgent(BaseAgent):
    """HiBob HRIS integration agent (Legacy Adapter over PhiOne)."""

    name = "hr"
    description = "Query employee data, leave balances, and org structure from HiBob"
    capabilities = ["employee_lookup", "org_structure", "leave_balance", "team_report", "headcount_report"]

    def __init__(self, hibob_connector: Any = None) -> None:
        super().__init__()
        self.hibob = hibob_connector
        self._phione = PhiOneAgent()

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
        ctx = await self._phione.execute_verb("lookup_employee", {"email": email})
        emp_node = ctx.results.get("output", {})
        data = emp_node if isinstance(emp_node, dict) else emp_node.to_dict()

        lines = [
            f"Employee: {data.get('display_name', 'Unknown')}",
            f"  Email: {data.get('email', email)}",
            f"  Title: {data.get('title', 'N/A')}",
            f"  Department: {data.get('department', 'N/A')} / {data.get('division', 'N/A')}",
            f"  Location: {data.get('site', 'N/A')}",
            f"  Manager: {data.get('manager', 'N/A')}",
            f"  Start Date: {data.get('start_date', 'N/A')}",
            f"  Status: {data.get('status', 'active')}",
            f"  Type: {data.get('employment_type', 'full-time')}",
        ]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=data,
            actions_taken=[f"looked_up_employee({email})"],
            confidence=1.0,
        )

    async def _check_leave_balance(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        ctx = await self._phione.execute_verb("get_leave_balance", {"email": email})
        balances_node = ctx.results.get("output", {})
        balances = balances_node.get("balances", []) if isinstance(balances_node, dict) else []
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
        ctx = await self._phione.execute_verb("traverse_org", {"department": "Engineering"})
        org = ctx.results.get("output", {})
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
        ctx = await self._phione.execute_verb("traverse_team", {"department": department})
        report = ctx.results.get("output", {})
        lines = [f"Team Report: {department}\n  Total headcount: {report.get('total_headcount', 47)}\n  By Country:"]
        lines.extend([f"    {c}: {n}" for c, n in report.get("by_country", {}).items()])
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
        ctx = await self._phione.execute_verb("get_headcount", {"group_by": group_by})
        headcount = ctx.results.get("output", {"total": 2534, "by_country": {}})
        total = headcount.get("total", 2534)
        lines = [f"M-KOPA Global Headcount: {total}\n  By {group_by.title()}:"]
        lines.extend([f"    {k}: {v} ({round(v / total * 100, 1)}%)" for k, v in headcount.get("by_country", {}).items()])
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=headcount,
            actions_taken=[f"generated_headcount({group_by})"],
            confidence=1.0,
        )
