# Phient UI (`@pui/components`) Component Catalog

> _Complete catalog of enterprise UI primitives, layout containers, forms, navigation, and data display components._

---

## 1. Primitives

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `Button` | `Button` | Interactive action trigger | `variant` (primary, secondary, outline, ghost, danger), `size` (sm, md, lg), `icon`, `loading` |
| `ButtonGroup` | `ButtonGroup` | Grouped button container | `vertical`, `fill`, `minimal` |
| `Tag` | `Tag` | Status chips & label markers | `intent` (primary, success, warning, error, info), `round`, `minimal`, `interactive`, `onRemove` |
| `Badge` | `Badge` | Count badge & indicator | `variant`, `size`, `pill` |
| `Callout` | `Callout` | Contextual alert banner | `intent` (primary, success, warning, error), `title`, `icon`, `compact` |
| `Icon` | `Icon` | Lucide icon wrapper | `name`, `size`, `color` |
| `Title` | `H1`–`H6` | Heading typography | `level` (1–6), `weight`, `color` |
| `Text` | `Text` | Body typography | `variant` (sm, base, lg), `color`, `weight` |
| `Divider` | `Divider` | Structural separator | `orientation` (horizontal, vertical), `spacing` |

---

## 2. Layout

| Component | Description | Props & Features |
|:---|:---|:---|
| `Card` | Surface container | `elevation` (0–4), `interactive`, `compact`, `selected` |
| `Stack` | Flexbox layout wrapper | `direction` (row, column), `gap` (1–6), `align`, `justify`, `wrap` |
| `Grid` | CSS Grid container | `columns` (string / number), `gap` (1–6) |
| `Container` | Responsive max-width wrapper | `size` (sm, md, lg, xl, fluid) |
| `Collapse` | Animated accordion fold | `isOpen`, `duration` |

---

## 3. Forms & Controls

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `Input` | `InputGroup` | Single-line text input | `icon`, `rightElement`, `size`, `disabled`, `intent` |
| `Select` | `HTMLSelect` | Dropdown selection | `options`, `size`, `disabled`, `intent` |
| `Switch` | `Switch` | Boolean toggle switch | `checked`, `label`, `size`, `disabled` |
| `Checkbox` | `Checkbox` | Multi-choice checkbox | `checked`, `indeterminate`, `label`, `disabled` |
| `Radio` | `Radio` | Single-choice radio button | `checked`, `label`, `name`, `value` |
| `Slider` | `Slider` | Continuous value slider | `min`, `max`, `step`, `value`, `onChange` |
| `Textarea` | `TextArea` | Multi-line text field | `rows`, `resize`, `intent` |
| `FormGroup` | `FormGroup` | Form label & error wrapper | `label`, `labelInfo`, `helperText`, `intent`, `inline` |

---

## 4. Overlays & Floating Surfaces

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `Dialog` / `Modal` | `Dialog` | Modal focus container | `isOpen`, `onClose`, `title`, `size`, `backdrop` |
| `Drawer` | `Drawer` | Slide-out panel | `isOpen`, `onClose`, `position` (left, right, top, bottom), `size` |
| `Toast` / `Toaster` | `Toast` | Ephemeral notification | `message`, `intent`, `timeout`, `onDismiss` |
| `Tooltip` | `Tooltip` | Hover hint | `content`, `position`, `hoverOpenDelay` |
| `Popover` | `Popover` | Floating popover menu | `content`, `position`, `target` |
| `Menu` | `Menu` | Dropdown / context menu list | `MenuItem`, `MenuDivider` |

---

## 5. Navigation

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `Navbar` | `Navbar` | Top navigation header | `NavbarGroup`, `NavbarHeading`, `NavbarDivider` |
| `Breadcrumbs` | `Breadcrumbs` | Hierarchy path tracker | `items`, `current`, `separator` |
| `Tabs` | `Tabs` | Tabbed section switcher | `selectedTabId`, `onChange`, `TabList`, `Tab` |
| `Sidebar` | `Sidebar` | Collapsible side navigation | `collapsed`, `width`, `onToggle` |
| `Pagination` | `Pagination` | Page navigation controls | `currentPage`, `totalPages`, `onPageChange` |

---

## 6. Data Display & Trees

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `Table` | `HTMLTable` | Data table | `headers`, `rows`, `striped`, `interactive`, `bordered` |
| `Tree` / `TreeView` | `Tree` | Hierarchical node tree | `nodes`, `onNodeClick`, `onNodeExpand`, `onNodeCollapse` |
| `Accordion` | `Accordion` | Collapsible section list | `items`, `allowMultiple` |
| `Rating` | `Rating` | Star / metric rating | `value`, `max`, `readOnly` |
| `List` | `List` | Structured item list | `items`, `bordered` |

---

## 7. Feedback & Status

| Component | Blueprint Equivalent | Description | Props & Features |
|:---|:---|:---|:---|
| `NonIdealState` | `NonIdealState` | Empty / error / loading placeholder | `icon`, `title`, `description`, `action` |
| `ProgressBar` | `ProgressBar` | Linear progress indicator | `value` (0–1), `intent`, `indeterminate`, `striped` |
| `Spinner` | `Spinner` | Circular loading spinner | `size` (sm, md, lg), `intent` |
| `Skeleton` | `Skeleton` | Content loading placeholder | `width`, `height`, `variant` (text, circle, rectangle) |
