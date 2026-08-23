import type { PageData } from '../types';
import type { StoreConfig } from '../PageView';
import type { ActionHandler } from '../actionMap';
import { COMMERCE_PAGE_DATA } from './pageData';

/* ---------- Default action handler (logs to console) ---------- */

const defaultActionHandler: ActionHandler = (action, payload, context) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[PageStore] action: ${action}`, { payload, component: context.type, path: context.path });
  }
};

/* ---------- Page store entry ---------- */

export type PageStoreEntry = {
  path: string;
  page: PageData;
  config?: StoreConfig;
  title?: string;
  description?: string;
};

/* ---------- Registry ---------- */

export const PAGE_STORE: Record<string, PageStoreEntry> = {
  '/commerce': {
    path: '/commerce',
    page: COMMERCE_PAGE_DATA,
    config: {
      interactive: false,
      showThemeVars: false,
      onAction: defaultActionHandler,
    },
  },
};

/* ---------- Helpers ---------- */

export const getPageEntry = (path: string): PageStoreEntry | undefined => PAGE_STORE[path];

export const getAllPageEntries = (): PageStoreEntry[] => Object.values(PAGE_STORE);

export const registerPage = (entry: PageStoreEntry) => {
  PAGE_STORE[entry.path] = entry;
};
