# PhiBot Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiBot** (Automation Playbooks, DAG Execution, and Webhooks).

---

## 1. Defining and Executing Playbook DAGs

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Execute an automation playbook with sequential/parallel step resolution
playbook = {
    "playbook_id": "provision_new_hire",
    "steps": [
        {"id": "step_1", "action": "phione.lookup_employee", "params": {"email": "new.hire@phient.com"}},
        {"id": "step_2", "action": "phisec.verify_token", "depends_on": ["step_1"]},
        {"id": "step_3", "action": "phibus.pub", "params": {"topic": "user.provisioned"}, "depends_on": ["step_2"]},
    ]
}

execution = client.phibot.playbook.run(playbook)
print(f"Execution ID: {execution['execution_id']}")
print(f"Status: {execution['status']}, Duration: {execution['duration_ms']}ms")
```

---

## 2. Triggering Webhook Automation Workflows

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Dispatch a webhook event to external systems (Slack, GitHub, PagerDuty)
result = client.phibot.webhook.trigger(
    target_url="https://api.internal/webhook/deploy",
    payload={"commit": "9d8c4f2", "environment": "production"},
    signature_secret="secret_key_123"
)
print("Webhook Delivered:", result["delivered"])
```
