import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Spinner, Skeleton, EmptyState, Alert, Button, Row, Col, Stack } from '@phient/pui';
import { PackageSearch } from 'lucide-react';
import styles from './pages.module.scss';

export default function FeedbackPage() {
  return (
    <PageShell>
      <PageHeader
        title="Feedback"
        description="Spinner, Skeleton, EmptyState, Alert — loading and status indicators"
      />

      <Showcase title="Spinner" description="Loading spinner with sizes (sm, md, lg)">
        <Row xs={2} sm={4} gap={4} align="center">
          <Col><Spinner size="sm" /></Col>
          <Col><Spinner size="md" /></Col>
          <Col><Spinner size="lg" /></Col>
          <Col><Spinner size="md" label="Loading data..." /></Col>
        </Row>
      </Showcase>

      <Showcase title="Skeleton" description="Placeholder loading state">
        <Row xs={1} gap={4}>
          <Col>
            <Row xs={1} sm={2} gap={4} align="center">
              <Col xs="auto"><Skeleton circle width={48} height={48} /></Col>
              <Col>
                <Stack direction="column" gap={2} className={styles.demoFlex}>
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="40%" height={12} />
                </Stack>
              </Col>
            </Row>
          </Col>
        </Row>
        <Skeleton width="100%" height={200} />
      </Showcase>

      <Showcase title="EmptyState" description="No data placeholder with icon, title, description, and action">
        <EmptyState
          icon={PackageSearch as any}
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<Button variant="primary">Browse all products</Button>}
        />
      </Showcase>

      <Showcase title="Alert" description="Dismissible alert banners (success, warning, error, info)">
        <Alert variant="success">Your changes have been saved successfully.</Alert>
        <Alert variant="warning">Your subscription expires in 3 days.</Alert>
        <Alert variant="error">Failed to save changes. Please try again.</Alert>
        <Alert variant="info">A new version of the app is available.</Alert>
        <Alert variant="info" dismissible onDismiss={() => {}}>
          This alert can be dismissed.
        </Alert>
      </Showcase>
    </PageShell>
  );
}
