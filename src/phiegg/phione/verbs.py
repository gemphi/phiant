"""PhiOne Verb enumeration — typed action verbs."""

from enum import Enum


class PhiOneVerb(str, Enum):
    """Verbs supported by the PhiOne HR & Identity agent."""

    LOOKUP_EMPLOYEE = "lookup_employee"
    LOOKUP_IDENTITY = "lookup_identity"
    LOOKUP_USER = "lookup_user"
    TRAVERSE_TEAM = "traverse_team"
    TEAM_REPORT = "team_report"
    GET_HEADCOUNT = "get_headcount"
    HEADCOUNT_REPORT = "headcount_report"
    HEADCOUNT = "headcount"
    TRAVERSE_ORG = "traverse_org"
    ORG_STRUCTURE = "org_structure"
    ORG_TREE = "org_tree"
    PROVISION_IDENTITY = "provision_identity"
    CREATE_USER = "create_user"
    DISABLE_IDENTITY = "disable_identity"
    DISABLE_USER = "disable_user"
    ADD_TO_GROUP = "add_to_group"
    ADD_GROUP_MEMBER = "add_group_member"
    REMOVE_FROM_GROUP = "remove_from_group"
    REMOVE_GROUP_MEMBER = "remove_group_member"
    ASSIGN_LICENSE = "assign_license"
    GET_LEAVE_BALANCE = "get_leave_balance"
    LEAVE_BALANCE = "leave_balance"
