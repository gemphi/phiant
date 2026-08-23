import React from 'react';
import { Title, Text, Divider, Stack, Card, CardBody } from '@phient/pui';
import { Selectable } from './inspector';
import styles from './Showcase.module.scss';

type ShowcaseProps = {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const Showcase = ({ id, title, description, children }: ShowcaseProps) => {
  const sectionId = id ?? title.toLowerCase().replace(/\s+/g, '-');
  return (
    <Selectable tag="Showcase" label={title}>
      <section id={sectionId} className={styles.showcase}>
        <Title variant="h3" className={styles.title}>{title}</Title>
        {description && <Text variant="sm" className={styles.desc}>{description}</Text>}
        <Card hoverable={false} className={styles.showcaseCard}>
          <CardBody>
            <Stack direction="column" gap={4}>
              {children}
            </Stack>
          </CardBody>
        </Card>
      </section>
    </Selectable>
  );
};

type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type PropsTableProps = {
  rows: PropRow[];
};

export const PropsTable = ({ rows }: PropsTableProps) => (
  <Stack direction="column" className={styles.propsTable}>
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td><code>{row.name}</code></td>
            <td><code>{row.type}</code></td>
            <td>{row.default ? <code>{row.default}</code> : '—'}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Stack>
);

type PageHeaderProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const PageHeader = ({ title, description, children }: PageHeaderProps) => (
  <Selectable tag="PageHeader" label={title}>
    <Stack direction="column" gap={2} className={styles.pageHeader}>
      <Title variant="h1" className={styles.pageTitle}>{title}</Title>
      <Text variant="lg" className={styles.pageDesc}>{description}</Text>
      {children && <Stack direction="column" className={styles.pageExtra}>{children}</Stack>}
      <Divider className={styles.pageDivider} />
    </Stack>
  </Selectable>
);