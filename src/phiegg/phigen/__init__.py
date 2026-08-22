"""PhiGen Package — Code Generation and Parity Verification Agent."""

from ._client import PhiGenClient
from .agent import PhiGenAgent
from .card import CARD
from .codegen import CodeGenerator
from .models import GeneratedClass, ParityReport
from .parity import ParityAuditor

__all__ = [
    "PhiGenClient",
    "PhiGenAgent",
    "CARD",
    "CodeGenerator",
    "ParityAuditor",
    "GeneratedClass",
    "ParityReport",
]
