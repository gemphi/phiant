# Filesystem & Cryptographic DAG Engine (`Filesystem/ContentAddressedStorage.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/filesystem` (`Folder.md`, `Project.md`, `Resource.md`, `Space.md`).
- **Phient Subsystem**: [`src/phiadk/phigit/engine.py`](./phient/src/phiadk/phigit/engine.py).

---

## 1. Storage Primitives

Every resource, file, and schema document is stored immutably using standard Git primitives:
- **`Blob`**: Raw bytes identified by 40-character SHA-1 checksum.
- **`Tree`**: Directory index mapping filename strings to Blob/Tree SHA-1 hashes.
- **`Commit`**: Cryptographic lineage pointer to parent commits and author metadata.
- **`Ref`**: Named branch pointers (e.g. `refs/heads/master`).

---

## 2. Python SDK Usage

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Store and read file blob
blob = client.phigit.store_blob(b"Ontologylogical schema manifest v1")
print(f"Content-Addressed Hash: {blob.sha1}")

retrieved = client.phigit.get_blob(blob.sha1)
print("Content:", retrieved.data.decode("utf-8"))
```
