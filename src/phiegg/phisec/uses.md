# PhiSec Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiSec** (Security Governance, Vulnerability Scanning, and Policy Enforcement).

---

## 1. Vulnerability & Dependency Scanning

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Scan workspace or target component for security vulnerabilities
scan = client.phisec.scan_target(target="workspace/dependencies")
print(f"Scan ID: {scan.scan_id}")
print(f"Risk Score: {scan.risk_score}")
print(f"Passed: {scan.passed}")

if not scan.passed:
    for vuln in scan.vulnerabilities:
        print(f"⚠️ [{vuln.severity}] {vuln.cve_id} in {vuln.component}: {vuln.description}")
```

---

## 2. JWT & Cryptographic Token Verification

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Verify authentication tokens and retrieve subject claims
token_receipt = client.phisec.verify_token("eyJhbGciOiJIUzI1NiIsIn...")

if token_receipt.token_valid:
    print(f"Authenticated Subject: {token_receipt.subject}")
    print(f"Assigned Roles: {token_receipt.roles}")
else:
    print("❌ Invalid or expired token.")
```

---

## 3. Attribute-Based Access Control (ABAC) Policy Enforcement

```python
from phiegg import PhiEggClient

client = PhiEggClient()

# Evaluate permission matrix before mutating topological state
decision = client.phisec.enforce_policy(
    resource="Employee",
    action="delete_record",
    subject="jane@phient.com"
)

if decision["decision"] == "PERMIT":
    print("Action authorized.")
else:
    print(f"Action denied for subject {decision['subject']}")
```
