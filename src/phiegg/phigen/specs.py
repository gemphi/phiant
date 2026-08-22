"""Typed Specs for PhiGen Agent."""

from enum import Enum


class PhigenSpec(str, Enum):
    PHIGEN_CODEGEN_SPEC = "PHIGEN_CODEGEN_SPEC"
    PHIGEN_PARITY_SPEC = "PHIGEN_PARITY_SPEC"
