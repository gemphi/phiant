"""PhiBot Verb enumeration — typed action verbs."""

from enum import Enum


class PhiBotVerb(str, Enum):
    """Verbs supported by the PhiBot Automation agent."""

    LIST_PLAYBOOKS = "list_playbooks"
    LIST = "list"
    RUN_PLAYBOOK = "run_playbook"
    EXECUTE_PLAYBOOK = "execute_playbook"
    EXECUTE = "execute"
    CHECK_STATUS = "check_status"
