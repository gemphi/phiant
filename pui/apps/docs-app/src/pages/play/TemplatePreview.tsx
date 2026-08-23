import React from 'react';
import { Card, CardHeader, CardBody, Title, Text, Stack, Span, Badge, Divider, Drawer } from '@phient/pui';
import { PageRenderer, layoutTemplateToPageData } from '../../pageData';
import type { LayoutTemplate as TemplateType } from '../../datasets';
import styles from '../PlayPage.module.scss';

export const TemplatePreview = ({ template }: { template: TemplateType }) => {
  const Icon = template.icon;
  return (
    <Card hoverable className={styles.templateCard}>
      <CardHeader>
        <Stack direction="row" align="center" gap={2}>
          <span className={styles.templateIcon} style={{ background: template.themeVars?.['--phi-icon-gradient'] ?? 'var(--phi-icon-gradient)' }}>
            <Icon size={20} color="#fff" />
          </span>
          <Title variant="h5">{template.name}</Title>
        </Stack>
      </CardHeader>
      <CardBody>
        <Text variant="sm">{template.description}</Text>
        <Divider />
        <Stack direction="column" gap={1}>
          {template.sections.map((section) => (
            <Stack key={section.id} direction="row" align="center" justify="between" className={styles.sectionRow}>
              <Span variant="sm">{section.name}</Span>
              <Badge variant="secondary">{section.layout}{section.cols ? ` x${section.cols}` : ''}</Badge>
            </Stack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

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

type TemplateDrawerProps = {
  template: TemplateType | null;
  onClose: () => void;
};

export const TemplateDrawer = ({ template, onClose }: TemplateDrawerProps) => {
  const pageData = React.useMemo(() => template ? layoutTemplateToPageData(template) : null, [template]);

  if (!template || !pageData) return null;

  const Icon = template.icon;

  return (
    <Drawer
      isOpen
      onClose={onClose}
      title={template.name}
      size="xl"
      footer={
        <Stack direction="row" align="center" justify="between">
          <Badge variant="primary">{template.category}</Badge>
          <Text variant="sm">{template.description}</Text>
        </Stack>
      }
    >
      <Stack direction="column" gap={4} style={{ fontFamily: template.themeVars?.['--phi-font-site-active'] ?? 'inherit' }}>
        <Stack direction="row" align="center" gap={2}>
          <span className={styles.templateIconLarge} style={{ background: template.themeVars?.['--phi-icon-gradient'] ?? 'var(--phi-icon-gradient)' }}>
            <Icon size={24} color="#fff" />
          </span>
          <Title variant="h3">{template.name}</Title>
        </Stack>

        <PageRenderer page={pageData} />

        <Card hoverable={false}>
          <CardHeader><Title variant="h5">Theme Variables Applied</Title></CardHeader>
          <CardBody><ThemeVarTable themeVars={template.themeVars} /></CardBody>
        </Card>
      </Stack>
    </Drawer>
  );
};
