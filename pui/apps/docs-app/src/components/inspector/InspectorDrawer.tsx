import React from 'react';
import { Maximize2, MousePointer2 } from 'lucide-react';
import { Drawer, Button, Title, Text, Stack, Span, Divider } from '@phi/pui';
import { useInspector } from './InspectorContext';

export const InspectorDrawer = () => {
  const { drawerOpen, selectedEl, selectElement, setExpandMode } = useInspector();

  if (!selectedEl) return null;

  const handleClose = () => {
    selectElement(null);
  };

  const handleExpand = () => {
    setExpandMode(true);
  };

  const computedStyle = selectedEl.ref ? window.getComputedStyle(selectedEl.ref) : null;
  const rect = selectedEl.ref?.getBoundingClientRect();

  const props: Record<string, string> = {};
  if (computedStyle) {
    props['display'] = computedStyle.display;
    props['position'] = computedStyle.position;
    props['width'] = computedStyle.width;
    props['height'] = computedStyle.height;
    props['padding'] = computedStyle.padding;
    props['margin'] = computedStyle.margin;
    props['font-size'] = computedStyle.fontSize;
    props['color'] = computedStyle.color;
    props['background'] = computedStyle.backgroundColor;
    props['border'] = computedStyle.border;
    props['border-radius'] = computedStyle.borderRadius;
  }

  return (
    <Drawer isOpen={drawerOpen} onClose={handleClose} title={selectedEl.label} position="right" size="sm">
      <Stack direction="column" gap={4}>
        <Stack direction="column" gap={2}>
          <Title variant="h5">Element</Title>
          <Stack direction="row" justify="between">
            <Span variant="muted">Tag</Span>
            <Span variant="bold">{selectedEl.tag}</Span>
          </Stack>
          <Stack direction="row" justify="between">
            <Span variant="muted">Label</Span>
            <Span variant="bold">{selectedEl.label}</Span>
          </Stack>
          {rect && (
            <Stack direction="row" justify="between">
              <Span variant="muted">Dimensions</Span>
              <Span variant="bold">{Math.round(rect.width)} x {Math.round(rect.height)} px</Span>
            </Stack>
          )}
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <Title variant="h5">Computed Styles</Title>
          {Object.entries(props).map(([key, val]) => (
            <Stack key={key} direction="row" justify="between" align="center">
              <Span variant="muted">{key}</Span>
              <Span variant="sm">{val}</Span>
            </Stack>
          ))}
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <Title variant="h5">Actions</Title>
          <Stack direction="row" gap={2}>
            <Button variant="outline" size="sm" iconLeft={Maximize2 as any} onClick={handleExpand}>
              Expand
            </Button>
            <Button variant="ghost" size="sm" iconLeft={MousePointer2 as any} onClick={handleClose}>
              Deselect
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};