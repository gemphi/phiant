# PhiGov Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiGov** (Enterprise Governance, Compliance Scoring, and Lineage Auditing).

---

## 1. Checking Regulatory Compliance (GDPR, SOC2, HIPAA)

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Assess GDPR compliance across all active datasets and models
report = client.phigov.check_compliance("GDPR")
print(f"Report ID: {report.report_id}")
print(f"Compliance Score: {report.score * 100:.1f}%")
print(f"Passed: {report.passed}")

for finding in report.findings:
    print(f"- {finding}")
```

---

## 2. Auditing Asset Lineage & Provenance

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Trace cryptographic provenance of a dataset or model weights
lineage = client.phigov.audit_lineage(asset_id="dataset_employee_salaries")
print(f"Asset ID: {lineage.asset_id}")
print(f"Source Origin: {lineage.source_origin}")
print(f"Commit SHA-1: {lineage.commit_sha1}")
print("Transformation Pipeline Chain:")
for step in lineage.transform_chain:
    print(f"  └── {step}")
```

---

## 3. Retrieving Enterprise Multi-Standard Governance Scores

```python
from phiadk import PhiADKClient

client = PhiADKClient()

scores = client.phigov.get_compliance_score()
print(f"Overall Governance Rating: {scores['overall_score'] * 100:.1f}%")
print(f"GDPR Status: {scores['gdpr']}")
print(f"SOC2 Type II Status: {scores['soc2_type2']}")
print(f"ISO 27001 Status: {scores['iso27001']}")
```
