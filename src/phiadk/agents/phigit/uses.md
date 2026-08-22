# PhiGit Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiGit** (Internal Content-Addressed Git Engine).

---

## 1. Storing Blobs & Cryptographic SHA-1 Addressing

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Store raw bytes or text blob in content-addressed DAG
content = b"Simplicial complex state manifest v2"
blob = client.phigit.store_blob(content)
print(f"Blob SHA-1 Hash: {blob.sha1}")
print(f"Blob Size: {blob.size} bytes")

# Read blob back
loaded_blob = client.phigit.get_blob(blob.sha1)
print("Decoded Content:", loaded_blob.data.decode("utf-8"))
```

---

## 2. Building Trees and Creating Lineage Commits

```python
from phiadk import PhiADKClient
from phiadk.agents.phigit.models import TreeEntry

client = PhiADKClient()

# Create tree entries from blobs
b1 = client.phigit.store_blob(b"file 1 content")
b2 = client.phigit.store_blob(b"file 2 content")

tree = client.phigit.store_tree([
    TreeEntry(mode="100644", path="config.json", sha1=b1.sha1),
    TreeEntry(mode="100644", path="manifest.yaml", sha1=b2.sha1),
])

# Create commit on a branch
commit = client.phigit.commit(
    tree_sha1=tree.sha1,
    message="feat: register new topological schema",
    author="Jane Muthoni <jane@phient.com>",
    branch="master"
)
print(f"Commit SHA-1: {commit.sha1}")
print(f"Branch 'master' now points to: {client.phigit.get_ref('refs/heads/master')}")
```

---

## 3. Comparing Trees (Diffs)

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Compute diff between two tree states
diff = client.phigit.diff_trees(tree_a_sha1="...", tree_b_sha1="...")
print(f"Added Files: {diff.added}")
print(f"Modified Files: {diff.modified}")
print(f"Deleted Files: {diff.deleted}")
```
