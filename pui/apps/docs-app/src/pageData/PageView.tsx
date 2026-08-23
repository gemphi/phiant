import React from 'react';
import { Stack, Span } from '@phi/pui';
import PageShell from '../components/PageShell';
import { PageHeader, Showcase, PropsTable } from '../components/Showcase';
import { PageRenderer } from './PageRenderer';
import { PageStoreProvider } from './PageStore';
import { PageOptionsDrawer } from './PageOptionsDrawer';
import type { ActionHandler } from './actionMap';
import type { PageData } from './types';

/* ---------- Store config ---------- */

export type StoreConfig = {
  /** Toggle inspector selection on rendered components */
  interactive?: boolean;
  /** Show theme variables table after the page */
  showThemeVars?: boolean;
  /** Extra showcases rendered after the page data */
  showcases?: ShowcaseEntry[];
  /** Action handler for component interactions (addToCart, checkout, etc.) */
  onAction?: ActionHandler;
};

export type ShowcaseEntry = {
  id?: string;
  title: string;
  description?: string;
  /** Page data rendered inside the showcase card */
  page: PageData;
  /** Optional props table rows */
  props?: { name: string; type: string; default?: string; description: string }[];
};

/* ---------- Showcase renderer from data ---------- */

const DataShowcase = ({ entry, onAction }: { entry: ShowcaseEntry; onAction?: ActionHandler }) => (
  <Showcase id={entry.id} title={entry.title} description={entry.description}>
    <PageRenderer page={entry.page} onAction={onAction} />
    {entry.props && entry.props.length > 0 && <PropsTable rows={entry.props} />}
  </Showcase>
);

/* ---------- Main PageView ---------- */

type PageViewProps = {
  page: PageData;
  config?: StoreConfig;
  title?: string;
  description?: string;
};

export const PageView = ({ page, config = {}, title, description }: PageViewProps) => {
  const { interactive = false, showThemeVars = false, showcases = [], onAction } = config;

  const headerTitle = title ?? page.name;
  const headerDesc = description ?? page.description;

  const content = (
    <>
      <PageHeader title={headerTitle} description={headerDesc} />
      <PageRenderer page={page} onSelect={interactive ? undefined : undefined} onAction={onAction} />
      {showThemeVars && page.themeVars && (
        <Showcase title="Theme Variables" description="CSS custom properties applied to the page">
          <Stack direction="column" gap={1}>
            {Object.entries(page.themeVars).map(([k, v]) => (
              <Span key={k} variant="sm">{k}: {v}</Span>
            ))}
          </Stack>
        </Showcase>
      )}
      {showcases.map((s) => (
        <DataShowcase key={s.title} entry={s} onAction={onAction} />
      ))}
    </>
  );

  if (!interactive) {
    return <PageShell>{content}</PageShell>;
  }

  return (
    <PageStoreProvider initialPageData={page}>
      <PageShell>
        {content}
      </PageShell>
      <PageOptionsDrawer />
    </PageStoreProvider>
  );
};

export default PageView;
