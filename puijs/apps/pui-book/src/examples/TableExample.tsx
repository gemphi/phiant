'use client';

import React from 'react';
import { Table, Tag, ProgressBar, Button, Stack } from '@pui/components';
import { Cpu, Database, Shield } from 'lucide-react';

export const TableExample: React.FC = () => {
  const headers = ['Agent Name', 'Domain', 'Harmonic Resonance (r)', 'Status', 'Actions'];
  const rows = [
    [
      <Stack direction="row" gap={2} align="center"><Cpu size={14} /><strong>PhiGen</strong></Stack>,
      'Code Generation',
      <ProgressBar value={0.96} intent="success" />,
      <Tag intent="success" round>Active</Tag>,
      <Button variant="outline" size="sm">Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Database size={14} /><strong>PhiRAG</strong></Stack>,
      'Vector Manifold',
      <ProgressBar value={0.91} intent="primary" />,
      <Tag intent="primary" round>Tuning</Tag>,
      <Button variant="outline" size="sm">Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Shield size={14} /><strong>PhiLog</strong></Stack>,
      'Telemetry Stream',
      <ProgressBar value={0.88} intent="info" />,
      <Tag intent="info" round>Streaming</Tag>,
      <Button variant="outline" size="sm">Inspect</Button>,
    ],
  ];

  return <Table headers={headers} rows={rows} />;
};
