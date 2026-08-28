---
title: PhiADK Developer SDK Guide
description: Building, testing, and deploying custom specialist agents using the Python PhiADK framework.
---

# PhiADK Developer SDK Guide

The **PhiADK (Phient Agent Development Kit)** is the standard Python SDK for authoring specialist agents, defining verb interfaces, registering MCP tools, and participating in swarm orchestration.

---

## 1. Creating a Specialist Agent

Subclass `PhiAgent` and define the operational verbs supported by your agent:

```python
from phiadk.core import PhiAgent, agent_verb
from pydantic import BaseModel, Field
from typing import Dict, Any

class AnalyzeCodeArgs(BaseModel):
    repository_path: str = Field(..., description="Absolute path to target repo")
    strict_mode: bool = Field(default=True, description="Enforce strict linting")

class CodeReviewAgent(PhiAgent):
    agent_id: str = "custom_code_reviewer"
    domain: str = "quality_assurance"
    description: str = "Analyzes source code for architectural anti-patterns and vulnerabilities."

    @agent_verb(name="analyze_repository", risk_level="low")
    async def analyze_repository(self, args: AnalyzeCodeArgs) -> Dict[str, Any]:
        """Scans the repository and returns quality metrics."""
        self.logger.info(f"Scanning repository: {args.repository_path}")
        
        # 1. Access agent-specific memory
        cached_report = await self.memory.get(f"scan:{args.repository_path}")
        if cached_report:
            return cached_report

        # 2. Execute inspection logic
        issues = await self._run_analysis(args.repository_path, args.strict_mode)
        
        report = {
            "repository": args.repository_path,
            "issues_found": len(issues),
            "details": issues
        }
        
        # 3. Cache results
        await self.memory.set(f"scan:{args.repository_path}", report, ttl=3600)
        return report

    async def _run_analysis(self, path: str, strict: bool):
        # Implementation details
        return []
```

---

## 2. Registering with the Runtime

Agents are registered into the `AgentRegistry` during runtime initialization:

```python
from phient.runtime import AgentRuntime
from phient.agents.custom_reviewer import CodeReviewAgent

runtime = AgentRuntime()
reviewer = CodeReviewAgent()

# Register agent
runtime.register_agent(reviewer)

# Run test execution
async def main():
    result = await runtime.dispatch(
        target_agent="custom_code_reviewer",
        verb="analyze_repository",
        payload={"repository_path": "/var/repos/core"}
    )
    print("Execution output:", result)
```

---

## 3. Unit Testing Agents

PhiADK provides testing fixtures for mocking memory, LLM completions, and MCP tools:

```python
import pytest
from phiadk.testing import MockAgentEnvironment
from phient.agents.custom_reviewer import CodeReviewAgent

@pytest.mark.asyncio
async def test_code_reviewer():
    async with MockAgentEnvironment() as env:
        agent = CodeReviewAgent()
        env.attach(agent)
        
        res = await agent.analyze_repository(
            AnalyzeCodeArgs(repository_path="/tmp/sample", strict_mode=False)
        )
        assert "issues_found" in res
```
