# Dependency Documentation: uvicorn

## 1. Overview
- **Package**: `uvicorn`
- **Version Constraint**: `>=0.32.0`
- **Category**: ASGI Web Server
- **Primary Modules**: `src/cli.py`, `src/api/main.py`

## 2. What It Does
`uvicorn` is an ASGI web server implementation powering FastAPI applications. It manages socket bindings, worker processes, TLS termination, and asynchronous HTTP request handling.

## 3. Why It Was Chosen
1. **Production Standard**: Official ASGI server recommended for FastAPI applications.
2. **High Throughput**: Built on `uvloop` and `httptools` for high-throughput HTTP handling.
3. **CLI Server Command**: Enables launching the backend via `python -m src.cli serve --port 8000`.

## 4. Architectural Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    Client[Web Browser / CLI] -->|HTTP / WS| Uvicorn[Uvicorn ASGI Server]
    Uvicorn -->|ASGI Event Loop| FastAPI[FastAPI App Gateway]
```

## 5. Alternatives Comparison

| Feature / Metric | Uvicorn | Gunicorn | Hypercorn |
|------------------|---------|----------|-----------|
| ASGI Standard | Full Compliance | WSGI Primary (Needs Uvicorn worker) | Full Compliance |
| Performance | Top Tier (uvloop) | Medium | Medium |
| Selection Rationale | Ideal standalone ASGI server for async microservices | Better for multi-process WSGI | Lacks uvloop speed |

## 6. Code Usage Example

```python
import uvicorn

if __name__ == "__main__":
    uvicorn.run("src.api.main:app", host="0.0.0.0", port=8000, reload=True)
```
