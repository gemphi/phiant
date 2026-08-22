# Event Streams & PhiBus Pub/Sub (`Streams/PubSubEventStreams.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/streams` (`Stream.md`, `Subscriber.md`).
- **Phient Subsystem**: [`src/phiadk/phibus/`](./phient/src/phiadk/phibus/).

---

## 1. Pure Pub/Sub Streams with PBusEvent

`PhiBus` provides high-throughput asynchronous event streaming with topic filtering and wildcard subscriptions.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    Producer["Event Publisher (pub)"] --> Bus["PhiBus Topic Router"]
    Bus --> Sub1["Subscriber: Security Agent"]
    Bus --> Sub2["Subscriber: Telemetry Logger"]
    Bus --> Sub3["Subscriber: Realtime UI Webhook"]
```

---

## 2. Python SDK Usage

```python
from phiadk import PhiADKClient
from phiadk.phibus import PBusEvent

client = PhiADKClient()

# Subscribe
client.phibus.sub("topos.mutation", lambda evt: print(f"Mutation: {evt.payload}"))

# Publish
client.phibus.pub("topos.mutation", PBusEvent(
    topic="topos.mutation",
    payload={"object_type": "Employee", "action": "update_title"},
    source_agent="phione"
))
```
