# Phient UI (`@pui/components`) Specifications

> _Formal technical specifications, TypeScript interfaces, and token bindings._

---

## 1. Core Component Specifications

### 1.1 `Button`
```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}
```

### 1.2 `Tree` / `TreeNode`
```typescript
export interface TreeNode {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  secondaryLabel?: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  childNodes?: TreeNode[];
  data?: any;
}

export interface TreeProps {
  nodes: TreeNode[];
  onNodeClick?: (node: TreeNode, nodePath: number[]) => void;
  onNodeCollapse?: (node: TreeNode, nodePath: number[]) => void;
  onNodeExpand?: (node: TreeNode, nodePath: number[]) => void;
  className?: string;
}
```

### 1.3 `Callout`
```typescript
export type CalloutIntent = 'primary' | 'success' | 'warning' | 'error' | 'none';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: CalloutIntent;
  title?: string;
  icon?: React.ReactNode | null;
  compact?: boolean;
}
```

### 1.4 `Tag`
```typescript
export type TagIntent = 'none' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: TagIntent;
  size?: TagSize;
  interactive?: boolean;
  minimal?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
```
