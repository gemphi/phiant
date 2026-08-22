# Widgets & Blueprint Documentation Portal (`Widgets/BlueprintDashboard.md`)

- **Palantir Symmetry**: Maps to `foundry_sdk/v2/widgets` (`DevModeSettings.md`, `WidgetSet.md`).
- **Phient Subsystem**: [`src/phiegg/phiapi/dashboard.html`](./phient/src/phiegg/phiapi/dashboard.html).

---

## 1. 3-Column Documentation & Developer Portal

Phient combines Palantir Blueprint (`bp5-dark`) aesthetics with a PayPal 3-column live sandbox layout:
1. **Column 1**: Searchable Hierarchical Catalog Tree.
2. **Column 2**: Dynamic Markdown renderer (`marked.js`) and Live Mermaid diagrams (`mermaid.js`).
3. **Column 3**: PayPal-style live cURL / Python SDK / CLI sandbox executor.

```
┌───────────────────────────┬─────────────────────────────────────────────────┬──────────────────────────────────┐
│   COLUMN 1: SIDEBAR       │       COLUMN 2: LIVE MARKDOWN & DIAGRAMS        │   COLUMN 3: LIVE API PLAYGROUND  │
│   (Catalog & Search)      │       (Rendered via marked.js + mermaid.js)     │   (PayPal-style Live Sandbox)    │
└───────────────────────────┴─────────────────────────────────────────────────┴──────────────────────────────────┘
```
