# CipherTextProperty (Encrypted Vault Properties)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**decrypt**](#decrypt) | **POST** `/v2/topos/cipherText/decrypt` | Stable |
[**encrypt**](#encrypt) | **POST** `/v2/topos/cipherText/encrypt` | Stable |

---

# **decrypt**

Cryptographically decrypts an encrypted ciphertext property using the system key vault and ABAC access tokens.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **ciphertext** | `str` | The AES-256-GCM encrypted string token. | **Required** |
| **auth_token** | `str` | Security bearer token authorized for decryption. | **Required** |

### Return Type
`str` (plaintext value)

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

emp = client.v2.topos.object("Employee", "jane@phient.com")
ssn_encrypted = emp.properties["national_id"]

plaintext = client.v2.topos.CipherTextProperty.decrypt(ssn_encrypted.ciphertext)
print(f"Decrypted ID: {plaintext}")
```
