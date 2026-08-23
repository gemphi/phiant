import React, { useRef, useEffect, useCallback } from 'react';
import { useInspector, type SelectableElement } from './InspectorContext';
import styles from './inspector.module.scss';

let selectableIdCounter = 0;

type SelectableProps = {
  children: React.ReactNode;
  tag: string;
  label?: string;
  className?: string;
};

export const Selectable = ({ children, tag, label, className = '' }: SelectableProps) => {
  const { inspectMode, hoveredEl, selectedEl, setHoveredEl, selectElement, registerElement, unregisterElement } = useInspector() as any;
  const ref = useRef<HTMLElement>(null);
  const idRef = useRef(`sel-${++selectableIdCounter}`);

  useEffect(() => {
    const id = idRef.current;
    const el: SelectableElement = {
      id,
      tag,
      label: label || tag,
      ref: ref.current,
    };
    registerElement(el);
    return () => unregisterElement(id);
  }, [tag, label, registerElement, unregisterElement]);

  const handleMouseEnter = useCallback(() => {
    if (!inspectMode) return;
    setHoveredEl({ id: idRef.current, tag, label: label || tag, ref: ref.current });
  }, [inspectMode, setHoveredEl, tag, label]);

  const handleMouseLeave = useCallback(() => {
    if (!inspectMode) return;
    setHoveredEl(null);
  }, [inspectMode, setHoveredEl]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!inspectMode) return;
    e.stopPropagation();
    e.preventDefault();
    selectElement({ id: idRef.current, tag, label: label || tag, ref: ref.current });
  }, [inspectMode, selectElement, tag, label]);

  const isHovered = hoveredEl?.id === idRef.current;
  const isSelected = selectedEl?.id === idRef.current;

  const cls = [
    styles.selectable,
    inspectMode && isHovered ? styles.inspectHover : '',
    inspectMode && isSelected ? styles.inspectSelected : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
