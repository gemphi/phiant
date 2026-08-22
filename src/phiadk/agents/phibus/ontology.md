# PhiBus: Event Bus & Pub/Sub Simplicial Complex

`PhiBus` coordinates asynchronous message dispatch, event routing, and subscriber notifications across the entire topological system.

## 1. Simplicial Complex & Event Routing

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
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
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'actorBkg': 'transparent', 'actorBorder': '#3b82f6', 'actorTextColor': '#ffffff', 'signalColor': '#60a5fa', 'signalTextColor': '#ffffff', 'labelBoxBkgColor': 'transparent', 'labelBoxBorderColor': '#475569'}}}%%
sequenceDiagram
    autonumber
    actor Emitter as Emitter Agent (e.g. PhiOne)
    participant Bus as PhiBus (PBusClient)
    participant Sub as Subscriber (e.g. PhiLog / PhiSec)

    Sub->>Bus: sub("identity.*", handler)
    Emitter->>Bus: pub("identity.created", PBusEvent)
    Bus->>Sub: handler(PBusEvent)
```
