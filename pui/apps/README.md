# Phient UI Applications (`apps/`)

Applications and workbenches for Phient UI (`@phient/pui`), structured according to the Palantir Blueprint standard (`*-app` convention).

---

## Application Directory

| Application | Port | Description |
|:---|:---|:---|
| [`docs-app`](./docs-app) | `3001` | **Component Documentation & Live Playground**: Interactive workbench with real-time props inspector, token switcher, and live code examples (replaces legacy Storybook). |
| [`demo-app`](./demo-app) | `3002` | **Enterprise Operations Showcase**: Full operational cockpit featuring agent swarms, ontology Topos trees, dense data tables, and metrics telemetry. |
| [`landing-app`](./landing-app) | `3003` | **Design System Landing Page**: Showcase and overview of Phient UI's design philosophy, Palantir Blueprint parity, and theming capabilities. |

---

## Running Applications

```bash
# 1. Run the Component Documentation & Workbench
cd apps/docs-app
npm install
npm run dev

# 2. Run the Enterprise Operations Showcase
cd ../demo-app
npm install
npm run dev

# 3. Run the Landing Showcase
cd ../landing-app
npm install
npm run dev
```
