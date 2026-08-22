"""Identity Agent - Microsoft Entra ID integration (Delegates to PhiOne domain agent)."""

from __future__ import annotations

from typing import Any

from phiadk.phione.agent import PhiOneAgent
from .base_agent import AgentResult, AgentTask, BaseAgent


class IdentityAgent(BaseAgent):
    """Microsoft Entra ID integration agent (Legacy Adapter over PhiOne)."""

    name = "identity"
    description = "Manage user identities, groups, and licenses in Microsoft Entra ID"
    capabilities = ["user_lookup", "user_provision", "user_deprovision", "group_manage", "access_review", "license_assign"]
    required_permissions = ["identity.read", "identity.write"]

    def __init__(self, entra_connector: Any = None) -> None:
        super().__init__()
        self.entra = entra_connector
        self._phione = PhiOneAgent()

    async def execute(self, task: AgentTask) -> AgentResult:
        action = task.parameters.get("action", "lookup")
        handlers = {
            "lookup": self._lookup_user,
            "create_user": self._create_user,
            "disable_user": self._disable_user,
            "list_groups": self._list_user_groups,
            "add_to_group": self._add_to_group,
            "remove_from_group": self._remove_from_group,
            "assign_license": self._assign_license,
        }
        return await handlers.get(action, self._lookup_user)(task)

    async def _lookup_user(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        ctx = await self._phione.execute_verb("lookup_user", {"email": email})
        user_node = ctx.results.get("output", {})
        user_data = user_node if isinstance(user_node, dict) else user_node.to_dict()

        lines = [
            f"User Profile: {user_data.get('display_name', 'Unknown')}",
            f"  Email: {user_data.get('email', email)}",
            f"  Title: {user_data.get('job_title', 'N/A')}",
            f"  Department: {user_data.get('department', 'N/A')}",
            f"  Location: {user_data.get('office_location', 'N/A')}",
            f"  Account Enabled: {user_data.get('account_enabled', True)}",
        ]
        if "groups" in user_data:
            lines.append(f"  Groups: {', '.join(user_data['groups'])}")
        if "licenses" in user_data:
            lines.append(f"  Licenses: {', '.join(user_data['licenses'])}")

        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data=user_data,
            actions_taken=[f"looked_up_user({email})"],
            confidence=1.0,
        )

    async def _create_user(self, task: AgentTask) -> AgentResult:
        display_name = task.parameters.get("display_name", "")
        email = task.parameters.get("email", "")
        department = task.parameters.get("department", "General")
        job_title = task.parameters.get("job_title", "Employee")

        if not task.parameters.get("approved", False):
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="needs_approval",
                output=f"APPROVAL REQUIRED: Create Entra ID account for {display_name} ({email}) in {department} as {job_title}",
                data={"pending_action": "create_user", "params": task.parameters},
                actions_taken=["requested_approval(create_user)"],
                confidence=1.0,
            )

        ctx = await self._phione.execute_verb("create_user", {
            "display_name": display_name, "email": email,
            "department": department, "job_title": job_title,
        })
        user_info = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"User created: {display_name} ({email}) - UPN: {user_info.get('user_principal_name')}",
            data=user_info,
            actions_taken=[f"created_user({email})"],
            confidence=1.0,
        )

    async def _disable_user(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        if not task.parameters.get("approved", False):
            return AgentResult(
                task_id=task.task_id,
                agent_name=self.name,
                status="needs_approval",
                output=f"APPROVAL REQUIRED: Disable Entra ID account for {email}",
                data={"pending_action": "disable_user", "email": email},
                actions_taken=["requested_approval(disable_user)"],
                confidence=1.0,
            )

        ctx = await self._phione.execute_verb("disable_user", {"email": email})
        res = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"User account disabled: {email}",
            data=res,
            actions_taken=[f"disabled_user({email})"],
            confidence=1.0,
        )

    async def _list_user_groups(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        ctx = await self._phione.execute_verb("lookup_user", {"email": email})
        user_node = ctx.results.get("output", {})
        groups = user_node.get("groups", []) if isinstance(user_node, dict) else []
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Groups for {email}:\n" + "\n".join(f"  - {g}" for g in groups),
            data={"email": email, "groups": groups},
            actions_taken=[f"listed_groups({email})"],
            confidence=1.0,
        )

    async def _add_to_group(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        group = task.parameters.get("group", "")
        ctx = await self._phione.execute_verb("add_group_member", {"email": email, "group_name": group})
        res = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Added {email} to group '{group}'",
            data=res,
            actions_taken=[f"added_to_group({email}, {group})"],
            confidence=1.0,
        )

    async def _remove_from_group(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        group = task.parameters.get("group", "")
        ctx = await self._phione.execute_verb("remove_group_member", {"email": email, "group_name": group})
        res = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Removed {email} from group '{group}'",
            data=res,
            actions_taken=[f"removed_from_group({email}, {group})"],
            confidence=1.0,
        )

    async def _assign_license(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        sku = task.parameters.get("sku", "Microsoft 365 E5")
        ctx = await self._phione.execute_verb("assign_license", {"email": email, "sku": sku})
        res = ctx.results.get("output", {}).get("result", {})
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"Assigned license '{sku}' to {email}",
            data=res,
            actions_taken=[f"assigned_license({email}, {sku})"],
            confidence=1.0,
        )
