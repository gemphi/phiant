"""PhiGen Client."""

from __future__ import annotations

from typing import Any, Dict, Optional
from phiadk.agents.phigen.agent import PhiGenAgent
from phiadk.agents.phigen.codegen import CodeGenerator
from phiadk.agents.phigen.models import ParityReport
from phiadk.agents.phigen.parity import ParityAuditor


class PhiGenClient:
    """Subclient for interacting with the PhiGen code generation agent."""

    def __init__(self, auth=None, hostname: str = "", config=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._agent = PhiGenAgent()
        self._generator = CodeGenerator()
        self._auditor = ParityAuditor()

    def generate_types(self) -> Dict[str, Any]:
        """Generate strongly-typed Python dataclasses for all POntology ObjectTypes."""
        classes = self._generator.generate_all_types()
        return {
            "count": len(classes),
            "classes": [c.to_dict() for c in classes.values()],
            "code": self._generator.render_module_code(),
        }

    def audit_parity(self) -> ParityReport:
        """Run full parity check across Palantir reference and Phient."""
        return self._auditor.audit()


AsyncPhiGenClient = PhiGenClient

