'use client';

import React from 'react';
import { Table, Tag, ProgressBar, Button, Stack, Card, Title, Text } from '@pui/components';
import { Cpu, Database, Shield, RefreshCw } from 'lucide-react';

export const SwarmTable: React.FC<{ onInspect: () => void }> = ({ onInspect }) => {
  const headers = ['Agent / Entity', 'Domain', 'Resonance (r)', 'Status', 'Actions'];
  const rows = [
    [
      <Stack direction="row" gap={2} align="center"><Cpu size={15} /><strong>PhiGen-Master</strong></Stack>,
      'Code Generation',
      <ProgressBar value={0.96} intent="success" />,
      <Tag intent="success" round>Active</Tag>,
      <Button variant="outline" size="sm" onClick={onInspect}>Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Database size={15} /><strong>PhiRAG-Manifold</strong></Stack>,
      'Zero-Matrix Search',
      <ProgressBar value={0.91} intent="primary" />,
      <Tag intent="primary" round>Tuning</Tag>,
      <Button variant="outline" size="sm" onClick={onInspect}>Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Shield size={15} /><strong>PhiLog-Monitor</strong></Stack>,
      'Telemetry Stream',
      <ProgressBar value={0.88} intent="info" />,
      <Tag intent="info" round>Streaming</Tag>,
      <Button variant="outline" size="sm" onClick={onInspect}>Inspect</Button>,
    ],
  ];

  return (
    <Card elevation={1}>
      <Stack direction="row" justify="between" align="center" style={{ marginBottom: '16px' }}>
        <div>
          <Title level={5}>Live Agent Swarms & Ontologies</Title>
          <Text variant="sm" color="secondary">Real-time status of GemPhi mesh nodes</Text>
        </div>
        <Stack direction="row" gap={2}>
          <Button variant="outline" size="sm" icon={<RefreshCw size={13} />}>Refresh</Button>
          <Button variant="primary" size="sm">Deploy Swarm</Button>
        </Stack>
      </Stack>
      <Table headers={headers} rows={rows} />
    </Card>
  );
};
