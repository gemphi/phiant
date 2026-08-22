"""PhiGen Agent Tasks."""

from __future__ import annotations

from typing import Any, Dict, List


class PhiGenTasks:
    """Task orchestrator for code generation and parity audits."""

    def __init__(self, agent) -> None:
        self._agent = agent

    async def run_codegen(self) -> Dict[str, Any]:
        return await self._agent.execute_verb("generate_types", {})

    async def run_parity_audit(self) -> Dict[str, Any]:
        return await self._agent.execute_verb("audit_parity", {})
