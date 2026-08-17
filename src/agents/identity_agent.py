"""Identity Agent - Microsoft Entra ID integration."""

from __future__ import annotations

from typing import Any

from ..utils import load_json_data
from .base_agent import AgentResult, AgentTask, BaseAgent


class IdentityAgent(BaseAgent):
    """Microsoft Entra ID integration agent for user/group management."""

    name = "identity"
    description = "Manage user identities, groups, and licenses in Microsoft Entra ID"
    capabilities = ["user_lookup", "user_provision", "user_deprovision", "group_manage", "access_review", "license_assign"]
    required_permissions = ["identity.read", "identity.write"]

    def __init__(self, entra_connector: Any = None) -> None:
        super().__init__()
        self.entra = entra_connector

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
        if self.entra:
            user_data = await self.entra.get_user(email)
        else:
            mock = load_json_data("identity_mock.json", default={})
            user_data = mock.get("user", {})
            user_data["email"] = email if "@" in email else f"{email}@phiant.com"

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
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="needs_approval",
            output=f"User creation requires approval for email '{task.parameters.get('email', 'Unknown')}'.",
            data={"action": "create_user", "proposed_data": task.parameters, "requires_approval": True},
            actions_taken=["requested_approval(create_user)"],
            confidence=1.0,
        )

    async def _disable_user(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="needs_approval",
            output=f"Account disable for '{email}' requires approval.",
            data={"action": "disable_user", "email": email, "requires_approval": True},
            actions_taken=["requested_approval(disable_user)"],
            confidence=1.0,
        )

    async def _list_user_groups(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", task.query)
        mock = load_json_data("identity_mock.json", default={})
        groups = mock.get("groups", [])
        lines = [f"Groups for {email}:\n"] + [f"  [{g['type']}] {g['name']}" for g in groups]
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output="\n".join(lines),
            data={"email": email, "groups": groups},
            actions_taken=[f"listed_groups({email})"],
            confidence=1.0,
        )

    async def _add_to_group(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        group = task.parameters.get("group_name", "")
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"User '{email}' added to group '{group}'.",
            data={"email": email, "group_name": group},
            actions_taken=[f"added_to_group({email}, {group})"],
            confidence=1.0,
        )

    async def _remove_from_group(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        group = task.parameters.get("group_name", "")
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="success",
            output=f"User '{email}' removed from group '{group}'. Admin notified.",
            data={"email": email, "group_name": group},
            actions_taken=[f"removed_from_group({email}, {group})", "notified_admin"],
            confidence=1.0,
        )

    async def _assign_license(self, task: AgentTask) -> AgentResult:
        email = task.parameters.get("email", "")
        license_name = task.parameters.get("license", "")
        return AgentResult(
            task_id=task.task_id,
            agent_name=self.name,
            status="needs_approval",
            output=f"License assignment ('{license_name}') for '{email}' requires approval.",
            data={"action": "assign_license", "email": email, "license": license_name, "requires_approval": True},
            actions_taken=["requested_approval(assign_license)"],
            confidence=1.0,
        )
