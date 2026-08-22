"""Typed client interface for PhiSec domain agent."""

from __future__ import annotations

from typing import Any, Dict, List, Optional
from phiadk.agents.phisec.models import PSecurityScan, PTokenVerification
from phiadk.agents.phisec.security import SecurityScannerClient


class PhiSecClient:
    """Synchronous client interface for PhiSec Security Agent."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        scanner: Optional[SecurityScannerClient] = None,
    ) -> None:
        self._scanner = scanner or SecurityScannerClient()

    def scan_target(self, target: str = "workspace") -> PSecurityScan:
        return self._scanner.scan_target(target)

    def verify_token(self, token: str) -> PTokenVerification:
        return self._scanner.verify_token(token)

    def enforce_policy(self, resource: str, action: str, subject: str) -> Dict[str, Any]:
        return self._scanner.enforce_policy(resource, action, subject)


class AsyncPhiSecClient:
    """Async variant of PhiSecClient."""

    def __init__(
        self,
        auth: Any = None,
        hostname: Optional[str] = None,
        config: Any = None,
        scanner: Optional[SecurityScannerClient] = None,
    ) -> None:
        self._scanner = scanner or SecurityScannerClient()

    async def scan_target(self, target: str = "workspace") -> PSecurityScan:
        return self._scanner.scan_target(target)

    async def verify_token(self, token: str) -> PTokenVerification:
        return self._scanner.verify_token(token)

    async def enforce_policy(self, resource: str, action: str, subject: str) -> Dict[str, Any]:
        return self._scanner.enforce_policy(resource, action, subject)
