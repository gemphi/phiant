'use client';

import React from 'react';
import {
  Button,
  Card,
  Callout,
  Tag,
  Badge,
  Stack,
  Grid,
  Title,
  Text,
  Divider,
  usePuiTheme,
} from '@phi/pui';
import {
  Layers,
  Sparkles,
  Shield,
  Zap,
  Terminal,
  ArrowRight,
  Code2,
  CheckCircle,
  Sun,
  Moon,
} from 'lucide-react';

export default function App() {
  const { theme, setTheme, isDark } = usePuiTheme();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--phi-color-background)', color: 'var(--phi-color-text-primary)' }}>
      {/* Navigation */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          borderBottom: '1px solid var(--phi-color-border)',
        }}
      >
        <Stack direction="row" gap={3} align="center">
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--phi-color-primary)' }}>Φ</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Phient UI (PUI)</span>
          <Tag intent="primary" round>Palantir Blueprint Parity</Tag>
        </Stack>

        <Stack direction="row" gap={3} align="center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            icon={isDark ? <Sun size={14} /> : <Moon size={14} />}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button variant="primary" size="sm" icon={<Code2 size={14} />}>
            GitHub Repository
          </Button>
        </Stack>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 32px 60px 32px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <Tag intent="primary" minimal style={{ marginBottom: '16px' }}>
          INDUSTRIAL DESIGN SYSTEM FOR REACT 18 & 19
        </Tag>
        <Title level={1} style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.03em' }}>
          Complex UI Primitives.<br />
          <span style={{ background: 'var(--phi-brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Zero Domain Coupling.
          </span>
        </Title>
        <Text variant="lg" color="secondary" style={{ maxWidth: '640px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
          Phient UI (PUI) delivers Palantir Blueprint-grade trees, tables, dialogs, drawers, callouts, and multi-brand themes with strict state decoupling.
        </Text>

        <Stack direction="row" gap={3} justify="center">
          <Button variant="primary" size="lg" icon={<ArrowRight size={16} />}>
            Explore Workbench
          </Button>
          <Button variant="outline" size="lg">
            Read Architecture
          </Button>
        </Stack>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 32px 80px 32px', maxWidth: '1100px', margin: '0 auto' }}>
        <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          <Card elevation={2}>
            <Layers size={24} style={{ color: 'var(--phi-color-primary)', marginBottom: '12px' }} />
            <Title level={4} style={{ marginBottom: '8px' }}>Palantir Blueprint Model</Title>
            <Text variant="sm" color="secondary">
              Pure primitives: Tree, HTMLTable, Dialog, Drawer, NonIdealState, Tag, Callout, Switch, and Slider designed for dense enterprise apps.
            </Text>
          </Card>

          <Card elevation={2}>
            <Shield size={24} style={{ color: 'var(--phi-color-success)', marginBottom: '12px' }} />
            <Title level={4} style={{ marginBottom: '8px' }}>Zero Business Coupling</Title>
            <Text variant="sm" color="secondary">
              Strictly decoupled. No shopping carts or domain services mixed into the core UI library. Props flow down, callbacks flow up.
            </Text>
          </Card>

          <Card elevation={2}>
            <Sparkles size={24} style={{ color: 'var(--phi-color-warning)', marginBottom: '12px' }} />
            <Title level={4} style={{ marginBottom: '8px' }}>Multi-Brand Theming</Title>
            <Text variant="sm" color="secondary">
              Foundry Blue, Blueprint Slate, Emerald, Midnight, and Amber palettes with instant light/dark switching and flat/glass surface modes.
            </Text>
          </Card>
        </Grid>
      </section>
    </div>
  );
}
