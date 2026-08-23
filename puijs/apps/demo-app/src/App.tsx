'use client';

import React, { useState } from 'react';
import { Callout, Drawer, Title, Text, Divider } from '@pui/components';
import { CockpitHeader } from './CockpitHeader';
import { CockpitSidebar } from './CockpitSidebar';
import { MetricsGrid } from './MetricsGrid';
import { SwarmTable } from './SwarmTable';

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState('ontology/geo');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--phi-color-background)' }}>
      <CockpitHeader />
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', flex: 1 }}>
        <CockpitSidebar onSelect={setSelectedNode} />
        <main style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Callout intent="primary" title="Palantir Foundry / Blueprint Decoupled Standard">
            All UI components shown here render pure, state-agnostic primitives with zero business logic coupling.
          </Callout>
          <MetricsGrid />
          <SwarmTable onInspect={() => setInspectorOpen(true)} />
        </main>
      </div>
      <Drawer isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} title="Telemetry Inspector" position="right">
        <div style={{ padding: '20px' }}>
          <Title level={5}>Node Details: {selectedNode}</Title>
          <Text variant="sm" color="secondary" style={{ margin: '8px 0 16px 0' }}>
            Axiomatic phase properties and state mutations.
          </Text>
          <Divider style={{ margin: '16px 0' }} />
          <Callout intent="success" title="Health: Optimal">
            Low latency, zero phase drift detected across the Kuramoto coupling cycle.
          </Callout>
        </div>
      </Drawer>
    </div>
  );
}
