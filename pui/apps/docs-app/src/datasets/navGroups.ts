import {
  Home, Play, Box, LayoutGrid, Type, MousePointer2,
  AlertCircle, Navigation, Table, ShoppingCart,
} from 'lucide-react';

export type NavItem = {
  path: string;
  label: string;
};

export type NavGroup = {
  label: string;
  icon: any;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Getting Started',
    icon: Home,
    items: [
      { path: '/', label: 'Welcome' },
      { path: '/overview', label: 'Overview' },
    ],
  },
  {
    label: 'Play',
    icon: Play,
    items: [{ path: '/play', label: 'Play' }],
  },
  {
    label: 'Primitives',
    icon: Box,
    items: [
      { path: '/primitives', label: 'Overview' },
      { path: '/primitives/button', label: 'Button' },
      { path: '/primitives/input', label: 'Input' },
      { path: '/primitives/text', label: 'Text' },
    ],
  },
  {
    label: 'Layout',
    icon: LayoutGrid,
    items: [
      { path: '/layout', label: 'Overview' },
      { path: '/layout/container', label: 'Container' },
      { path: '/layout/grid', label: 'Grid' },
      { path: '/layout/row', label: 'Row' },
      { path: '/layout/col', label: 'Col' },
      { path: '/layout/stack', label: 'Stack' },
      { path: '/layout/shell', label: 'Shell' },
    ],
  },
  {
    label: 'Forms',
    icon: Type,
    items: [
      { path: '/forms', label: 'Overview' },
      { path: '/forms/checkbox', label: 'Checkbox' },
      { path: '/forms/radio', label: 'Radio' },
    ],
  },
  {
    label: 'Overlays',
    icon: MousePointer2,
    items: [
      { path: '/overlays', label: 'Overview' },
      { path: '/overlays/modal', label: 'Modal' },
      { path: '/overlays/drawer', label: 'Drawer' },
    ],
  },
  {
    label: 'Feedback',
    icon: AlertCircle,
    items: [
      { path: '/feedback', label: 'Overview' },
      { path: '/feedback/alert', label: 'Alert' },
      { path: '/feedback/toast', label: 'Toast' },
    ],
  },
  {
    label: 'Navigation',
    icon: Navigation,
    items: [
      { path: '/navigation', label: 'Overview' },
      { path: '/navigation/tabs', label: 'Tabs' },
      { path: '/navigation/menu', label: 'Menu' },
    ],
  },
  {
    label: 'Showcases',
    icon: Table,
    items: [
      { path: '/showcase', label: 'Overview' },
      { path: '/showcase/table', label: 'Table' },
      { path: '/showcase/list', label: 'List' },
    ],
  },
  {
    label: 'Commerce',
    icon: ShoppingCart,
    items: [
      { path: '/commerce', label: 'Overview' },
      { path: '/commerce/product-card', label: 'Product Card' },
      { path: '/commerce/cart', label: 'Cart' },
    ],
  },
];
