import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Modal, Drawer, Toast, Tooltip, Popover, Button, Row, Col, Stack, Text } from '@phi/pui';
import styles from './pages.module.scss';

export default function OverlaysPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSize, setModalSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerPos, setDrawerPos] = React.useState<'left' | 'right'>('right');
  const [drawerSize, setDrawerSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastVariant, setToastVariant] = React.useState<'success' | 'warning' | 'error' | 'info'>('success');

  const openModal = (size: typeof modalSize) => { setModalSize(size); setModalOpen(true); };
  const openDrawer = (pos: typeof drawerPos, size: typeof drawerSize) => { setDrawerPos(pos); setDrawerSize(size); setDrawerOpen(true); };
  const openToast = (variant: typeof toastVariant) => { setToastVariant(variant); setToastVisible(true); };

  return (
    <PageShell>
      <PageHeader
        title="Overlays"
        description="Modal, Drawer, Toast, Tooltip — portal-based overlay components with animations"
      />

      <Showcase title="Modal" description="Dialog overlay with sizes (sm, md, lg, xl). Animated with fade + scale.">
        <Row xs={2} sm={4} gap={2}>
          <Col><Button variant="outline" onClick={() => openModal('sm')}>Small</Button></Col>
          <Col><Button variant="outline" onClick={() => openModal('md')}>Medium</Button></Col>
          <Col><Button variant="outline" onClick={() => openModal('lg')}>Large</Button></Col>
          <Col><Button variant="outline" onClick={() => openModal('xl')}>X-Large</Button></Col>
        </Row>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Modal — ${modalSize.toUpperCase()}`} size={modalSize}
          footer={<Stack direction="row" gap={2} justify="end"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button></Stack>}>
          <p>This is modal content in the <strong>{modalSize}</strong> size. Click outside or the X button to close.</p>
        </Modal>
      </Showcase>

      <Showcase title="Drawer" description="Side panel overlay (left/right positions, sm/md/lg/xl sizes). Animated slide-in.">
        <Row xs={1} sm={2} gap={2}>
          <Col>
            <Stack direction="column" gap={2}>
              <Text variant="sm">Right Drawer</Text>
              <Row xs={2} sm={4} gap={2}>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('right', 'sm')}>R-SM</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('right', 'md')}>R-MD</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('right', 'lg')}>R-LG</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('right', 'xl')}>R-XL</Button></Col>
              </Row>
            </Stack>
          </Col>
          <Col>
            <Stack direction="column" gap={2}>
              <Text variant="sm">Left Drawer</Text>
              <Row xs={2} sm={4} gap={2}>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('left', 'sm')}>L-SM</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('left', 'md')}>L-MD</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('left', 'lg')}>L-LG</Button></Col>
                <Col><Button variant="outline" size="sm" onClick={() => openDrawer('left', 'xl')}>L-XL</Button></Col>
              </Row>
            </Stack>
          </Col>
        </Row>
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Drawer — ${drawerPos} ${drawerSize.toUpperCase()}`} position={drawerPos} size={drawerSize}
          footer={<Button variant="primary" onClick={() => setDrawerOpen(false)}>Close</Button>}>
          <p>This drawer slides in from the <strong>{drawerPos}</strong> in <strong>{drawerSize}</strong> size.</p>
        </Drawer>
      </Showcase>

      <Showcase title="Toast" description="Temporary notification (success, warning, error, info). Animated slide-in from right.">
        <Row xs={2} sm={4} gap={2}>
          <Col><Button variant="primary" onClick={() => openToast('success')}>Success</Button></Col>
          <Col><Button variant="primary" onClick={() => openToast('warning')}>Warning</Button></Col>
          <Col><Button variant="primary" onClick={() => openToast('error')}>Error</Button></Col>
          <Col><Button variant="primary" onClick={() => openToast('info')}>Info</Button></Col>
        </Row>
        {toastVisible && (
          <Toast message={`${toastVariant} toast notification!`} variant={toastVariant} onClose={() => setToastVisible(false)} />
        )}
      </Showcase>

      <Showcase title="Tooltip" description="Hover tooltip (top, bottom, left, right positions)">
        <Row xs={1} sm={2} lg={4} gap={4} className={styles.demoTooltipWrap}>
          <Col><Tooltip content="Tooltip on top" position="top"><Button variant="outline">Hover me (top)</Button></Tooltip></Col>
          <Col><Tooltip content="Tooltip on bottom" position="bottom"><Button variant="outline">Hover me (bottom)</Button></Tooltip></Col>
          <Col><Tooltip content="Tooltip on left" position="left"><Button variant="outline">Hover me (left)</Button></Tooltip></Col>
          <Col><Tooltip content="Tooltip on right" position="right"><Button variant="outline">Hover me (right)</Button></Tooltip></Col>
        </Row>
      </Showcase>

      <Showcase title="Popover" description="Click-triggered popover with placement options (bottom-start, bottom-end, top-start, top-end)">
        <Row xs={1} sm={2} lg={4} gap={4}>
          <Col>
            <Popover trigger={<Button variant="outline">Bottom Start</Button>} placement="bottom-start">
              <Text variant="sm">Popover content at bottom-start</Text>
            </Popover>
          </Col>
          <Col>
            <Popover trigger={<Button variant="outline">Bottom End</Button>} placement="bottom-end">
              <Text variant="sm">Popover content at bottom-end</Text>
            </Popover>
          </Col>
          <Col>
            <Popover trigger={<Button variant="outline">Top Start</Button>} placement="top-start">
              <Text variant="sm">Popover content at top-start</Text>
            </Popover>
          </Col>
          <Col>
            <Popover trigger={<Button variant="outline">Top End</Button>} placement="top-end">
              <Text variant="sm">Popover content at top-end</Text>
            </Popover>
          </Col>
        </Row>
      </Showcase>
    </PageShell>
  );
}
