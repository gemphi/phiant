import React, { useState, useEffect } from 'react';
import { MousePointerClick } from 'lucide-react';
import { useInspector } from './InspectorContext';
import styles from './inspector.module.scss';

export const SelectorBubble = () => {
  const { inspectMode, hoveredEl, selectElement } = useInspector();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inspectMode && hoveredEl?.ref) {
      const rect = hoveredEl.ref.getBoundingClientRect();
      setPos({
        x: rect.right - 44,
        y: rect.top + rect.height / 2 - 18,
      });
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [inspectMode, hoveredEl]);

  if (!inspectMode) return null;

  return (
    <div
      className={`${styles.selectorBubble} ${visible ? styles.visible : ''}`}
      style={{ left: pos.x, top: pos.y }}
      onClick={(e) => {
        e.stopPropagation();
        if (hoveredEl) selectElement(hoveredEl);
      }}
    >
      <MousePointerClick size={18} />
    </div>
  );
};
