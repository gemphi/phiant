'use client';

import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Callout,
  Tag,
  Badge,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Slider,
  FormGroup,
  Dialog,
  Drawer,
  Alert,
  NonIdealState,
  ProgressBar,
  Spinner,
  Skeleton,
  Table,
  Tree,
  TreeNode,
  Navbar,
  Tabs,
  Breadcrumbs,
  Stack,
  Grid,
  Title,
  Text,
  Divider,
} from '@phient/pui';
import { Play, Database, Layers, GitBranch, Terminal, Shield, Sparkles, Folder, FileCode, CheckCircle2 } from 'lucide-react';

export const CoreExamples: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('agent-1');
  const [switchVal, setSwitchVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [activeTab, setActiveTab] = useState('overview');

  const treeNodes: TreeNode[] = [
    {
      id: 'phiadk',
      label: 'phiadk (Core SDK)',
      icon: <Folder size={16} className="text-amber-500" />,
      isExpanded: true,
      childNodes: [
        { id: 'agents', label: 'agents/', childNodes: [
          { id: 'phigen', label: 'phigen.ts (LLM Code Generation)', icon: <FileCode size={14} /> },
          { id: 'phirag', label: 'phirag.ts (Vector Manifold RAG)', icon: <FileCode size={14} /> },
          { id: 'phibus', label: 'phibus.ts (Event Mesh)', icon: <FileCode size={14} /> },
        ]},
        { id: 'ontologies', label: 'ontologies/', childNodes: [
          { id: 'object', label: 'object.py (Entity Schema)', icon: <FileCode size={14} /> },
          { id: 'action', label: 'action.py (Action Type)', icon: <FileCode size={14} /> },
          { id: 'query', label: 'query.py (Axiomatic Topos)', icon: <FileCode size={14} /> },
        ]},
      ],
    },
    {
      id: 'pui',
      label: 'pui (Design System)',
      icon: <Layers size={16} className="text-blue-500" />,
      isExpanded: true,
      childNodes: [
        { id: 'primitives', label: 'primitives/ (Button, Tag, Callout)' },
        { id: 'data-display', label: 'data-display/ (Tree, Table, Card)' },
        { id: 'overlays', label: 'overlays/ (Dialog, Drawer, Toast)' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      {/* 1. Buttons & Tags */}
      <Card elevation={1}>
        <Title level={4}>Buttons, Button Groups & Tags (Blueprint Standard)</Title>
        <Text variant="sm" color="secondary" style={{ marginBottom: '16px' }}>
          Pure interactive primitives with intent states, sizes, and minimal styling.
        </Text>
        <Stack direction="row" gap={3} align="center" wrap="wrap">
          <Button variant="primary" icon={<Play size={14} />}>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger Action</Button>
          <Button variant="ghost">Minimal</Button>
        </Stack>

        <Divider style={{ margin: '16px 0' }} />

        <Stack direction="row" gap={2} align="center" wrap="wrap">
          <Tag intent="primary" round>phi-engine: v2.4</Tag>
          <Tag intent="success" icon={<CheckCircle2 size={12} />}>Kuramoto: Synchronized</Tag>
          <Tag intent="warning">Memory Band: Semantic</Tag>
          <Tag intent="error" onRemove={() => alert('Remove tag')}>Ontology Alert</Tag>
          <Tag intent="info" minimal>Fine Structure α ≈ 1/137</Tag>
        </Stack>
      </Card>

      {/* 2. Callouts & Feedback */}
      <Card elevation={1}>
        <Title level={4}>Callouts & Status Banners</Title>
        <Stack direction="column" gap={3}>
          <Callout intent="primary" title="Palantir Foundry Aesthetic">
            Phient UI components are strictly decoupled from application domain data and state services.
          </Callout>
          <Callout intent="success" title="Continuous Phase Convergence">
            Kuramoto coupling order parameter reached harmonic resonance r = 0.984.
          </Callout>
          <Callout intent="warning" title="Decoupled Architecture Notice">
            No shopping carts or domain services exist in the core component library.
          </Callout>
        </Stack>
      </Card>

      {/* 3. Hierarchical Data Tree & Interactive Table */}
      <Grid columns="1fr 1fr" gap={4}>
        <Card elevation={1}>
          <Title level={5} style={{ marginBottom: '12px' }}>Hierarchical Tree View</Title>
          <Tree nodes={treeNodes} onNodeClick={(node) => alert(`Selected: ${node.label}`)} />
        </Card>

        <Card elevation={1}>
          <Title level={5} style={{ marginBottom: '12px' }}>Form Controls & Switches</Title>
          <Stack direction="column" gap={3}>
            <FormGroup label="Agent ID" helperText="Unique identifier in the GemPhi mesh">
              <Input placeholder="e.g. phigen-primary" defaultValue="phigen-alpha" />
            </FormGroup>

            <FormGroup label="Phase Synchronization">
              <Switch
                label="Enable Real-Time Kuramoto Coupling"
                checked={switchVal}
                onChange={(e) => setSwitchVal(e.target.checked)}
              />
            </FormGroup>

            <FormGroup label={`Harmonic Resonance Threshold: ${sliderVal}%`}>
              <Slider
                min={0}
                max={100}
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
              />
            </FormGroup>

            <Stack direction="row" gap={3}>
              <Button variant="primary" onClick={() => setDialogOpen(true)}>Open Modal Dialog</Button>
              <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Slideout Drawer</Button>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      {/* 4. Modal Dialog Example */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Ontology Schema Inspector"
      >
        <div style={{ padding: '16px 0' }}>
          <Text>
            Inspecting the axiomatic Topos definition for domain <strong>FinanceTransaction</strong>.
            All entity properties inherit strict typing and phase invariants.
          </Text>
          <div style={{ marginTop: '16px' }}>
            <ProgressBar value={0.75} intent="primary" />
          </div>
        </div>
      </Dialog>

      {/* 5. Drawer Example */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Agent Telemetry Stream"
        position="right"
      >
        <div style={{ padding: '16px' }}>
          <Title level={6}>Live Phase Telemetry</Title>
          <Text variant="sm" color="secondary">
            Continuous wave buffer energy delta is currently minimal.
          </Text>
        </div>
      </Drawer>
    </div>
  );
};

export default CoreExamples;
