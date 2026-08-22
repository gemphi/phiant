"""Security models for PhiSec domain agent."""

from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class PVulnerability:
    """Security vulnerability or CVE finding."""

    cve_id: str
    severity: str  # "LOW", "MEDIUM", "HIGH", "CRITICAL"
    component: str
    description: str
    remediation: str = "Upgrade dependency to latest version."

    def to_dict(self) -> Dict[str, Any]:
        return {
            "cve_id": self.cve_id,
            "severity": self.severity,
            "component": self.component,
            "description": self.description,
            "remediation": self.remediation,
        }


@dataclass
class PSecurityScan:
    """Security audit & vulnerability scan result."""

    scan_id: str = field(default_factory=lambda: f"scan_{uuid.uuid4().hex[:8]}")
    target: str = "workspace"
    vulnerabilities: List[PVulnerability] = field(default_factory=list)
    risk_score: float = 0.0
    passed: bool = True
    scanned_at: float = field(default_factory=time.time)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "scan_id": self.scan_id,
            "target": self.target,
            "vulnerabilities": [v.to_dict() for v in self.vulnerabilities],
            "risk_score": self.risk_score,
            "passed": self.passed,
            "scanned_at": self.scanned_at,
        }


@dataclass
class PTokenVerification:
    """Token authentication and verification receipt."""

    token_valid: bool
    subject: str
    roles: List[str] = field(default_factory=lambda: ["user"])
    expires_in: int = 3600

    def to_dict(self) -> Dict[str, Any]:
        return {
            "token_valid": self.token_valid,
            "subject": self.subject,
            "roles": self.roles,
            "expires_in": self.expires_in,
        }
