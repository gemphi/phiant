# PhiBrd Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiBrd** (Cross-Domain Onboarding and Fiber Bundle Orchestration).

---

## 1. Initiating an Employee Onboarding Fiber Bundle

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Start an end-to-end employee onboarding workflow
onboarding_bundle = client.phibrd.start_onboarding(
    employee_email="alex.kim@phient.com",
    department="Engineering",
    role="Quantum Systems Architect"
)

print(f"Bundle ID: {onboarding_bundle['bundle_id']}")
print(f"Status: {onboarding_bundle['status']}")
```

---

## 2. Tracking Onboarding Checklist Completion

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Check checklist status across all 14 domain agents
checklist = client.phibrd.get_checklist("alex.kim@phient.com")
for item in checklist["items"]:
    status_icon = "✅" if item["completed"] else "⏳"
    print(f"{status_icon} [{item['agent']}] {item['task_name']}: {item['state']}")
```

---

## 3. Advancing Lifecycle Phases

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Advance an onboarding step to complete
update = client.phibrd.complete_step(
    employee_email="alex.kim@phient.com",
    step_id="laptop_provisioning",
    notes="MacBook M3 Max assigned & encrypted"
)
print("Updated Progress:", update["progress_percent"], "%")
```
