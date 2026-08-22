# Attachment

Method | HTTP request | Release Stage |
:--- | :--- | :--- |
[**get**](#get) | **GET** `/v2/topos/attachments/{attachmentRid}` | Stable |
[**read**](#read) | **GET** `/v2/topos/attachments/{attachmentRid}/content` | Stable |
[**upload**](#upload) | **POST** `/v2/topos/attachments/upload` | Stable |
[**upload_with_rid**](#upload_with_rid) | **POST** `/v2/topos/attachments/upload/{attachmentRid}` | Private Beta |

---

# **get**

Get the metadata and content-addressing digest of an attachment.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **attachment_rid** | `str` | The unique Resource Identifier (RID) of the attachment. | **Required** |

### Return type

**Attachment** (`attachment_rid`, `filename`, `size_bytes`, `sha1`, `media_type`)

### Example

```python
from phiegg import PhiEggClient
from pprint import pprint

client = PhiEggClient()

# AttachmentRid | The unique RID of the attachment.
attachment_rid = "ri.topos.main.attachment.bb32154e-e043-4b00-9461-93136ca96b6f"

try:
    api_response = client.v2.topos.Attachment.get(attachment_rid)
    print("The get response:\n")
    pprint(api_response)
except Exception as e:
    print(f"POntology error when calling Attachment.get: {e}\n")
```

### Authorization

Requires Bearer token authentication via `UserTokenAuth` or `ServiceAccountAuth`.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `Attachment` | Success metadata response. | `application/json` |
| **404** | `POntologyError` | Attachment RID not found in manifold. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **read**

Get the binary content stream of an attachment from content-addressed storage.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **attachment_rid** | `str` | The unique Resource Identifier (RID) of the attachment. | **Required** |

### Return type

**bytes**

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

attachment_rid = "ri.topos.main.attachment.bb32154e-e043-4b00-9461-93136ca96b6f"

try:
    content_bytes = client.v2.topos.Attachment.read(attachment_rid)
    print(f"Read {len(content_bytes)} bytes from attachment stream.")
    with open("downloaded_file.bin", "wb") as f:
        f.write(content_bytes)
except Exception as e:
    print(f"POntology error when calling Attachment.read: {e}\n")
```

### Authorization

Requires read permissions on the referencing 0-simplex entity or attachment store.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `bytes` | Binary payload stream of the attachment. | `*/*` |
| **404** | `POntologyError` | Attachment RID not found. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **upload**

Upload an attachment to use in an action morphism. Any attachment which has not been linked to a 0-simplex object via an action within one hour after upload will be garbage-collected. Previously mapped attachments which are not connected to any object anymore are also pruned on a biweekly retention schedule.

The body of the request must contain the binary content of the file and the `Content-Type` header must be `application/octet-stream` or the specific file MIME type.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **body** | `bytes` | Body of the request containing the raw file bytes. | **Required** |
| **content_length** | `Optional[int]` | The size in bytes of the file content being uploaded. | Optional |
| **content_type** | `Optional[str]` | The media type of the file being uploaded (e.g. `'application/pdf'`). | Optional |
| **filename** | `str` | The display name and extension of the file being uploaded. | **Required** |

### Return type

**Attachment**

### Example

```python
from phiegg import PhiEggClient
from pprint import pprint

client = PhiEggClient()

with open("quarterly_report.pdf", "rb") as f:
    file_bytes = f.read()

filename = "quarterly_report.pdf"
content_type = "application/pdf"
content_length = len(file_bytes)

try:
    api_response = client.v2.topos.Attachment.upload(
        body=file_bytes,
        filename=filename,
        content_type=content_type,
        content_length=content_length,
    )
    print("The upload response:\n")
    pprint(api_response)
except Exception as e:
    print(f"POntology error when calling Attachment.upload: {e}\n")
```

### Authorization

Requires write permissions on the POntology manifold.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `Attachment` | Attachment successfully registered and indexed with SHA-1 hash. | `application/json` |
| **400** | `POntologyError` | Invalid payload or missing required metadata headers. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)

---

# **upload_with_rid**

Upload attachment bytes directly targeting a pre-allocated Resource Identifier (`attachmentRid`).

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **attachment_rid** | `str` | Pre-allocated attachment RID. | **Required** |
| **body** | `bytes` | Binary payload of the file. | **Required** |
| **filename** | `str` | Target filename. | **Required** |

### Return type

**Attachment**

### Example

```python
from phiegg import PhiEggClient

client = PhiEggClient()

rid = "ri.topos.main.attachment.custom-preallocated-rid"
with open("dataset.parquet", "rb") as f:
    data = f.read()

res = client.v2.topos.Attachment.upload_with_rid(rid, body=data, filename="dataset.parquet")
print(f"Uploaded attachment to pre-allocated RID: {res.attachment_rid}")
```

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `Attachment` | Attachment successfully written. | `application/json` |
| **409** | `POntologyError` | RID already committed or conflicts with existing entry. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)
