# MediaReferenceProperty (Flow Capture Media References)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**get_media_reference**](#get_media_reference) | **GET** `/v2/topos/objects/{objectType}/{primaryKey}/media/{property}` | Stable |

---

# **get_media_reference**

Gets the media reference RID and streaming URL for a rich asset (e.g. video capture, schematic image) bound to a 0-simplex object.

### Example

```python
from phiadk import PhiADKClient

client = PhiADKClient()

page = client.v2.topos.object("DocumentPage", "doc-spec-01")
media = page.properties.get("workflow_recording")

print(f"Media Reference RID: {media.media_reference_rid}")
print(f"View URL: {media.view_url}")
```
