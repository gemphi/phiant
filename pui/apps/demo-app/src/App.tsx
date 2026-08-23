'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Callout,
  Tag,
  Badge,
  Input,
  Select,
  Switch,
  Dialog,
  Drawer,
  NonIdealState,
  ProgressBar,
  Tree,
  TreeNode,
  Table,
  Stack,
  Grid,
  Title,
  Text,
  Divider,
  usePuiTheme,
} from '@phient/pui';
import {
  Database,
  Layers,
  Activity,
  Cpu,
  Search,
  Moon,
  Sun,
  Palette,
  Shield,
  Zap,
  Terminal,
  Folder,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const { theme, setTheme, brandId, setBrandId, brands, isDark } = usePuiTheme();
  const [activeNav, setActiveNav] = useState('mesh');
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>('phiadk/agents/phigen');

  const treeNodes: TreeNode[] = [
    {
      id: 'ontology',
      label: 'Ontology Topos',
      icon: <Database size={15} />,
      isExpanded: true,
      childNodes: [
        { id: 'geo', label: 'GeoProperty (Space-Time Series)' },
        { id: 'media', label: 'MediaProperty (Multi-Modal Stream)' },
        { id: 'cipher', label: 'CipherProperty (Homomorphic Crypto)' },
        { id: 'action', label: 'ActionTypeMetadata (Axiom Morphisms)' },
      ],
    },
    {
      id: 'agents',
      label: 'Agent Swarms (GemPhi)',
      icon: <Layers size={15} />,
      isExpanded: true,
      childNodes: [
        { id: 'phigen', label: 'PhiGen Agent (LLM Code Synthesis)' },
        { id: 'phirag', label: 'PhiRAG Agent (Continuous Manifold)' },
        { id: 'philog', label: 'PhiLog Agent (Observability Telemetry)' },
        { id: 'phibus', label: 'PhiBus Agent (Event Mesh PubSub)' },
      ],
    },
    {
      id: 'phiano',
      label: 'Phiano Phase Manifold',
      icon: <Activity size={15} />,
      isExpanded: true,
      childNodes: [
        { id: 'kuramoto', label: 'Kuramoto Phase Coupling' },
        { id: 'layers', label: '16-Layer Octave Continuum' },
        { id: 'reasoning', label: 'Phase-Space Pathfinding' },
      ],
    },
  ];

  const tableHeaders = ['Agent / Entity', 'Domain', 'Resonance (r)', 'Status', 'Actions'];
  const tableRows = [
    [
      <Stack direction="row" gap={2} align="center"><Cpu size={15} /><strong>PhiGen-Master</strong></Stack>,
      'Code Generation',
      <ProgressBar value={0.96} intent="success" />,
      <Tag intent="success" round>Active</Tag>,
      <Button variant="outline" size="sm" onClick={() => setInspectorOpen(true)}>Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Database size={15} /><strong>PhiRAG-Manifold</strong></Stack>,
      'Zero-Matrix Search',
      <ProgressBar value={0.91} intent="primary" />,
      <Tag intent="primary" round>Tuning</Tag>,
      <Button variant="outline" size="sm" onClick={() => setInspectorOpen(true)}>Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Shield size={15} /><strong>PhiLog-Monitor</strong></Stack>,
      'Telemetry Stream',
      <ProgressBar value={0.88} intent="info" />,
      <Tag intent="info" round>Streaming</Tag>,
      <Button variant="outline" size="sm" onClick={() => setInspectorOpen(true)}>Inspect</Button>,
    ],
    [
      <Stack direction="row" gap={2} align="center"><Zap size={15} /><strong>PhiBus-Mesh</strong></Stack>,
      'Event Distribution',
      <ProgressBar value={0.99} intent="success" />,
      <Tag intent="success" round>Resonant</Tag>,
      <Button variant="outline" size="sm" onClick={() => setInspectorOpen(true)}>Inspect</Button>,
    ],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--phi-color-background)' }}>
      {/* 1. Palantir Blueprint Style Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '56px',
          borderBottom: '1px solid var(--phi-color-border)',
          backgroundColor: 'var(--phi-color-background-card)',
        }}
      >
        <Stack direction="row" gap={3} align="center">
          <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--phi-color-primary)' }}>Φ</span> PUI Enterprise Cockpit
          </div>
          <Tag intent="primary" minimal>Blueprint v6</Tag>
        </Stack>

        <Stack direction="row" gap={3} align="center">
          <Input placeholder="Search entities, agents, axioms..." icon={<Search size={14} />} style={{ width: '280px' }} />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            icon={isDark ? <Sun size={14} /> : <Moon size={14} />}
          >
            {isDark ? 'Light' : 'Dark'}
          </Button>

          <Select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            style={{ width: '150px' }}
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </Select>
        </Stack>
      </header>

      {/* 2. Main Workbench Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', flex: 1 }}>
        {/* Sidebar Navigation */}
        <aside
          style={{
            borderRight: '1px solid var(--phi-color-border)',
            backgroundColor: 'var(--phi-color-background-secondary)',
            padding: '16px',
          }}
        >
          <Title level={6} style={{ marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--phi-color-text-muted)' }}>
            System Hierarchy
          </Title>
          <Tree
            nodes={treeNodes}
            onNodeClick={(node) => setSelectedNode(String(node.id))}
          />
        </aside>

        {/* Operational View */}
        <main style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Status Callouts */}
          <Callout intent="primary" title="Palantir Foundry / Blueprint Decoupled Standard">
            All UI components shown here render pure, state-agnostic primitives with zero business logic coupling.
          </Callout>

          {/* Operational Metrics Grid */}
          <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={3}>
            <Card elevation={1}>
              <Text variant="xs" color="secondary" weight="semibold">TOTAL ACTIVE AGENTS</Text>
              <Title level={3} style={{ margin: '8px 0 4px 0' }}>15 Swarms</Title>
              <Tag intent="success" minimal>+3 Synchronized</Tag>
            </Card>

            <Card elevation={1}>
              <Text variant="xs" color="secondary" weight="semibold">PHASE MANIFOLD RESONANCE</Text>
              <Title level={3} style={{ margin: '8px 0 4px 0' }}>r = 0.984</Title>
              <Tag intent="primary" minimal>Harmonic Lock</Tag>
            </Card>

            <Card elevation={1}>
              <Text variant="xs" color="secondary" weight="semibold">AXIOMATIC MORPHISMS</Text>
              <Title level={3} style={{ margin: '8px 0 4px 0' }}>14 Modules</Title>
              <Tag intent="info" minimal>100% Type-Safe</Tag>
            </Card>

            <Card elevation={1}>
              <Text variant="xs" color="secondary" weight="semibold">MEMORY OCTAVE CONTINUUM</Text>
              <Title level={3} style={{ margin: '8px 0 4px 0' }}>16 Layers</Title>
              <Tag intent="warning" minimal>Surface to Deep</Tag>
            </Card>
          </Grid>

          {/* Data Table of Agent Swarms */}
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

            <Table headers={tableHeaders} rows={tableRows} />
          </Card>
        </main>
      </div>

      {/* Inspector Drawer */}
      <Drawer
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        title="Agent Telemetry & Properties"
        position="right"
      >
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
