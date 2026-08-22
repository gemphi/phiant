# Theme Preferences & Color Modes (Blueprint `bp5-dark` / `bp5-light`)

Method | Function / Control | Description |
:--- | :--- | :--- |
**Web UI Toggle** | `cycleTheme()` / `#theme-btn` | Interactive navbar button toggling between **🌙 Dark** and **☀️ Light** modes. |
**JavaScript API** | `applyTheme('dark' \| 'light')` | Programmatic switching with automatic `localStorage` persistence. |
**CSS Classes** | `class="bp5-dark"` / `class="bp5-light"` | Root `<html>` element theme classes adhering to Palantir Blueprint standard. |

---

# **How to Change Theme Preference**

### 1. In the Web UI Dashboard (`http://127.0.0.1:8000/dashboard` or `/`)
Click the **🌙 Dark / ☀️ Light** button located in the top-right navbar next to the "OpenAPI Swagger" and "+ Generate Agent" buttons.
- The theme dynamically adjusts all background colors, typography, tables, code blocks, and playground editors with smooth CSS transitions.
- Mermaid diagrams automatically re-render in the matching color scheme (`dark` vs `default`).
- Your selection is automatically persisted in `localStorage` under the key `'phi_theme'`.

### 2. Programmatically via JavaScript
```javascript
// Switch to Light Mode
applyTheme('light');

// Switch to Dark Mode
applyTheme('dark');

// Toggle between modes
cycleTheme();
```

### 3. CSS Variables Token System

| Token | Dark Mode (`.bp5-dark`) | Light Mode (`.bp5-light`) |
| :--- | :--- | :--- |
| `--bp-bg` | `#090d13` | `#f8fafc` |
| `--bp-bg-2` | `#101620` | `#ffffff` |
| `--bp-card` | `#151d28` | `#ffffff` |
| `--bp-border` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` |
| `--bp-text` | `#f0f6fc` | `#0f172a` |
| `--bp-text-muted` | `#8b949e` | `#64748b` |
| `--bp-code-bg` | `#090c10` | `#f8fafc` |
