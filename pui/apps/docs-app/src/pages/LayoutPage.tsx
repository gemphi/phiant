import React from 'react';
import { PageHeader, Showcase, PropsTable } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Container, Row, Col, Grid, Stack, Text, Sticky, Navbar, NavbarSection, NavbarItem, FullMode, Button } from '@phi/pui';
import styles from './pages.module.scss';

/* ---------- Container demos ---------- */

const ContainerDemos = () => (
  <>
    <Container size="xs" className={styles.demoBorderBottom}><small>xs — max-width: 576px</small></Container>
    <Container size="sm" className={styles.demoBorderBottom}><small>sm — max-width: 640px</small></Container>
    <Container size="md" className={styles.demoBorderBottom}><small>md — max-width: 768px</small></Container>
    <Container size="lg" className={styles.demoBorderBottom}><small>lg — max-width: 1024px</small></Container>
    <Container size="xl" className={styles.demoBorder}><small>xl — max-width: 1280px</small></Container>
  </>
);

/* ---------- Grid demos ---------- */

const GridDemos = () => (
  <>
    <Row>
      <Col xs={12} sm={6} lg={4} xl={3} className={styles.demoColPrimary}><small>xs=12 sm=6 lg=4 xl=3</small></Col>
      <Col xs={12} sm={6} lg={8} xl={9} className={styles.demoColInfo}><small>xs=12 sm=6 lg=8 xl=9</small></Col>
    </Row>
    <Row>
      {Array.from({ length: 4 }).map((_, i) => (
        <Col key={i} xs={12} sm={6} md={4} lg={3} className={styles.demoCol}><small>Card {i + 1}</small></Col>
      ))}
    </Row>
  </>
);

/* ---------- Navbar demos ---------- */

const NavbarDemos = () => (
  <>
    <Navbar sticky variant="default" height={48}>
      <NavbarSection align="start">
        <NavbarItem active>Home</NavbarItem>
        <NavbarItem>Products</NavbarItem>
        <NavbarItem>About</NavbarItem>
      </NavbarSection>
      <NavbarSection align="end"><NavbarItem href="#">Login</NavbarItem></NavbarSection>
    </Navbar>
    <Navbar variant="transparent" height={48}>
      <NavbarSection align="start"><NavbarItem>Transparent</NavbarItem><NavbarItem>Nav</NavbarItem></NavbarSection>
      <NavbarSection align="end"><NavbarItem>Right</NavbarItem></NavbarSection>
    </Navbar>
    <Navbar variant="solid" height={48}>
      <NavbarSection align="start"><NavbarItem>Solid</NavbarItem><NavbarItem>Nav</NavbarItem></NavbarSection>
      <NavbarSection align="end"><NavbarItem>Right</NavbarItem></NavbarSection>
    </Navbar>
  </>
);

/* ---------- FullMode demo ---------- */

const FullModeDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Full Mode</Button>
      <FullMode isOpen={open} onClose={() => setOpen(false)} title="Full Mode Demo" subtitle="This takes over the entire screen with a back control">
        <Stack direction="column" gap={4}>
          <Text>FullMode uses a portal to render above everything. It has a header with a back button, a scrollable body, and an optional footer.</Text>
          <Grid cols={3} gap={3}>
            <div className={styles.demoCol}>Card 1</div>
            <div className={styles.demoCol}>Card 2</div>
            <div className={styles.demoCol}>Card 3</div>
          </Grid>
        </Stack>
      </FullMode>
    </>
  );
};

/* ---------- Main page ---------- */

export default function LayoutPage() {
  return (
    <PageShell>
      <PageHeader title="Layout" description="Responsive layout components: Container, Row, Col, Grid, Stack, Page, Sticky, Navbar, FullMode — with breakpoint props (xs, sm, md, lg, xl)" />

      <Showcase id="container" title="Container" description="Size-constrained centered containers">
        <ContainerDemos />
      </Showcase>
      <PropsTable rows={[
        { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"', default: '—', description: 'Maximum width' },
        { name: 'fluid', type: 'boolean', default: 'false', description: 'Removes max-width constraint' },
      ]} />

      <Showcase id="grid" title="Row & Col — Responsive 12-Column Grid" description="Paragon-style responsive props: xs, sm, md, lg, xl. Resize the browser to see columns adapt.">
        <GridDemos />
      </Showcase>
      <PropsTable rows={[
        { name: 'xs', type: 'number | boolean | "auto" | { span?, offset?, order? }', default: '—', description: 'Column width at xs breakpoint (0px+)' },
        { name: 'sm', type: 'ColSpec', default: '—', description: 'Column width at sm breakpoint (576px+)' },
        { name: 'md', type: 'ColSpec', default: '—', description: 'Column width at md breakpoint (768px+)' },
        { name: 'lg', type: 'ColSpec', default: '—', description: 'Column width at lg breakpoint (992px+)' },
        { name: 'xl', type: 'ColSpec', default: '—', description: 'Column width at xl breakpoint (1200px+)' },
        { name: 'offset', type: 'number', default: '—', description: 'Offset columns (via object form)' },
        { name: 'order', type: 'number | "first" | "last"', default: '—', description: 'Reorder columns (via object form)' },
      ]} />

      <Showcase id="row" title="Row — cols prop" description="Equal-width columns via row-cols">
        <Row xs={2} sm={3} lg={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i} className={styles.demoColSmall}><small>Col {i + 1}</small></Col>
          ))}
        </Row>
      </Showcase>

      <Showcase id="col" title="Col — offset and order" description="Object form for span, offset, and order">
        <Row>
          <Col xs={{ span: 6, offset: 3 }} className={styles.demoColPrimary}><small>span=6 offset=3 (centered)</small></Col>
        </Row>
        <Row>
          <Col xs={{ span: 3, order: 'last' }} className={styles.demoColWarning}><small>order=last</small></Col>
          <Col xs={{ span: 3, order: 1 }} className={styles.demoColSuccess}><small>order=1</small></Col>
          <Col xs={{ span: 3, order: 2 }} className={styles.demoColInfo}><small>order=2</small></Col>
        </Row>
      </Showcase>

      <Showcase title="Grid — Responsive columns" description="CSS Grid with responsive column counts">
        <Grid xs={1} sm={2} lg={3} gap={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i} className={styles.demoGridItem}><small>Grid item {i + 1}</small></Col>
          ))}
        </Grid>
      </Showcase>
      <PropsTable rows={[
        { name: 'columns', type: 'number', default: '—', description: 'Fixed column count' },
        { name: 'xs', type: 'number', default: '—', description: 'Columns at xs breakpoint' },
        { name: 'sm', type: 'number', default: '—', description: 'Columns at sm breakpoint' },
        { name: 'md', type: 'number', default: '—', description: 'Columns at md breakpoint' },
        { name: 'lg', type: 'number', default: '—', description: 'Columns at lg breakpoint' },
        { name: 'xl', type: 'number', default: '—', description: 'Columns at xl breakpoint' },
        { name: 'gap', type: '1 | 2 | 3 | 4 | 6 | 8', default: '4', description: 'Gap between grid items' },
      ]} />

      <Showcase id="stack" title="Stack" description="Vertical and horizontal stacking with gap">
        <Stack direction="column" gap={2}>
          <Text className={styles.demoStackItem}>Item 1</Text>
          <Text className={styles.demoStackItem}>Item 2</Text>
          <Text className={styles.demoStackItem}>Item 3</Text>
        </Stack>
        <Stack direction="row" gap={2}>
          <Text className={styles.demoStackItemInfo}>A</Text>
          <Text className={styles.demoStackItemInfo}>B</Text>
          <Text className={styles.demoStackItemInfo}>C</Text>
        </Stack>
      </Showcase>

      <Showcase title="Navbar" description="Sticky navigation bar with sections and items.">
        <NavbarDemos />
      </Showcase>
      <PropsTable rows={[
        { name: 'sticky', type: 'boolean', default: 'false', description: 'Makes the navbar sticky' },
        { name: 'position', type: '"top" | "bottom"', default: '"top"', description: 'Navbar position' },
        { name: 'variant', type: '"default" | "transparent" | "solid"', default: '"default"', description: 'Visual variant' },
        { name: 'height', type: 'number', default: '56', description: 'Height in pixels' },
      ]} />

      <Showcase title="Sticky" description="Wrapper that makes any content sticky at a given top/bottom offset">
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--phi-color-border)', borderRadius: 'var(--phi-radius-md)' }}>
          <div style={{ padding: '1rem' }}>
            <p>Scroll down to see the sticky element stay in place.</p>
            <div style={{ height: '100px' }} />
            <Sticky top={0}>
              <div style={{ background: 'var(--phi-color-primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: 'var(--phi-radius-md)' }}>
                I am sticky at top: 0
              </div>
            </Sticky>
            <div style={{ height: '200px' }} />
            <p>More content below...</p>
          </div>
        </div>
      </Showcase>
      <PropsTable rows={[
        { name: 'top', type: 'number', default: '—', description: 'Top offset in pixels' },
        { name: 'bottom', type: 'number', default: '—', description: 'Bottom offset in pixels' },
        { name: 'offset', type: 'number', default: '0', description: 'Additional offset' },
        { name: 'zIndex', type: 'number', default: '100', description: 'Z-index for stacking context' },
      ]} />

      <Showcase title="FullMode" description="Full-screen takeover with back button, theme gradients, and scrollable content area">
        <FullModeDemo />
      </Showcase>
      <PropsTable rows={[
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controls visibility' },
        { name: 'onClose', type: '() => void', default: '—', description: 'Callback when back/close is clicked' },
        { name: 'title', type: 'string', default: '—', description: 'Title shown in header' },
        { name: 'subtitle', type: 'string', default: '—', description: 'Subtitle shown below title' },
        { name: 'footer', type: 'ReactNode', default: '—', description: 'Optional footer content' },
      ]} />
    </PageShell>
  );
}
