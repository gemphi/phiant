"""Typed Verbs for Phisecf Agent."""

from enum import Enum


class PhisecfVerb(str, Enum):
    SCAN_VULNERABILITY = "scan_vulnerability"
    AUDIT_TRAIL = "audit_trail"
    STATUS = "status"
