"""PhiBrd Verb enumeration."""

from enum import Enum


class PhiBrdVerb(str, Enum):
    ONBOARD_EMPLOYEE = "onboard_employee"
    ONBOARD = "onboard"
    GET_STATUS = "get_status"
    STATUS = "status"
    GET_CHECKLIST = "get_checklist"
    CHECKLIST = "checklist"
