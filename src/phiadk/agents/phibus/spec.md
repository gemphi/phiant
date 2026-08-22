# PhiBus Formal Specification (`spec.md`)

- **Agent ID**: `phibus`
- **Agent Name**: `PhiBus`
- **Domain**: `event_bus`
- **Layer**: `AgentLayer.INFRASTRUCTURE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiBusVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `PUB` | `"pub"` | `{"topic": str, "payload": dict, "source_agent": str}` | `{"status": "PUBLISHED", "event": PBusEvent}` | Broadcast `PBusEvent` to subscribers. |
| `SUB` | `"sub"` | `{"topic": str}` | `{"status": "SUBSCRIBED", "topic": str}` | Register subscriber for topic. |
| `LIST_TOPICS` | `"list_topics"` | `{}` | `{"topics": List[str]}` | List active event topics. |
| `GET_HISTORY` | `"get_history"` | `{"topic": Optional[str], "limit": int}` | `{"events": List[PBusEvent]}` | Retrieve event history buffer. |

---

## 2. Supported Tasks (`PhiBusTask`)

- `EVENT_BROADCAST` (`"event_broadcast"`)
- `TOPIC_SUBSCRIPTION` (`"topic_subscription"`)
- `EVENT_REPLAY` (`"event_replay"`)

---

## 3. Specifications (`PhiBusSpec`)

- `EVENT_BUS_PUBSUB_V1` (`"EVENT_BUS_PUBSUB_V1"`)
