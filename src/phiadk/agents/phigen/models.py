"""PhiGen Data Models."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class GeneratedClass:
    """A generated typed Python class representation."""

    class_name: str
    object_type: str
    primary_key: str
    properties: Dict[str, str] = field(default_factory=dict)
    code_str: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "class_name": self.class_name,
            "object_type": self.object_type,
            "primary_key": self.primary_key,
            "properties": self.properties,
            "code_str": self.code_str,
        }


@dataclass
class ParityReport:
    """Comprehensive parity audit report."""

    total_palantir_modules: int
    matching_phient_modules: int
    parity_percentage: float
    total_domain_agents: int
    agents_healthy: int
    missing_docs: List[str] = field(default_factory=list)
    missing_sdk_files: List[str] = field(default_factory=list)
    status: str = "HEALTHY"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "total_palantir_modules": self.total_palantir_modules,
            "matching_phient_modules": self.matching_phient_modules,
            "parity_percentage": self.parity_percentage,
            "total_domain_agents": self.total_domain_agents,
            "agents_healthy": self.agents_healthy,
            "missing_docs": self.missing_docs,
            "missing_sdk_files": self.missing_sdk_files,
            "status": self.status,
        }
