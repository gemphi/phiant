# PhiCLI Toolchain Guide (v1)

The `phi` command line interface provides complete command-line control over domain agents, topological cards, specification generation, quantum simulations, and telemetry.

---

## 1. Quick Command Summary

```bash
# 1. List all 11 active domain agents
phi agents list

# 2. Inspect topological architecture and Mermaid simplicial complex
phi topo inspect phione
phi topo inspect phical

# 3. Scaffold a new production domain agent
phi generate-agent phisec --domain security --layer infrastructure --verbs audit,scan

# 4. Auto-generate schema.json specifications
phi generate-spec

# 5. Compile all MDX topology documentation
phi generate-docs

# 6. Set version across all agents and schemas
phi version set 1.1.0

# 7. Run Quantum Model Language circuit
phi qml run --circuit bell_state
```

---

## 2. Shell Configuration

To enable `phi` globally in your terminal:
```bash
pip install -e .
phi --help
```
