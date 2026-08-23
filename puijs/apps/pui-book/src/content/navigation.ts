export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  badge?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export const DOCS_NAV_GROUPS: NavGroup[] = [
  {
    id: 'getting-started',
    title: 'Overview',
    items: [
      { id: 'home', label: 'Introduction', path: '/' },
      { id: 'tokens', label: 'Design Tokens', path: '/tokens', badge: '--phi-*' },
      { id: 'ecosystem', label: 'Ecosystem & Topos', path: '/ecosystem' },
    ],
  },
  {
    id: 'architecture',
    title: 'Data Engine & Architecture',
    items: [
      { id: 'data-engine', label: 'Store, Services & API', path: '/data-engine', badge: 'Reactive' },
    ],
  },
  {
    id: 'components',
    title: 'Component Catalog',
    items: [
      { id: 'primitives', label: 'Buttons & Primitives', path: '/components/primitives' },
      { id: 'feedback', label: 'Callouts & Feedback', path: '/components/feedback' },
      { id: 'forms', label: 'Forms & Controls', path: '/components/forms' },
      { id: 'data-display', label: 'Tree & Data Display', path: '/components/data-display' },
      { id: 'overlays', label: 'Dialogs & Overlays', path: '/components/overlays' },
      { id: 'commerce', label: 'Commerce Suite', path: '/components/commerce', badge: 'New' },
      { id: 'playground', label: 'Live Playground', path: '/playground', badge: 'Interactive' },
    ],
  },
];
