# PhiDoc Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiDoc** (Documentation, Workspace Indexing, and Flow Capture).

---

## 1. Indexing Workspace Documentation

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Scan workspace and generate an index of all technical documentation
doc_index = client.phidoc.indexer.index_directory("docs/")
print(f"Total Documents Indexed: {len(doc_index)}")

for doc in doc_index:
    print(f"- {doc['title']} ({doc['path']}) - {doc['word_count']} words")
```

---

## 2. Palantir Flow Capture Documentation Generation

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Generate automatic documentation from multi-step user interaction snapshots
flow_doc = client.phidoc.capture.generate_documentation(
    flow_title="Employee Onboarding & Access Granting",
    snapshots=[
        {"step": 1, "action": "Lookup employee in PhiOne"},
        {"step": 2, "action": "Assign security roles in PhiSec"},
        {"step": 3, "action": "Emit onboarding event to PhiBus"},
    ],
    audio_transcript="User verified identity, assigned admin role, and triggered bus event."
)

print(flow_doc["markdown_content"])
```

---

## 3. Notion & Knowledge Base Sync

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Sync internal documentation out to external knowledge bases
sync_status = client.phidoc.notion.sync_page(
    page_id="notion_page_123",
    local_path="docs/v1/README.md"
)
print("Sync Status:", sync_status["status"])
```
