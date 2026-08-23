import React from 'react';
import { PageHeader } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Play } from '../components/Play';
import { Title, Text, Stack, Grid, Card, CardHeader, CardBody, Badge, Button, Divider, Span } from '@phi/pui';
import { Play as PlayIcon, LayoutTemplate, Globe, Component } from 'lucide-react';
import { LAYOUT_TEMPLATES, type LayoutTemplate as TemplateType } from '../datasets';
import { ALL_SITES } from '../pageData/sites';
import type { SiteDefinition } from '../pageData/types';
import type { PageData } from '../pageData';
import { COMPONENTS } from './play/playComponents';
import { TemplatePreview, TemplateDrawer } from './play/TemplatePreview';
import { SitePageDrawer } from './play/SitePageCanvas';
import styles from './PlayPage.module.scss';

/* ---------- Site card ---------- */

const SiteCard = ({ site, onClick }: { site: SiteDefinition; onClick: () => void }) => (
  <div onClick={onClick} className={styles.templateWrapper}>
    <Card hoverable>
      <CardHeader><Title variant="h5">{site.name}</Title></CardHeader>
      <CardBody><Text variant="sm">{site.description}</Text></CardBody>
    </Card>
    <Button variant="primary" size="sm" iconLeft={PlayIcon as any} className={styles.playBtn}>Browse</Button>
  </div>
);

/* ---------- Page card ---------- */

const PageCard = ({ page, onClick }: { page: PageData; onClick: () => void }) => (
  <div onClick={onClick} className={styles.templateWrapper}>
    <Card hoverable>
      <CardHeader><Title variant="h5">{page.name}</Title></CardHeader>
      <CardBody><Text variant="sm">{page.description}</Text></CardBody>
    </Card>
    <Button variant="primary" size="sm" iconLeft={PlayIcon as any} className={styles.playBtn}>Open</Button>
  </div>
);

/* ---------- Sites section ---------- */

const SitesSection = ({
  sites, selectedSite, onSelectSite, onSelectPage, onBack,
}: {
  sites: SiteDefinition[];
  selectedSite: SiteDefinition | null;
  onSelectSite: (s: SiteDefinition) => void;
  onSelectPage: (p: PageData) => void;
  onBack: () => void;
}) => {
  if (selectedSite) {
    return (
      <Stack direction="column" gap={2}>
        <Stack direction="row" align="center" gap={2}>
          <Globe size={20} />
          <Title variant="h4">{selectedSite.name} — Pages</Title>
          <Badge variant="count">{selectedSite.pages.length}</Badge>
        </Stack>
        <Text variant="sm">Click a page to open it in the preview drawer with its theme applied.</Text>
        <Grid columns={3} gap={3}>
          {selectedSite.pages.map((p) => (
            <PageCard key={p.id} page={p} onClick={() => onSelectPage(p)} />
          ))}
        </Grid>
        <Button variant="ghost" size="sm" onClick={onBack}>← Back to all sites</Button>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" align="center" gap={2}>
        <Globe size={20} />
        <Title variant="h4">Site Definitions</Title>
        <Badge variant="count">{sites.length}</Badge>
      </Stack>
      <Text variant="sm">Pick a real-world site to browse its pages. Pages open in a drawer with their theme applied.</Text>
      <Grid columns={3} gap={3}>
        {sites.map((s) => <SiteCard key={s.id} site={s} onClick={() => onSelectSite(s)} />)}
      </Grid>
    </Stack>
  );
};

/* ---------- Templates section ---------- */

const TemplatesSection = ({ onSelect }: { onSelect: (t: TemplateType) => void }) => (
  <Stack direction="column" gap={2}>
    <Stack direction="row" align="center" gap={2}>
      <LayoutTemplate size={20} />
      <Title variant="h4">Layout Templates</Title>
      <Badge variant="count">{LAYOUT_TEMPLATES.length}</Badge>
    </Stack>
    <Text variant="sm">Click a template to preview it in a drawer with theme tokens applied.</Text>
    <Grid columns={3} gap={3}>
      {LAYOUT_TEMPLATES.map((t) => (
        <div key={t.id} onClick={() => onSelect(t)} className={styles.templateWrapper}>
          <TemplatePreview template={t} />
          <Button variant="primary" size="sm" iconLeft={PlayIcon as any} className={styles.playBtn}>Preview</Button>
        </div>
      ))}
    </Grid>
  </Stack>
);

/* ---------- Component play section ---------- */

const PlaySection = () => (
  <Stack direction="column" gap={2}>
    <Stack direction="row" align="center" gap={2}>
      <Component size={20} />
      <Title variant="h4">Component Play</Title>
      <Badge variant="count">{COMPONENTS.length}</Badge>
    </Stack>
    <Text variant="sm">Select a component, tweak its props, and see the rendered result and code update instantly.</Text>
    <Play components={COMPONENTS} />
  </Stack>
);

/* ---------- Main page ---------- */

export default function PlayPage() {
  const [drawerTemplate, setDrawerTemplate] = React.useState<TemplateType | null>(null);
  const [drawerPage, setDrawerPage] = React.useState<PageData | null>(null);
  const [selectedSite, setSelectedSite] = React.useState<SiteDefinition | null>(null);

  const handleSelectSite = (s: SiteDefinition) => setSelectedSite(s);
  const handleBackToSites = () => setSelectedSite(null);

  return (
    <PageShell>
      <PageHeader title="Play" description="Browse site pages, preview layout templates, and play with components — all in drawers." />
      <Stack direction="column" gap={4}>
        <SitesSection
          sites={ALL_SITES}
          selectedSite={selectedSite}
          onSelectSite={handleSelectSite}
          onSelectPage={setDrawerPage}
          onBack={handleBackToSites}
        />
        <Divider />
        <TemplatesSection onSelect={setDrawerTemplate} />
        <Divider />
        <PlaySection />
      </Stack>

      <TemplateDrawer template={drawerTemplate} onClose={() => setDrawerTemplate(null)} />
      <SitePageDrawer page={drawerPage} onClose={() => setDrawerPage(null)} />
    </PageShell>
  );
}
