"""PhiBot Task enumeration."""

from enum import Enum


class PhiBotTask(str, Enum):
    PLAYBOOK_DISCOVERY = "playbook_discovery"
    PLAYBOOK_EXECUTION = "playbook_execution"
