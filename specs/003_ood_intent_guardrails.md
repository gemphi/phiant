# SPEC-003: Out-of-Distribution (OOD) Intent Scoring & Deterministic Safe Fallbacks

## 1. Context & Motivation (DL Book Section 14.2)
When user prompts or environment states diverge significantly from known task distributions, hallucinated actions can cause catastrophic operational failure.

## 2. Technical Specification
- **Embedding Distance Check**: Computes cosine distance against baseline safe intent clusters.
- **Ambiguity Interception**: If confidence is below $0.75$, the agent pauses and triggers an interactive clarification modal rather than making unsafe assumptions.
- **Fail-Safe Rollback**: Transactions maintain rollback snapshots for atomic reversal.
