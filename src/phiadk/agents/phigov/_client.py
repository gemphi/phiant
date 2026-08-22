"""Typed client interface for PhiGov domain agent."""

from __future__ import annotations

from typing import Any, Dict, List, Optional
from phiadk.agents.phigov.governance import ComplianceClient
from phiadk.agents.phigov.models import PComplianceReport, PLineageAudit


class PhiGovClient:
    """Synchronous client interface for PhiGov Governance Agent."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        compliance_client: Optional[ComplianceClient] = None,
    ) -> None:
        self._compliance = compliance_client or ComplianceClient()

    def check_compliance(self, regulation: str = "GDPR") -> PComplianceReport:
        return self._compliance.check_compliance(regulation)

    def audit_lineage(self, asset_id: str) -> PLineageAudit:
        return self._compliance.audit_lineage(asset_id)

    def get_compliance_score(self) -> Dict[str, Any]:
        return self._compliance.get_compliance_score()


class AsyncPhiGovClient:
    """Async variant of PhiGovClient."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        compliance_client: Optional[ComplianceClient] = None,
    ) -> None:
        self._compliance = compliance_client or ComplianceClient()

    async def check_compliance(self, regulation: str = "GDPR") -> PComplianceReport:
        return self._compliance.check_compliance(regulation)

    async def audit_lineage(self, asset_id: str) -> PLineageAudit:
        return self._compliance.audit_lineage(asset_id)

    async def get_compliance_score(self) -> Dict[str, Any]:
        return self._compliance.get_compliance_score()
