'use client';

import React from 'react';
import { Stack, Title, Text, Divider, Callout } from '@pui/components';
import { PageShell } from '../layouts/PageShell';
import { StoreExample } from '../examples/StoreExample';
import { ServiceExample } from '../examples/ServiceExample';
import { StreamExample } from '../examples/StreamExample';
import { Database, Layers, Radio } from 'lucide-react';

export const DataEnginePage: React.FC = () => {
  return (
    <PageShell
      title="Store, Services & API Engine"
      description="Architectural foundation of PUI: Unidirectional reactive state, Dependency Injection service containers, SWR query caching, and real-time streaming."
    >
      <Stack direction="column" gap={4}>
        <div>
          <Title level={4}>1. Reactive Observable Micro-Store</Title>
          <Text variant="muted">
            Ultra-fast state slices with fine-grained selector subscriptions via <code>useSyncExternalStore</code> and snapshot history.
          </Text>
        </div>
        <StoreExample />

        <Divider />

        <div>
          <Title level={4}>2. Dependency Injection Service Container</Title>
          <Text variant="muted">
            Inversion-of-Control service architecture with typed event bus and lifecycle management.
          </Text>
        </div>
        <ServiceExample />

        <Divider />

        <div>
          <Title level={4}>3. Real-Time Token & Telemetry Stream Engine</Title>
          <Text variant="muted">
            Live SSE and NDJSON chunk streaming for AI agent telemetry and real-time operations.
          </Text>
        </div>
        <StreamExample />
      </Stack>
    </PageShell>
  );
};
