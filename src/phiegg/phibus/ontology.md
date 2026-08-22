# PhiBus: Event Bus & Pub/Sub Simplicial Complex

`PhiBus` coordinates asynchronous message dispatch, event routing, and subscriber notifications across the entire topological system.

## 1. Simplicial Complex & Event Routing

```mermaid
graph TD
    subgraph Emitters["Event Emitters (PBusEvent)"]
        PhiOne["PhiOne (Identity created)"]
        PhiGit["PhiGit (Commit staged)"]
        POntologyAction["POntology (Action applied)"]
    end

    subgraph PhiBusCore["PhiBus Event Space"]
        Bus["PBusClient.pub(topic, PBusEvent)"]
        Topics["Topic Index (identity.*, git.*, topos.*)"]
    end

    subgraph Subscribers["Event Consumers"]
        PhiSec["PhiSec (Scan user token)"]
        PhiLog["PhiLog (Append telemetry)"]
        PhiGov["PhiGov (Audit compliance)"]
    end

    Emitters --> Bus
    Bus --> Topics
    Topics --> Subscribers
```

## 2. PBusEvent Sequence Flow

```mermaid
sequenceDiagram
    autonumber
    actor Emitter as Emitter Agent (e.g. PhiOne)
    participant Bus as PhiBus (PBusClient)
    participant Sub as Subscriber (e.g. PhiLog / PhiSec)

    Sub->>Bus: sub("identity.*", handler)
    Emitter->>Bus: pub("identity.created", PBusEvent)
    Bus->>Sub: handler(PBusEvent)
```
