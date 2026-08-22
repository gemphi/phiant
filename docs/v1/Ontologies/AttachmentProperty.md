# AttachmentProperty (Attachment-Backed Properties)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get_attachment**](#get_attachment) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/attachments/{property}` | Stable |

---

# **get_attachment**

Gets the content metadata and streamable reference for an attachment property on a specific 0-simplex object.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

emp = client.v2.topos.object("Employee", "jane@phient.com")
resume_prop = emp.properties.get("resume_attachment")

print("Attachment RID:", resume_prop.attachment_rid)
print("Filename:", resume_prop.filename)
```
