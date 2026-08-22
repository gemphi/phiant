# Media Sets & Flow Capture (`MediaSets/FlowCaptureMedia.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/media_sets` (`MediaSet.md`).
- **Phient Subsystem**: [`src/phiadk/phidoc/`](./phient/src/phiadk/phidoc/) & [`src/phiadk/phiora/`](./phient/src/phiadk/phiora/).

---

## 1. Flow Capture & Media Assets

Phient stores UI screenshots, workflow recordings, audio notes, and rich attachments linked to documentation and topological actions.

```mermaid
graph LR
    Snapshots["UI Snapshots (WebP/PNG)"] --> FlowCapture["Flow Capture Engine (PhiDoc)"]
    Audio["Audio Transcripts"] --> FlowCapture
    FlowCapture --> Doc["Generated Markdown Specification"]
```
