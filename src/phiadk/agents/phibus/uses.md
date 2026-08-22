# PhiBus Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiBus** (Event Bus with `PBusEvent` and pure `pub`/`sub` semantics).

---

## 1. Subscribing to Event Topics

```python
from phiadk import PhiADKClient
from phiadk.agents.phibus import PBusEvent

client = PhiADKClient()

# Subscribe callback to a specific topic
def handle_user_event(event: PBusEvent):
    print(f"[{event.topic}] Event ID: {event.event_id}")
    print(f"From Agent: {event.source_agent} | Payload: {event.payload}")

unsubscribe = client.phibus.sub("user.created", handle_user_event)

# Later, unsubscribe when done:
# unsubscribe()
```

---

## 2. Publishing `PBusEvent` Messages

```python
from phiadk import PhiADKClient
from phiadk.agents.phibus import PBusEvent

client = PhiADKClient()

# Construct and publish an event
event = PBusEvent(
    topic="user.created",
    payload={"email": "alice@phient.com", "role": "Staff Engineer"},
    source_agent="phione",
    commit_sha1="9d8c4f2a1b7e"
)

published = client.phibus.pub("user.created", event)
print(f"Published event {published.event_id} at {published.timestamp}")
```

---

## 3. Wildcard Subscriptions (`*`) & Event History

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# 1. Subscribe to all system events
client.phibus.sub("*", lambda evt: print(f"GLOBAL AUDIT: {evt.topic}"))

# 2. List all registered/active event topics
topics = client.phibus.list_topics()
print("Active Topics:", topics)

# 3. Retrieve event history buffer
recent_events = client.phibus.get_history(topic="user.created", limit=10)
for evt in recent_events:
    print(f"- {evt.timestamp}: {evt.payload}")
```
