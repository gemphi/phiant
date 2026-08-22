"""PhiDoc Task enumeration."""

from enum import Enum


class PhiDocTask(str, Enum):
    SEARCH_OPERATIONS = "search_operations"
    PAGE_MANAGEMENT = "page_management"
    TOPOLOGY_EXPLORATION = "topology_exploration"
