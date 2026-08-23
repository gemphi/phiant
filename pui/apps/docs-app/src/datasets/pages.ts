export type PageEntry = {
  path: string;
  label: string;
};

export const PAGES: PageEntry[] = [
  { path: '/', label: 'Welcome' },
  { path: '/overview', label: 'Overview' },
  { path: '/play', label: 'Play' },
  { path: '/primitives', label: 'Primitives' },
  { path: '/layout', label: 'Layout' },
  { path: '/forms', label: 'Forms' },
  { path: '/overlays', label: 'Overlays' },
  { path: '/feedback', label: 'Feedback' },
  { path: '/navigation', label: 'Navigation' },
  { path: '/data-display', label: 'Data Display' },
  { path: '/media', label: 'Media' },
  { path: '/commerce', label: 'Commerce' },
];

export const HEADER_TABS = ['Overview', 'Design', 'Code', 'Play'] as const;
