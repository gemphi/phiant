# Dependency Documentation: aiosqlite

## 1. Overview
- **Package**: `aiosqlite`
- **Version Constraint**: `>=0.20.0`
- **Category**: Async SQLite Driver
- **Primary Modules**: `src/monitoring/audit.py`

## 2. What It Does
`aiosqlite` provides an async interface for SQLite database operations.

## 3. Why It Was Chosen
1. **Non-blocking Audit Logs**: Logs audit entries to SQLite asynchronously without blocking FastAPI event loop.
2. **Zero Maintenance DB**: Perfect for local and embedded compliance logging.

## 4. Architectural Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    A[Agent Action] -->|Async Event| B[aiosqlite Worker]
    B -->|Threaded Write| C[audit.db SQLite]
```

## 5. Alternatives Comparison

| Feature | aiosqlite | sqlite3 (Standard Lib) | asyncpg |
|---------|-----------|------------------------|---------|
| Async Event Loop | Non-blocking | Blocking | Non-blocking |
| Server Requirement | Embedded | Embedded | Needs PostgreSQL Server |
| Selection Rationale | Async embedded DB for audit logging | Blocks asyncio thread | Requires external database |

## 6. Code Usage Example

```python
import aiosqlite

async def log_event(db_path: str, event: dict):
    async with aiosqlite.connect(db_path) as db:
        await db.execute(
            "INSERT INTO audit_log (timestamp, action) VALUES (?, ?)",
            (event["timestamp"], event["action"])
        )
        await db.commit()
```
