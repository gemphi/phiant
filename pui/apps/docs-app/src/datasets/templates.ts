import {
  LayoutDashboard, ShoppingBag, FileText, Image as ImageIcon, Users, Settings,
  Inbox, Calendar, BarChart3, Mail, MessageSquare, Bookmark, Globe, Server,
  Database, Cloud, BookOpen, PenTool, Map, Camera, type LucideIcon
} from 'lucide-react';

export type LayoutTemplate = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: 'dashboard' | 'commerce' | 'content' | 'admin' | 'utility';
  themeVars?: Record<string, string>;
  sections: {
    id: string;
    name: string;
    component: string;
    props: Record<string, string | boolean | number>;
    layout: 'row' | 'col' | 'grid' | 'stack';
    cols?: number;
    gap?: number;
  }[];
};

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'KPI cards, chart grid, and recent activity feed',
    icon: BarChart3,
    category: 'dashboard',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)', '--phi-font-site-active': 'var(--phi-font-site-1)', '--phi-icon-gradient': 'linear-gradient(135deg, #fbbf24, #f97316)' },
    sections: [
      { id: 'kpis', name: 'KPI Row', component: 'Card', props: { hoverable: true }, layout: 'row', cols: 4, gap: 3 },
      { id: 'chart', name: 'Main Chart', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 4 },
      { id: 'activity', name: 'Activity Feed', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'product-grid',
    name: 'Product Grid',
    description: 'Responsive product cards with filters sidebar',
    icon: ShoppingBag,
    category: 'commerce',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #f43f5e, #fb923c)', '--phi-font-site-active': 'var(--phi-font-site-2)', '--phi-icon-gradient': 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    sections: [
      { id: 'filters', name: 'Filters', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
      { id: 'products', name: 'Product Grid', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 3, gap: 3 },
      { id: 'cart', name: 'Cart Summary', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'article-reader',
    name: 'Article Reader',
    description: 'Long-form content with sticky sidebar and reading progress',
    icon: BookOpen,
    category: 'content',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #0ea5e9, #06b6d4)', '--phi-font-site-active': 'var(--phi-font-site-3)', '--phi-icon-gradient': 'linear-gradient(135deg, #f43f5e, #ec4899)' },
    sections: [
      { id: 'hero', name: 'Hero Header', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 4 },
      { id: 'content', name: 'Article Body', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 3 },
      { id: 'toc', name: 'Table of Contents', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
    ],
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'Sidebar nav with data table and action bar',
    icon: Settings,
    category: 'admin',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #64748b, #334155)', '--phi-font-site-active': 'var(--phi-font-site-4)', '--phi-icon-gradient': 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    sections: [
      { id: 'nav', name: 'Admin Nav', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
      { id: 'table', name: 'Data Table', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
      { id: 'actions', name: 'Action Bar', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
    ],
  },
  {
    id: 'inbox-mail',
    name: 'Inbox / Mail',
    description: 'Mail list with preview pane and compose button',
    icon: Mail,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #3b82f6, #6366f1)', '--phi-font-site-active': 'var(--phi-font-site-5)', '--phi-icon-gradient': 'linear-gradient(135deg, #f97316, #ef4444)' },
    sections: [
      { id: 'folders', name: 'Folders', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
      { id: 'mail-list', name: 'Mail List', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 1 },
      { id: 'preview', name: 'Preview Pane', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'photo-gallery',
    name: 'Photo Gallery',
    description: 'Masonry grid with lightbox and filter tabs',
    icon: Camera,
    category: 'content',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #ec4899, #f43f5e)', '--phi-font-site-active': 'var(--phi-font-site-6)', '--phi-icon-gradient': 'linear-gradient(135deg, #22c55e, #14b8a6)' },
    sections: [
      { id: 'tabs', name: 'Filter Tabs', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
      { id: 'gallery', name: 'Gallery Grid', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 4, gap: 2 },
      { id: 'lightbox', name: 'Lightbox', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'user-profile',
    name: 'User Profile',
    description: 'Profile header, stats row, and activity timeline',
    icon: Users,
    category: 'dashboard',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #8b5cf6, #ec4899)', '--phi-font-site-active': 'var(--phi-font-site-7)', '--phi-icon-gradient': 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    sections: [
      { id: 'header', name: 'Profile Header', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 3 },
      { id: 'stats', name: 'Stats Row', component: 'Card', props: { hoverable: true }, layout: 'row', cols: 3, gap: 3 },
      { id: 'timeline', name: 'Activity Timeline', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'calendar-view',
    name: 'Calendar View',
    description: 'Month grid with event cards and day detail',
    icon: Calendar,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #14b8a6, #0ea5e9)', '--phi-font-site-active': 'var(--phi-font-site-8)', '--phi-icon-gradient': 'linear-gradient(135deg, #f43f5e, #f97316)' },
    sections: [
      { id: 'calendar', name: 'Calendar Grid', component: 'Card', props: { hoverable: false }, layout: 'grid', cols: 7, gap: 1 },
      { id: 'events', name: 'Event List', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 1 },
      { id: 'detail', name: 'Day Detail', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'chat-messenger',
    name: 'Chat / Messenger',
    description: 'Contact list, conversation view, and message input',
    icon: MessageSquare,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #22c55e, #14b8a6)', '--phi-font-site-active': 'var(--phi-font-site-1)', '--phi-icon-gradient': 'linear-gradient(135deg, #8b5cf6, #6366f1)' },
    sections: [
      { id: 'contacts', name: 'Contacts', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
      { id: 'messages', name: 'Messages', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
      { id: 'input', name: 'Message Input', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
    ],
  },
  {
    id: 'bookmark-manager',
    name: 'Bookmark Manager',
    description: 'Tagged bookmark grid with search and folders',
    icon: Bookmark,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #f59e0b, #f97316)', '--phi-font-site-active': 'var(--phi-font-site-2)', '--phi-icon-gradient': 'linear-gradient(135deg, #0ea5e9, #6366f1)' },
    sections: [
      { id: 'search', name: 'Search Bar', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
      { id: 'bookmarks', name: 'Bookmark Grid', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 3, gap: 2 },
      { id: 'tags', name: 'Tag Cloud', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
    ],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Hero, feature grid, testimonials, and CTA',
    icon: Globe,
    category: 'content',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #6366f1, #3b82f6)', '--phi-font-site-active': 'var(--phi-font-site-3)', '--phi-icon-gradient': 'linear-gradient(135deg, #fbbf24, #ef4444)' },
    sections: [
      { id: 'hero', name: 'Hero Section', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 4 },
      { id: 'features', name: 'Feature Grid', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 3, gap: 3 },
      { id: 'testimonials', name: 'Testimonials', component: 'Card', props: { hoverable: false }, layout: 'row', cols: 2, gap: 3 },
      { id: 'cta', name: 'Call to Action', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'server-status',
    name: 'Server Status',
    description: 'Server health cards, uptime chart, and alert log',
    icon: Server,
    category: 'admin',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #ef4444, #f59e0b)', '--phi-font-site-active': 'var(--phi-font-site-4)', '--phi-icon-gradient': 'linear-gradient(135deg, #06b6d4, #14b8a6)' },
    sections: [
      { id: 'servers', name: 'Server Cards', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 4, gap: 2 },
      { id: 'uptime', name: 'Uptime Chart', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 3 },
      { id: 'alerts', name: 'Alert Log', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
    ],
  },
  {
    id: 'database-browser',
    name: 'Database Browser',
    description: 'Table selector, query editor, and results grid',
    icon: Database,
    category: 'admin',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #64748b, #0ea5e9)', '--phi-font-site-active': 'var(--phi-font-site-5)', '--phi-icon-gradient': 'linear-gradient(135deg, #ec4899, #f43f5e)' },
    sections: [
      { id: 'tables', name: 'Table List', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 1 },
      { id: 'query', name: 'Query Editor', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
      { id: 'results', name: 'Results Grid', component: 'Card', props: { hoverable: false }, layout: 'grid', cols: 6, gap: 1 },
    ],
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    description: 'File grid with breadcrumb nav and upload zone',
    icon: Cloud,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #0ea5e9, #6366f1)', '--phi-font-site-active': 'var(--phi-font-site-6)', '--phi-icon-gradient': 'linear-gradient(135deg, #f59e0b, #f97316)' },
    sections: [
      { id: 'breadcrumb', name: 'Breadcrumb Nav', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
      { id: 'files', name: 'File Grid', component: 'Card', props: { hoverable: true }, layout: 'grid', cols: 4, gap: 2 },
      { id: 'upload', name: 'Upload Zone', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'form-wizard',
    name: 'Form Wizard',
    description: 'Multi-step form with progress indicator and steps',
    icon: PenTool,
    category: 'utility',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #8b5cf6, #6366f1)', '--phi-font-site-active': 'var(--phi-font-site-7)', '--phi-icon-gradient': 'linear-gradient(135deg, #22c55e, #0ea5e9)' },
    sections: [
      { id: 'progress', name: 'Progress Steps', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
      { id: 'form', name: 'Form Fields', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 3 },
      { id: 'actions', name: 'Form Actions', component: 'Card', props: { hoverable: false }, layout: 'row', gap: 2 },
    ],
  },
  {
    id: 'map-explorer',
    name: 'Map Explorer',
    description: 'Map view with location list and detail panel',
    icon: Map,
    category: 'content',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #14b8a6, #22c55e)', '--phi-font-site-active': 'var(--phi-font-site-8)', '--phi-icon-gradient': 'linear-gradient(135deg, #f43f5e, #ec4899)' },
    sections: [
      { id: 'map', name: 'Map View', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
      { id: 'locations', name: 'Location List', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 1 },
      { id: 'detail', name: 'Location Detail', component: 'Card', props: { hoverable: false }, layout: 'col', gap: 2 },
    ],
  },
  {
    id: 'inbox-kanban',
    name: 'Kanban Board',
    description: 'Drag columns with task cards and column headers',
    icon: Inbox,
    category: 'dashboard',
    themeVars: { '--phi-brand-gradient': 'linear-gradient(135deg, #f43f5e, #8b5cf6)', '--phi-font-site-active': 'var(--phi-font-site-1)', '--phi-icon-gradient': 'linear-gradient(135deg, #fbbf24, #14b8a6)' },
    sections: [
      { id: 'backlog', name: 'Backlog Column', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 2 },
      { id: 'progress', name: 'In Progress', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 2 },
      { id: 'done', name: 'Done Column', component: 'Card', props: { hoverable: true }, layout: 'col', gap: 2 },
    ],
  },
];
