import {
  Home, Box, LayoutGrid, Type, MousePointer2,
  AlertCircle, Navigation, Table, Image, ShoppingCart,
} from 'lucide-react';
import type { NavItem } from './navGroups';

export type Capability = {
  icon: any;
  title: string;
  description?: string;
  links: NavItem[];
};

export const CAPABILITIES: Capability[] = [
  {
    icon: Home,
    title: 'Getting Started',
    description: 'Welcome guide and platform overview.',
    links: [
      { path: '/', label: 'Welcome' },
      { path: '/overview', label: 'Overview' },
    ],
  },
  {
    icon: Box,
    title: 'Primitives',
    description: 'Button, Badge, Title, Text, Span, Divider, Icon',
    links: [
      { path: '/primitives', label: 'Overview' },
      { path: '/primitives/button', label: 'Button' },
      { path: '/primitives/input', label: 'Input' },
      { path: '/primitives/text', label: 'Text' },
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Layout',
    description: 'Container, Row, Col, Grid, Stack — responsive 12-column grid',
    links: [
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
    icon: Type,
    title: 'Forms',
    description: 'Input, Select, Textarea, Checkbox, Radio, Form, Stepper',
    links: [
      { path: '/forms', label: 'Overview' },
      { path: '/forms/checkbox', label: 'Checkbox' },
      { path: '/forms/radio', label: 'Radio' },
    ],
  },
  {
    icon: MousePointer2,
    title: 'Overlays',
    description: 'Modal, Drawer, Toast, Tooltip',
    links: [
      { path: '/overlays', label: 'Overview' },
      { path: '/overlays/modal', label: 'Modal' },
      { path: '/overlays/drawer', label: 'Drawer' },
    ],
  },
  {
    icon: AlertCircle,
    title: 'Feedback',
    description: 'Spinner, Skeleton, EmptyState, Alert',
    links: [
      { path: '/feedback', label: 'Overview' },
      { path: '/feedback/alert', label: 'Alert' },
      { path: '/feedback/toast', label: 'Toast' },
    ],
  },
  {
    icon: Navigation,
    title: 'Navigation',
    description: 'Link, Menu, Breadcrumbs, Tabs, Pagination',
    links: [
      { path: '/navigation', label: 'Overview' },
      { path: '/navigation/tabs', label: 'Tabs' },
      { path: '/navigation/menu', label: 'Menu' },
    ],
  },
  {
    icon: Table,
    title: 'Showcases',
    description: 'Card, Accordion, Rating, Table, List',
    links: [
      { path: '/showcase', label: 'Overview' },
      { path: '/showcase/table', label: 'Table' },
      { path: '/showcase/list', label: 'List' },
    ],
  },
  {
    icon: Image,
    title: 'Media',
    description: 'Image, Avatar',
    links: [
      { path: '/media', label: 'Overview' },
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Commerce',
    description: 'Price, ProductCard, ItemCard, OrderCard',
    links: [
      { path: '/commerce', label: 'Overview' },
      { path: '/commerce/product-card', label: 'Product Card' },
      { path: '/commerce/cart', label: 'Cart' },
    ],
  },
];
