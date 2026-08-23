import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Modal, Button, Title, Text, Stack, Span, Grid, Divider } from '@phient/pui';
import { useInspector } from './InspectorContext';

export const ExpandMode = () => {
  const { expandMode, setExpandMode, pageElements, selectedEl, selectElement } = useInspector();

  if (!expandMode) return null;

  const handleClose = () => {
    setExpandMode(false);
  };

  const currentEl = selectedEl || pageElements[0] || null;

  const computedStyle = currentEl?.ref ? window.getComputedStyle(currentEl.ref) : null;
  const rect = currentEl?.ref?.getBoundingClientRect();

  const props: Record<string, string> = {};
  if (computedStyle) {
    props['display'] = computedStyle.display;
    props['position'] = computedStyle.position;
    props['width'] = computedStyle.width;
    props['height'] = computedStyle.height;
    props['padding'] = computedStyle.padding;
    props['margin'] = computedStyle.margin;
    props['font-size'] = computedStyle.fontSize;
    props['font-family'] = computedStyle.fontFamily;
    props['color'] = computedStyle.color;
    props['background'] = computedStyle.backgroundColor;
    props['border'] = computedStyle.border;
    props['border-radius'] = computedStyle.borderRadius;
    props['box-shadow'] = computedStyle.boxShadow;
    props['opacity'] = computedStyle.opacity;
    props['z-index'] = computedStyle.zIndex;
  }

  return (
    <Modal isOpen={expandMode} onClose={handleClose} title={`Elements (${pageElements.length})`} size="lg">
      <Stack direction="row" gap={4} style={{ minHeight: '400px' }}>
        <Stack direction="column" gap={2} style={{ width: '240px', flexShrink: 0 }}>
          <Stack direction="column" gap={1}>
            {pageElements.map((el) => (
              <Button
                key={el.id}
                variant={currentEl?.id === el.id ? 'primary' : 'ghost'}
                size="sm"
                fullWidth
                onClick={() => selectElement(el)}
                style={{ justifyContent: 'space-between' }}
              >
                <Span variant="sm">{el.tag}</Span>
                <Span variant="sm">{el.label}</Span>
                <ChevronRight size={14} style={{ opacity: 0.4 }} />
              </Button>
            ))}
          </Stack>
          {pageElements.length === 0 && (
            <Text variant="sm" style={{ textAlign: 'center', opacity: 0.6 }}>
              No elements registered on this page.
            </Text>
          )}
        </Stack>

        <Divider orientation="vertical" />

        <Stack direction="column" gap={4} style={{ flex: 1 }}>
          {currentEl ? (
            <>
              <Stack direction="column" gap={1}>
                <Title variant="h3">{currentEl.label}</Title>
                <Text variant="sm">Tag: {currentEl.tag} · ID: {currentEl.id}</Text>
              </Stack>

              {rect && (
                <Grid columns={4} gap={3}>
                  <Stack direction="column" gap={1}>
                    <Span variant="muted">Width</Span>
                    <Span variant="bold">{Math.round(rect.width)} px</Span>
                  </Stack>
                  <Stack direction="column" gap={1}>
                    <Span variant="muted">Height</Span>
                    <Span variant="bold">{Math.round(rect.height)} px</Span>
                  </Stack>
                  <Stack direction="column" gap={1}>
                    <Span variant="muted">Top</Span>
                    <Span variant="bold">{Math.round(rect.top)} px</Span>
                  </Stack>
                  <Stack direction="column" gap={1}>
                    <Span variant="muted">Left</Span>
                    <Span variant="bold">{Math.round(rect.left)} px</Span>
                  </Stack>
                </Grid>
              )}

              <Divider />

              <Stack direction="column" gap={2}>
                <Title variant="h5">All Computed Styles</Title>
                {Object.entries(props).map(([key, val]) => (
                  <Stack key={key} direction="row" justify="between" align="center">
                    <Span variant="muted">{key}</Span>
                    <Span variant="sm">{val}</Span>
                  </Stack>
                ))}
              </Stack>
            </>
          ) : (
            <Stack direction="column" gap={1}>
              <Title variant="h3">No element selected</Title>
              <Text variant="sm">Select an element from the list on the left.</Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};