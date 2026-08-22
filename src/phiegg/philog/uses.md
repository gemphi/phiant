# PhiLog Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiLog** (Structured Telemetry, Audit Trails, and Streaming).

---

## 1. Structured JSON Logging with SHA-1 Commitment

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Emit structured logs linked to active commit hashes
client.philog.info(
    "Morphism applied to POntology space",
    agent_id="phione",
    verb="lookup_employee",
    duration_ms=42.1,
    commit_sha1="9d8c4f2a1b7e3d"
)

client.philog.warn(
    "Decoherence detected in quantum subspace",
    agent_id="phical",
    threshold=0.15,
    observed=0.18
)
```

---

## 2. Querying Telemetry Tail Buffer

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Retrieve recent structured log records from ring buffer
recent_logs = client.philog.get_tail(n=10)
for log in recent_logs:
    print(f"[{log.timestamp}] [{log.level}] ({log.agent_id}): {log.message}")
```

---

## 3. Cryptographic Audit Log Verification

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Query immutable audit entries
audit_entries = client.philog.get_audit_trail(subject="jane@phient.com")
for entry in audit_entries:
    print(f"Audit #{entry.id}: Action '{entry.action}' by '{entry.actor}' at {entry.timestamp}")
```
