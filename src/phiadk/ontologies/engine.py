"""Ontology Engine — Central Ontology Space & Schema Manager."""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from .action import ActionParameter, ActionType
from .link import LinkType
from .object import ObjectType, PropertyType


class OntologyEngine:
    """The central Ontology Registry and Engine for Phient."""

    def __init__(self, name: str = "phient_core_ontology", version: str = "1.0.0") -> None:
        self.name = name
        self.version = version
        self.object_types: Dict[str, ObjectType] = {}
        self.link_types: Dict[str, LinkType] = {}
        self.action_types: Dict[str, ActionType] = {}
        self._initialize_default_ontology()

    def _initialize_default_ontology(self) -> None:
        """Register standard enterprise ontology entities."""
        # 1. Employee Object Type
        emp = (
            ObjectType("Employee", "Employee", "HR personnel record in Enterprise HRIS space.")
            .add_property(PropertyType("email", "Email Address", "string", is_primary_key=True))
            .add_property(PropertyType("display_name", "Full Name", "string"))
            .add_property(PropertyType("department", "Department", "string"))
            .add_property(PropertyType("title", "Job Title", "string"))
            .add_property(PropertyType("country", "Country Hub", "string"))
            .add_property(PropertyType("status", "Employment Status", "string"))
        )
        self.register_object_type(emp)

        # 2. UserIdentity Object Type
        ident = (
            ObjectType("UserIdentity", "User Identity", "Microsoft Entra ID cloud account.")
            .add_property(PropertyType("email", "User Principal Name", "string", is_primary_key=True))
            .add_property(PropertyType("account_enabled", "Account Active", "boolean"))
            .add_property(PropertyType("groups", "Security Groups", "string"))
        )
        self.register_object_type(ident)

        # 3. DocumentPage Object Type
        doc = (
            ObjectType("DocumentPage", "Document Page", "Notion & Knowledge Base documentation node.")
            .add_property(PropertyType("page_id", "Page ID", "string", is_primary_key=True))
            .add_property(PropertyType("title", "Page Title", "string"))
            .add_property(PropertyType("embedding", "Vector Embedding", "vector"))
        )
        self.register_object_type(doc)

        # 4. GitCommit Object Type
        commit = (
            ObjectType("GitCommit", "Git Commit", "Cryptographic content-addressed state snapshot.")
            .add_property(PropertyType("sha1", "Commit SHA-1", "string", is_primary_key=True))
            .add_property(PropertyType("message", "Commit Message", "string"))
            .add_property(PropertyType("author", "Author", "string"))
        )
        self.register_object_type(commit)

        # Links
        self.register_link_type(
            LinkType("employee_identity", "Employee has Identity", "Employee", "UserIdentity", "ONE_TO_ONE")
        )
        self.register_link_type(
            LinkType("employee_documents", "Employee authored Documents", "Employee", "DocumentPage", "ONE_TO_MANY")
        )

        # Actions
        act_promote = (
            ActionType("promote_employee", "Promote Employee", "Promote employee level and adjust compensation", target_object_type="Employee")
            .add_parameter(ActionParameter("employee_id", "Employee ID", "string"))
            .add_parameter(ActionParameter("new_title", "New Job Title", "string"))
        )
        self.register_action_type(act_promote)

        act_provision = (
            ActionType("provision_identity", "Provision Entra ID", "Provision Microsoft 365 cloud identity", target_object_type="UserIdentity")
            .add_parameter(ActionParameter("email", "User Email", "string"))
            .add_parameter(ActionParameter("groups", "Security Groups", "string"))
        )
        self.register_action_type(act_provision)

        act_onboard = (
            ActionType("onboard_employee", "Onboard Employee", "Orchestrate employee onboarding workflow", target_object_type="Employee")
            .add_parameter(ActionParameter("email", "Employee Email", "string"))
            .add_parameter(ActionParameter("name", "Full Name", "string"))
        )
        self.register_action_type(act_onboard)


    def register_object_type(self, object_type: ObjectType) -> None:
        self.object_types[object_type.api_name] = object_type

    def register_link_type(self, link_type: LinkType) -> None:
        self.link_types[link_type.api_name] = link_type

    def register_action_type(self, action_type: ActionType) -> None:
        self.action_types[action_type.api_name] = action_type

    def get_object_type(self, api_name: str) -> Optional[ObjectType]:
        return self.object_types.get(api_name)

    def to_mermaid(self) -> str:
        """Generate Mermaid relationship diagram."""
        lines = ["graph TD"]
        for ot in self.object_types.values():
            lines.append(f'  {ot.api_name}["{ot.display_name} ({len(ot.properties)} props)"]')
        for lt in self.link_types.values():
            lines.append(f'  {lt.source_object_type} -->|{lt.display_name}| {lt.target_object_type}')
        for act in self.action_types.values():
            if act.target_object_type:
                lines.append(f'  Action_{act.api_name}(["Action: {act.display_name}"]) -.->|mutates| {act.target_object_type}')
        return "\n".join(lines)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "version": self.version,
            "object_types": {k: v.to_dict() for k, v in self.object_types.items()},
            "link_types": {k: v.to_dict() for k, v in self.link_types.items()},
            "action_types": {k: v.to_dict() for k, v in self.action_types.items()},
            "mermaid": self.to_mermaid(),
        }


# Global default Ontology instance
GLOBAL_ONTOLOGY = OntologyEngine()

# Standard P* and Backward aliases
POntologyEngine = OntologyEngine
PToposEngine = OntologyEngine
ToposEngine = OntologyEngine
GLOBAL_TOPOS = GLOBAL_ONTOLOGY
