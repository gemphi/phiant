# OntologyTransaction / POntologyTransaction (Atomic Mutation Blocks)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**create**](#create) | **POST** `/v2/topos/transactions` | Stable |
[**commit**](#commit) | **POST** `/v2/topos/transactions/{transactionRid}/commit` | Stable |
[**abort**](#abort) | **POST** `/v2/topos/transactions/{transactionRid}/abort` | Stable |

---

# **commit**

Commits an atomic batch of action morphisms in a single immutable DAG commit transaction.

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

tx = client.v2.topos.Transaction.create()
tx.add_action("create_employee", {"email": "alex@phient.com", "title": "Security Lead"})
tx.add_action("assign_hardware", {"email": "alex@phient.com", "laptop_id": "macbook-pro-16"})

result = tx.commit()
print("Transaction Committed. SHA-1:", result.commit_sha1)
```
