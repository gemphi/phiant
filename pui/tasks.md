# Phient UI (`@phient/pui`) Maintenance & Operational Tasks

> _Operational tasks, test execution, application development, and build pipelines._

---

## 1. Development Tasks

### Running the Workbench / Documentation App (`docs-app`)
```bash
cd apps/docs-app
npm install
npm run dev
```

### Running the Enterprise Operations Cockpit (`demo-app`)
```bash
cd apps/demo-app
npm install
npm run dev
```

### Running the Landing Page (`landing-app`)
```bash
cd apps/landing-app
npm install
npm run dev
```

---

## 2. Validation & Testing Tasks

### Run Component Tests
```bash
cd apps/docs-app
npm test
```

### Typecheck Core Library
```bash
cd pui
npm run typecheck
```
