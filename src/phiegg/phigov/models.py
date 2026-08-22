"""Governance models for PhiGov domain agent."""

from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class PPolicyRule:
    """Enterprise governance rule or regulation requirement."""

    rule_id: str
    regulation: str  # "GDPR", "SOC2", "ISO27001", "HIPAA"
    description: str
    mandatory: bool = True

    def to_dict(self) -> Dict[str, Any]:
        return {
            "rule_id": self.rule_id,
            "regulation": self.regulation,
            "description": self.description,
            "mandatory": self.mandatory,
        }


@dataclass
class PComplianceReport:
    """Compliance assessment report across topological objects and datasets."""

    report_id: str = field(default_factory=lambda: f"gov_{uuid.uuid4().hex[:8]}")
    score: float = 1.0  # 0.0 to 1.0
    passed: bool = True
    regulations: List[str] = field(default_factory=lambda: ["GDPR", "SOC2"])
    findings: List[str] = field(default_factory=list)
    evaluated_at: float = field(default_factory=time.time)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "report_id": self.report_id,
            "score": self.score,
            "passed": self.passed,
            "regulations": self.regulations,
            "findings": self.findings,
            "evaluated_at": self.evaluated_at,
        }


@dataclass
class PLineageAudit:
    """Data and model provenance lineage trace."""

    asset_id: str
    source_origin: str
    commit_sha1: str
    transform_chain: List[str] = field(default_factory=list)
    audited_at: float = field(default_factory=time.time)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "asset_id": self.asset_id,
            "source_origin": self.source_origin,
            "commit_sha1": self.commit_sha1,
            "transform_chain": self.transform_chain,
            "audited_at": self.audited_at,
        }
