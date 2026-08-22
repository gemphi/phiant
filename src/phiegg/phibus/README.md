# PhiBus: Ontologylogical Pub/Sub Event Bus Agent

`PhiBus` is the central event backbone. It connects all 14 domain agents, telemetry pipelines, and POntology state mutations via **`PBusEvent`** messages and pure **`pub()`** and **`sub()`** methods.

---

## 1. Architectural & Event Flow

```mermaid
graph LR
    subgraph Publisher["Publishers"]
        P1["PhiOne (Identity Event)"]
        P2["POntology Engine (Action Event)"]
    end

    subgraph Bus["PhiBus (PBusClient)"]
        Router["Topic Router (pub / sub)"]
        Buffer["Event Ring Buffer (1000 items)"]
    end

    subgraph Subscriber["Subscribers"]
        S1["PhiSec (Threat Scanner)"]
        S2["PhiGov (Compliance Auditor)"]
        S3["PhiLog (Telemetry Logger)"]
    end

    P1 & P2 -->|pub(topic, PBusEvent)| Router
    Router --> Buffer
    Router -->|sub(topic, handler)| S1 & S2 & S3
```

### Flow Diagram
```
[ Agent Action / State Mutation ]
                │
                ▼
[ PBusEvent Construction ] ──► (topic="employee.onboarded", payload={...}, source_agent="phibrd")
                │
                ▼
[ client.phibus.pub(topic, event) ]
                ├─► Broadcast to all active topic subscribers synchronously
                ├─► Append event to ring buffer history
                └─► Emit delivery receipt
```

---

## 2. Python SDK Usage

```python
from phiegg import PhiEggClient
from phiegg.phibus import PBusEvent

client = PhiEggClient()

# 1. Subscribe to a topic
def on_user_created(evt: PBusEvent):
    print(f"Received event {evt.event_id} on topic {evt.topic} with payload: {evt.payload}")

unsub = client.phibus.sub("user.created", on_user_created)

# 2. Publish a PBusEvent
evt = PBusEvent(
    topic="user.created",
    payload={"email": "alice@phient.com", "role": "Staff Engineer"},
    source_agent="phione"
)
client.phibus.pub("user.created", evt)
```
