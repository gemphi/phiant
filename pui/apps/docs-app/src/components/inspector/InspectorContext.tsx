import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface SelectableElement {
  id: string;
  tag: string;
  label: string;
  ref: HTMLElement | null;
}

interface InspectorContextValue {
  inspectMode: boolean;
  setInspectMode: (on: boolean) => void;
  hoveredEl: SelectableElement | null;
  setHoveredEl: (el: SelectableElement | null) => void;
  selectedEl: SelectableElement | null;
  selectElement: (el: SelectableElement | null) => void;
  drawerOpen: boolean;
  expandMode: boolean;
  setExpandMode: (on: boolean) => void;
  pageElements: SelectableElement[];
  registerElement: (el: SelectableElement) => void;
  unregisterElement: (id: string) => void;
  clearElements: () => void;
}

const InspectorContext = createContext<InspectorContextValue>({
  inspectMode: false,
  setInspectMode: () => {},
  hoveredEl: null,
  setHoveredEl: () => {},
  selectedEl: null,
  selectElement: () => {},
  drawerOpen: false,
  expandMode: false,
  setExpandMode: () => {},
  pageElements: [],
  registerElement: () => {},
  unregisterElement: () => {},
  clearElements: () => {},
});

export const useInspector = () => useContext(InspectorContext);

export const InspectorProvider = ({ children }: { children: React.ReactNode }) => {
  const [inspectMode, setInspectMode] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<SelectableElement | null>(null);
  const [selectedEl, setSelectedEl] = useState<SelectableElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandMode, setExpandMode] = useState(false);
  const [pageElements, setPageElements] = useState<SelectableElement[]>([]);
  const elementsRef = useRef<Map<string, SelectableElement>>(new Map());

  const registerElement = useCallback((el: SelectableElement) => {
    elementsRef.current.set(el.id, el);
    setPageElements(Array.from(elementsRef.current.values()));
  }, []);

  const unregisterElement = useCallback((id: string) => {
    elementsRef.current.delete(id);
    setPageElements(Array.from(elementsRef.current.values()));
  }, []);

  const clearElements = useCallback(() => {
    elementsRef.current.clear();
    setPageElements([]);
  }, []);

  const selectElement = useCallback((el: SelectableElement | null) => {
    setSelectedEl(el);
    setDrawerOpen(!!el);
  }, []);

  return (
    <InspectorContext.Provider
      value={{
        inspectMode,
        setInspectMode,
        hoveredEl,
        setHoveredEl,
        selectedEl,
        selectElement,
        drawerOpen,
        expandMode,
        setExpandMode,
        pageElements,
        registerElement,
        unregisterElement,
        clearElements,
      }}
    >
      {children}
    </InspectorContext.Provider>
  );
};
