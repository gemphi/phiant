import React from 'react';
import type { PageData, PageComponent } from './types';

export type PageStoreState = {
  pageData: PageData;
  selectedPath: string | null;
};

export type PageStoreActions = {
  setPageData: (pageData: PageData) => void;
  selectPath: (path: string | null) => void;
  updatePropsAtPath: (path: string, patch: Record<string, any>) => void;
  updateChildrenAtPath: (path: string, children: string) => void;
};

export type PageStore = PageStoreState & PageStoreActions;

const PageStoreContext = React.createContext<PageStore | null>(null);

export const getAtPath = (obj: any, path: string): any => {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

type PageStoreProviderProps = {
  initialPageData: PageData;
  children: React.ReactNode;
};

export const PageStoreProvider = ({ initialPageData, children }: PageStoreProviderProps) => {
  const [state, setState] = React.useState<PageStoreState>({
    pageData: initialPageData,
    selectedPath: null,
  });

  const setPageData = React.useCallback((pageData: PageData) => {
    setState((prev) => ({ ...prev, pageData }));
  }, []);

  const selectPath = React.useCallback((path: string | null) => {
    setState((prev) => ({ ...prev, selectedPath: path }));
  }, []);

  const updatePropsAtPath = React.useCallback((path: string, patch: Record<string, any>) => {
    setState((prev) => {
      const next = structuredClone(prev.pageData);
      const node = getAtPath(next, path);
      if (node && typeof node === 'object') {
        node.props = { ...node.props, ...patch };
      }
      return { ...prev, pageData: next };
    });
  }, []);

  const updateChildrenAtPath = React.useCallback((path: string, children: string) => {
    setState((prev) => {
      const next = structuredClone(prev.pageData);
      const node = getAtPath(next, path);
      if (node && typeof node === 'object') {
        node.children = children;
      }
      return { ...prev, pageData: next };
    });
  }, []);

  const value: PageStore = React.useMemo(
    () => ({
      ...state,
      setPageData,
      selectPath,
      updatePropsAtPath,
      updateChildrenAtPath,
    }),
    [state, setPageData, selectPath, updatePropsAtPath, updateChildrenAtPath]
  );

  return <PageStoreContext.Provider value={value}>{children}</PageStoreContext.Provider>;
};

export const usePageStore = (): PageStore => {
  const ctx = React.useContext(PageStoreContext);
  if (!ctx) throw new Error('usePageStore must be used within PageStoreProvider');
  return ctx;
};

export const getComponentAtPath = (pageData: PageData, path: string): PageComponent | undefined => {
  return getAtPath(pageData, path) as PageComponent | undefined;
};

export const getParentPath = (path: string): string | null => {
  const parts = path.split('.');
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join('.');
};

export const getBreadcrumbPaths = (path: string): string[] => {
  const parts = path.split('.');
  const result: string[] = [];
  for (let i = 1; i <= parts.length; i++) {
    result.push(parts.slice(0, i).join('.'));
  }
  return result;
};

