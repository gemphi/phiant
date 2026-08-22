# PhiOne Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for interacting with the **PhiOne** HR & Identity domain agent.

---

## 1. Direct Domain Client Usage

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# 1. Look up an employee by email
emp = client.phione.employee.get_employee_by_email("jane@phient.com")
print(f"Employee Name: {emp['display_name']}")
print(f"Department: {emp['department']}, Title: {emp['title']}")

# 2. Check remaining leave balance
leave = client.phione.leave.get_leave_balance("jane@phient.com")
print(f"Vacation Days Remaining: {leave['vacation_days']}")
print(f"Sick Leave Remaining: {leave['sick_days']}")

# 3. Microsoft Entra SSO User Identity Lookup
identity = client.phione.identity.get_user("jane@phient.com")
print(f"SSO Groups: {identity['groups']}")
print(f"Account Enabled: {identity['account_enabled']}")
```

---

## 2. Universal Agent Recursive Lifecycle Invocation

```python
import asyncio
from phiadk import PhiADKClient
from phiadk._core import AgentContext
from phiadk.agents.phione.verbs import PhiOneVerb

client = PhiADKClient()
agent = client.agents["phione"]

async def main():
    # Construct an execution context
    ctx = AgentContext(
        verb=PhiOneVerb.LOOKUP_EMPLOYEE.value,
        parameters={"email": "jane@phient.com"}
    )
    
    # Execute through the 4-phase recursive cycle (envision -> apply -> eval -> iterate)
    result_ctx = await agent.run(ctx)
    print("Agent Output:", result_ctx.results["output"])
    print("Confidence Score:", result_ctx.confidence)

asyncio.run(main())
```

---

## 3. POntology 0-Simplex Integration (Object Graph)

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Query the Employee 0-simplex in the topological space
employee_obj = client.topos.object("Employee", "jane@phient.com")
print("POntology Properties:", employee_obj.properties)

# Traverse 1-simplex relation to Identity
identity_obj = employee_obj.follow_link("has_identity")
print("Linked Identity ID:", identity_obj.id)
```
