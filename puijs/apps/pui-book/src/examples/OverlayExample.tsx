'use client';

import React, { useState } from 'react';
import { Button, Dialog, Drawer, Stack, Text, ProgressBar } from '@pui/components';

export const OverlayExample: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Stack direction="column" gap={3}>
      <Stack direction="row" gap={2}>
        <Button variant="primary" onClick={() => setDialogOpen(true)}>Open Modal Dialog</Button>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Slideout Drawer</Button>
      </Stack>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Ontology Inspector">
        <div style={{ padding: '16px 0' }}>
          <Text>Inspecting entity schema for FinanceTransaction with strict typing invariants.</Text>
          <div style={{ marginTop: '16px' }}>
            <ProgressBar value={0.85} intent="primary" />
          </div>
        </div>
      </Dialog>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Live Telemetry" position="right">
        <div style={{ padding: '20px' }}>
          <Text variant="sm" color="secondary">Streaming telemetry data from Phiano phase manifold.</Text>
        </div>
      </Drawer>
    </Stack>
  );
};
