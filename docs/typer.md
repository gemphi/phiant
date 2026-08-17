# Dependency Documentation: typer

## 1. Overview
- **Package**: `typer`
- **Version Constraint**: `>=0.15.0`
- **Category**: CLI Framework
- **Primary Modules**: `src/cli.py`

## 2. What It Does
`typer` builds CLI interfaces using Python type hints, wrapping Click.

## 3. Why It Was Chosen
1. **Command Line Suite**: Exposes CLI commands (`phiant cli`, `phiant serve`).
2. **Type-Driven Syntax**: Same developer experience as FastAPI.

## 4. Architectural Flow

```mermaid
graph LR
    A[Command Arguments] -->|Typer CLI Parser| B[CLI Handler Function]
```

## 5. Alternatives Comparison

| Feature | Typer | argparse | Click |
|---------|-------|----------|-------|
| Type Hint Syntax | Native | Manual Add Argument | Decorators |
| Selection Rationale | Modern type hint based CLI builder | Verbose | Higher boilerplate |

## 6. Code Usage Example

```python
import typer

app = typer.Typer()

@app.command()
def serve(port: int = 8000):
    print(f"Starting server on port {port}")
```
