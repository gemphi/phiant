import React from 'react';
import { Drawer, Badge, Title, Text, Stack, Span, Card, CardHeader, CardBody, Divider } from '@phient/pui';
import { PageRenderer, PageStoreProvider, PageOptionsDrawer, usePageStore } from '../../pageData';
import type { PageData } from '../../pageData';
import styles from '../PlayPage.module.scss';

const ThemeVarTable = ({ themeVars }: { themeVars?: Record<string, string> }) => {
  if (!themeVars) return <Text variant="sm">Using default theme tokens</Text>;
  const rows = Object.entries(themeVars).slice(0, 20).map(([key, value]) => (
    <Stack key={key} direction="row" justify="between" className={styles.themeVarRow}>
      <Span variant="sm" className={styles.themeVarKey}>{key}</Span>
      <Span variant="sm" className={styles.themeVarVal}>{value}</Span>
    </Stack>
  ));
  return <Stack direction="column" gap={1}>{rows}</Stack>;
};

const SitePageContent = () => {
  const { pageData, selectPath } = usePageStore();
  return (
    <Stack direction="column" gap={3}>
      <PageRenderer page={pageData} onSelect={selectPath} />
      <Card hoverable={false}>
        <CardHeader><Title variant="h5">Theme Variables</Title></CardHeader>
        <CardBody><ThemeVarTable themeVars={pageData.themeVars} /></CardBody>
      </Card>
    </Stack>
  );
};

type SitePageDrawerProps = {
  page: PageData | null;
  onClose: () => void;
};

export const SitePageDrawer = ({ page, onClose }: SitePageDrawerProps) => {
  if (!page) return null;

  return (
    <PageStoreProvider initialPageData={page}>
      <Drawer
        isOpen
        onClose={onClose}
        title={page.name}
        size="xl"
        footer={
          <Stack direction="row" align="center" justify="between">
            <Badge variant="primary">{page.layoutType}</Badge>
            <Text variant="sm">{page.description}</Text>
          </Stack>
        }
      >
        <SitePageContent />
      </Drawer>
      <PageOptionsDrawer />
    </PageStoreProvider>
  );
};
