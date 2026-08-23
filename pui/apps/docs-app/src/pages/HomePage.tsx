import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Title, Text, Button, Row, Col, Card, CardHeader, CardBody, CardFooter, Stack, Grid } from '@phient/pui';
import { BookOpen, Play, Layers, ArrowRight } from 'lucide-react';
import { CAPABILITIES } from '../datasets';
import styles from './pages.module.scss';

export default function HomePage() {
  return (
    <PageShell>
      <PageHeader
        title="PUIBook"
        description="The first application built with PUI-UI. This is the component play that replaces Storybook — showcasing every PUI component with live demos and prop documentation."
      />

      <Row xs={1} sm={2} lg={3} className={styles.rowGap}>
        <Col className={styles.colGap}>
          <Link to="/" className={styles.linkReset}>
            <Card hoverable>
              <CardHeader>
                <Title variant="h4">Docs mode</Title>
              </CardHeader>
              <CardBody>
                <Text variant="sm" className={styles.textGap}>
                  Read the welcome guide, browse every component category, and inspect prop tables with live examples.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="sm" iconLeft={BookOpen as any}>Open Welcome</Button>
              </CardFooter>
            </Card>
          </Link>
        </Col>
        <Col className={styles.colGap}>
          <Link to="/play" className={styles.linkReset}>
            <Card hoverable>
              <CardHeader>
                <Title variant="h4">Play mode</Title>
              </CardHeader>
              <CardBody>
                <Text variant="sm" className={styles.textGap}>
                  Tweak props in real time and see components react instantly. The fastest way to explore PUI-UI behavior.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="primary" size="sm" iconLeft={Play as any}>Open Play</Button>
              </CardFooter>
            </Card>
          </Link>
        </Col>
        <Col className={styles.colGap}>
          <Link to="/primitives" className={styles.linkReset}>
            <Card hoverable>
              <CardHeader>
                <Title variant="h4">PUI-UI Coverage</Title>
              </CardHeader>
              <CardBody>
                <Text variant="sm" className={styles.textGap}>
                  Every component from the library — primitives, layout, forms, overlays, feedback, navigation, data, media, commerce.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm" iconLeft={Layers as any}>Browse All</Button>
              </CardFooter>
            </Card>
          </Link>
        </Col>
      </Row>

      <Row xs={1}>
        <Col>
          <Title variant="h3" className={styles.titleGap}>Capabilities</Title>
        </Col>
      </Row>
      <Grid xs={1} sm={2} lg={3} gap={4} className={styles.capabilitiesGrid}>
        {CAPABILITIES.map((cap) => (
          <Card key={cap.title} hoverable>
            <CardHeader>
              <Stack direction="row" align="center" gap={2}>
                <Stack direction="row" align="center" justify="center" className={styles.capabilityIcon}>
                  <cap.icon size={20} />
                </Stack>
                <Title variant="h5">{cap.title}</Title>
              </Stack>
            </CardHeader>
            <CardBody>
              <Text variant="sm" className={styles.capabilityDesc}>{cap.description}</Text>
              <Stack direction="column" gap={1}>
                {cap.links.map((link) => (
                  <Link key={link.path} to={link.path} className={styles.capabilityLink}>
                    {link.label} <ArrowRight size={12} />
                  </Link>
                ))}
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </PageShell>
  );
}