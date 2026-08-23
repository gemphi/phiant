import React from 'react';
import { PageHeader, Showcase, PropsTable } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Button, Badge, Title, Text, Span, Divider, Icon, Row, Col, Stack } from '@phient/pui';
import { Check, X, AlertCircle, Info, Star, Heart } from 'lucide-react';

export default function PrimitivesPage() {
  return (
    <PageShell>
      <PageHeader
        title="Primitives"
        description="Foundational building blocks: Button, Badge, Title, Text, Span, Divider, Icon"
      />

      <Showcase title="Button" description="Variants, sizes, and states">
        <Stack direction="row" gap={2} wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="icon" iconLeft={Check as any} />
          <Button variant="primary" loading>Loading</Button>
        </Stack>
        <Stack direction="row" gap={2} wrap>
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
        </Stack>
        <Stack direction="row" gap={2} wrap>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </Stack>
      </Showcase>
      <PropsTable rows={[
        { name: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "danger" | "success"', default: '"primary"', description: 'Visual style' },
        { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
        { name: 'onClick', type: '() => void', default: '—', description: 'Click handler' },
      ]} />

      <Showcase title="Badge" description="Status and label indicators">
        <Stack direction="row" gap={2} wrap>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="count">Count</Badge>
        </Stack>
      </Showcase>

      <Showcase title="Title" description="Heading levels h1–h6">
        <Title variant="h1">H1 Heading</Title>
        <Title variant="h2">H2 Heading</Title>
        <Title variant="h3">H3 Heading</Title>
        <Title variant="h4">H4 Heading</Title>
        <Title variant="h5">H5 Heading</Title>
        <Title variant="h6">H6 Heading</Title>
      </Showcase>

      <Showcase title="Text" description="Body text variants">
        <Text variant="default">Default text — lorem ipsum dolor sit amet</Text>
        <Text variant="sm">Small text — lorem ipsum dolor sit amet</Text>
        <Text variant="lg">Large text — lorem ipsum dolor sit amet</Text>
        <Text variant="muted">Muted text — lorem ipsum dolor sit amet</Text>
        <Text variant="label">Label text — lorem ipsum dolor sit amet</Text>
        <Text center>Centered text</Text>
      </Showcase>

      <Showcase title="Span" description="Inline text with variants">
        <Stack direction="row" gap={2} align="center" wrap>
          <Span variant="default">Default span</Span>
          <Span variant="bold">Bold span</Span>
          <Span variant="muted">Muted span</Span>
          <Span variant="sm">Small span</Span>
        </Stack>
      </Showcase>

      <Showcase title="Divider" description="Horizontal and vertical separators">
        <Stack direction="column" gap={2}>
          <Text>Above divider</Text>
          <Divider />
          <Text>Below divider</Text>
        </Stack>
      </Showcase>

      <Showcase title="Icon" description="Lucide icons with hover and rotation">
        <Row xs={3} sm={4} lg={7} gap={4} align="center">
          <Col><Icon name={Check as any} /></Col>
          <Col><Icon name={X as any} /></Col>
          <Col><Icon name={AlertCircle as any} /></Col>
          <Col><Icon name={Info as any} /></Col>
          <Col><Icon name={Star as any} /></Col>
          <Col><Icon name={Heart as any} size="lg" /></Col>
          <Col><Icon name={Check as any} size="xl" /></Col>
        </Row>
      </Showcase>
    </PageShell>
  );
}
