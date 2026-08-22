# PhiBrd: Onboarding Lifecycle & Fiber Bundle Orchestrator

`PhiBrd` coordinates complex multi-domain lifecycles. It constructs atomic **Ontologylogical Fiber Bundles** spanning HR verification, identity provisioning, group assignment, license allocation, and IT welcome automation.

---

## 1. Architectural & Fiber Bundle Flow

```mermaid
graph TD
    Request["Onboarding Request: Alice Smith (Engineering Lead)"] --> BaseSpace["Base Space: Onboarding Request"]

    subgraph FiberBundle["Atomic Fiber Bundle ($E \xrightarrow{\pi} B$)"]
        F1["1. Verify HR Record (PhiOne)"]
        F2["2. Create Entra Identity (PhiOne)"]
        F3["3. Assign Security Groups (PhiOne)"]
        F4["4. Assign M365 E5 License (PhiOne)"]
        F5["5. Create Notion Handbook (PhiDoc)"]
        F6["6. Send IT Welcome Webhook (PhiBot)"]
    end

    BaseSpace --> F1
    F1 --> F2 --> F3 --> F4 --> F5 --> F6
    F6 --> Complete["Status: COMPLETED (All Fibers Resolved)"]
```

### Flow Diagram
```
[ New Hire Profile ]
          │
          ▼
[ PhiBrdAgent.envision() ] ──► (Validate profile fields: email, department, title, start_date)
          │
          ▼
[ PhiBrdAgent.apply() ]
          ├─► Delegate step 1-4 to PhiOne (HR & Identity)
          ├─► Delegate step 5 to PhiDoc (Handbook generation)
          └─► Delegate step 6 to PhiBot (Welcome automation)
          │
          ▼
[ PhiBrdAgent.eval() ] ──► (Verify 100% fiber bundle completion rate)
          │
          ▼
[ PhiBrdAgent.iterate() ] ──► (Emit combined onboarding receipt)
```

---

## 2. Key Components

- **`agent.py`**: `PhiBrdAgent` lifecycle implementation.
- **`onboarding.py`**: `OnboardingClient` fiber bundle pipeline.
- **`verbs.py`**: `PhiBrdVerb` typed enum constants.
- **`spec.md`**: Formal specification contract.
