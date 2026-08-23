import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { Title, Text, Button, Row, Col, Card, CardHeader, CardBody, Badge, Divider, Stack, Grid, Span } from '@phi/pui';
import { Play, Layers, Code, ArrowRight, Sparkles } from 'lucide-react';
import { EXPLORE_CARDS, SPOTLIGHT_ITEMS, CAPABILITIES } from '../datasets';
import styles from './WelcomePage.module.scss';

export default function WelcomePage() {
  return (
    <PageShell className={styles.welcome}>
      <section className={styles.hero}>
        <Stack direction="column" gap={3} className={styles.heroContent}>
          <Badge variant="info" className={styles.heroBadge}>PUI-UI documentation</Badge>
          <Title variant="h1" className={styles.heroTitle}>Welcome to PUIBook</Title>
          <Text variant="lg" className={styles.heroLead}>
            The component play and documentation hub for PUI-UI. Browse every component, interact with live demos, and inspect prop tables — all in one place.
          </Text>
          <Stack direction="row" gap={3} className={styles.heroActions}>
            <Link to="/play">
              <Button variant="primary" size="lg" iconLeft={Play as any}>Open Play</Button>
            </Link>
            <Link to="/overview">
              <Button variant="outline" size="lg" iconLeft={Layers as any}>Browse Components</Button>
            </Link>
          </Stack>
        </Stack>
      </section>

      <section className={styles.explore}>
        <Title variant="h2" className={styles.sectionTitle}>Explore PUI-UI</Title>
        <Row xs={1} sm={2}>
          {EXPLORE_CARDS.map((card) => (
            <Col key={card.title} className={styles.colGap}>
              <Link to={card.link} className={styles.linkReset}>
                <Card hoverable className={styles.exploreCard}>
                  <CardHeader>
                    <Stack direction="row" align="center" justify="center" className={styles.exploreCardIcon}>
                      <card.icon size={24} />
                    </Stack>
                  </CardHeader>
                  <CardBody>
                    <Title variant="h4">{card.title}</Title>
                    <Text variant="sm" className={styles.exploreCardDesc}>{card.description}</Text>
                    <Span className={styles.exploreCardLink}>{card.linkLabel} <ArrowRight size={14} /></Span>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      <section className={styles.spotlight}>
        <Title variant="h2" className={styles.sectionTitle}>Product spotlight</Title>
        <Row xs={1} sm={2}>
          {SPOTLIGHT_ITEMS.map((item) => (
            <Col key={item.title} className={styles.colGap}>
              <Link to={item.link} className={styles.linkReset}>
                <Card hoverable>
                  <CardBody>
                    <Stack direction="row" align="center" justify="between">
                      <Stack direction="column" gap={2}>
                        <Title variant="h5">{item.title}</Title>
                        <Text variant="sm" className={styles.spotlightCardDesc}>{item.description}</Text>
                      </Stack>
                      <ArrowRight size={16} className={styles.spotlightArrow} />
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      <section className={styles.capabilities}>
        <Title variant="h2" className={styles.sectionTitle}>Capabilities</Title>
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
      </section>

      <section className={styles.gettingStarted}>
        <Row xs={1} lg={2}>
          <Col>
            <Card className={styles.gsCard}>
              <CardHeader className={styles.gsHeader}>
                <Stack direction="row" align="center" justify="center" className={styles.featureIcon}>
                  <Sparkles size={20} />
                </Stack>
                <Title variant="h3">Getting started</Title>
              </CardHeader>
              <CardBody>
                <Text variant="default">
                  PUIBook consumes PUI-UI as a local dependency. Use it as a reference implementation, a design-system smoke test, and a living style guide for every component.
                </Text>
                <Divider className={styles.gsDivider} />
                <Title variant="h5">Install PUI-UI in your app</Title>
                <Stack direction="row" className={styles.codeBlock}>
                  <code>npm install @phi/pui</code>
                </Stack>
                <Text variant="sm" className={styles.gsHint}>
                  Wrap your application in <code>PuiProvider</code> and import the components you need. PUIBook demonstrates every available prop and pattern.
                </Text>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className={styles.gsCard}>
              <CardHeader className={styles.gsHeader}>
                <Stack direction="row" align="center" justify="center" className={styles.featureIcon}>
                  <Code size={20} />
                </Stack>
                <Title variant="h3">Quick links</Title>
              </CardHeader>
              <CardBody>
                <Stack direction="column" gap={1} className={styles.quickLinks}>
                  {CAPABILITIES.map((cap) => (
                    <Link key={cap.title} to={cap.links[0].path} className={styles.quickLink}>
                      {cap.title}
                    </Link>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    </PageShell>
  );
}