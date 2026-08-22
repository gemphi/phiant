"""PhiOne Identity space morphisms.

Refactored from ``identity_agent.py``.  All data flows through
``DataSet`` references.  Morphism creation is factored into
``_approval_morphism`` to eliminate repetition.
"""

from __future__ import annotations

from typing import Any, Dict

from phiadk._core.agent_base import DataSet
from phiadk._core.topology import Morphism, Traversal
from phiadk.agents.phione.models import GroupNode, IdentityNode


class IdentityClient:
    """Morphisms and traversals over the identity topology space."""

    IDENTITY_DATA = DataSet(set_id="identities", set_type="live", source="identity_mock.json")

    def __init__(self, entra_connector=None, data_resolver=None) -> None:
        self._entra = entra_connector
        self._data_resolver = data_resolver

    # ── Traversals ───────────────────────────────────────────────────

    async def lookup(self, email: str) -> IdentityNode:
        """Traverse the identity space to find a user node."""
        if self._entra:
            user_data = await self._entra.get_user(email)
        else:
            user_data = self._resolve_key("user")
            user_data["email"] = email if "@" in email else f"{email}@phient.com"

        node = IdentityNode(
            email=user_data.get("email", email),
            display_name=user_data.get("display_name", "Unknown"),
            job_title=user_data.get("job_title", "N/A"),
            department=user_data.get("department", "N/A"),
            office_location=user_data.get("office_location", "N/A"),
            account_enabled=user_data.get("account_enabled", True),
            groups=user_data.get("groups", []),
            licenses=user_data.get("licenses", []),
        )
        node.set_provenance("phione", "identity.lookup")
        return node

    async def list_groups(self, email: str) -> Traversal:
        """Traverse identity→group edges for a user."""
        groups = self._resolve_key("groups")
        traversal = Traversal(origin=email, filters={"edge_type": "member_of"})
        for g in (groups if isinstance(groups, list) else []):
            traversal.visit(GroupNode(
                group_name=g["name"],
                group_type=g.get("type", "security"),
            ))
        return traversal

    # ── Morphisms ────────────────────────────────────────────────────

    async def morph_provision(self, user_data: Dict[str, Any]) -> Morphism:
        """Provision a new identity — approval-gated morphism."""
        return self._approval_morphism("provision_identity", "employee_space", "identity_space", user_data)

    async def morph_disable(self, email: str) -> Morphism:
        """Disable an identity — approval-gated morphism."""
        return self._approval_morphism("disable_identity", "identity_space", "identity_space", {"email": email})

    async def morph_assign_license(self, email: str, license_name: str) -> Morphism:
        """Assign a license — approval-gated morphism."""
        return self._approval_morphism("assign_license", "identity_space", "license_space", {"email": email, "license": license_name})

    async def morph_add_to_group(self, email: str, group_name: str) -> Morphism:
        """Add identity to group — immediate morphism."""
        return self._completed_morphism("add_to_group", "identity_space", "group_space",
                                        {"email": email, "group_name": group_name})

    async def morph_remove_from_group(self, email: str, group_name: str) -> Morphism:
        """Remove identity from group — immediate morphism."""
        return self._completed_morphism("remove_from_group", "identity_space", "group_space",
                                        {"email": email, "group_name": group_name})

    # ── Shared morphism factories ────────────────────────────────────

    @staticmethod
    def _approval_morphism(mtype: str, src: str, tgt: str, params: Dict[str, Any]) -> Morphism:
        """Create a morphism that requires approval before execution."""
        return Morphism(morphism_type=mtype, source_space=src, target_space=tgt,
                        parameters=params, status="needs_approval")

    @staticmethod
    def _completed_morphism(mtype: str, src: str, tgt: str, params: Dict[str, Any]) -> Morphism:
        """Create and immediately complete a morphism."""
        m = Morphism(morphism_type=mtype, source_space=src, target_space=tgt, parameters=params)
        m.complete(params)
        return m

    # ── Data resolution ──────────────────────────────────────────────

    def _resolve_key(self, key: str) -> Dict[str, Any]:
        data = self._resolve(self.IDENTITY_DATA)
        result = data.get(key, {})
        return result if isinstance(result, (dict, list)) else {}

    def _resolve(self, dataset: DataSet) -> Dict[str, Any]:
        if self._data_resolver:
            return self._data_resolver(dataset.source, default={})
        return {}
