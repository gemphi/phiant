import React from 'react';
import {
  Button, Badge, Title, Text, Divider, Icon, Span,
  Input, Checkbox, Radio, Select, Slider, Stepper, Textarea,
  Stack, Row, Grid, Col, Container,
  Card, CardHeader, CardBody, CardFooter, CardImage,
  Comment, Rating, List, ListItem, Table, Thead, Tbody, Tr, Th, Td,
  Accordion, AccordionItem,
  Alert, Spinner, Skeleton, EmptyState,
  Avatar, Image,
  Breadcrumbs, Link, Menu, MenuItem, MenuChevron, Pagination, TabList, Tabs,
  Tooltip, Popover,
  ProductCard, Price, ItemCard, WishlistList, FilterCard, OrderCard,
} from '@phi/pui';
import {
  Check, Mail, Star, Heart, ShoppingCart, Search, Bell, User,
  ChevronDown, ChevronRight, Plus, Minus, X, Package, Home, Settings,
} from 'lucide-react';
import type { ComponentPlay } from '../../components/Play';

const formatProps = (props: Record<string, string | boolean | number>) =>
  Object.entries(props)
    .filter(([, v]) => v !== false && v !== '')
    .map(([k, v]) => (v === true ? k : typeof v === 'string' ? `${k}="${v}"` : `${k}={${v}}`))
    .join(' ');

type V = Record<string, string | boolean | number>;

export const COMPONENTS: ComponentPlay[] = [
  /* ----------------------------- Primitives ----------------------------- */
  {
    name: 'button', title: 'Button', description: 'Configure variant, size, and states.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'icon'], defaultValue: 'primary' },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
      { name: 'loading', type: 'boolean', label: 'Loading', defaultValue: false },
      { name: 'fullWidth', type: 'boolean', label: 'Full Width', defaultValue: false },
      { name: 'children', type: 'text', label: 'Label', defaultValue: 'Click me' },
    ],
    render: (v: V) => (
      <Button variant={v.variant as any} size={v.size as any} disabled={v.disabled as boolean} loading={v.loading as boolean} fullWidth={v.fullWidth as boolean} iconLeft={v.variant !== 'icon' ? (Check as any) : undefined}>
        {v.variant === 'icon' ? <Check size={16} /> : String(v.children)}
      </Button>
    ),
    code: (v: V) => `<Button${formatProps({ variant: v.variant, size: v.size, disabled: v.disabled, loading: v.loading, fullWidth: v.fullWidth })}>\n  ${v.children}\n</Button>`,
  },
  {
    name: 'badge', title: 'Badge', description: 'Switch between badge variants.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['primary', 'secondary', 'success', 'warning', 'info', 'error', 'count'], defaultValue: 'primary' },
      { name: 'children', type: 'text', label: 'Label', defaultValue: 'Badge' },
    ],
    render: (v: V) => <Badge variant={v.variant as any}>{String(v.children)}</Badge>,
    code: (v: V) => `<Badge${formatProps({ variant: v.variant })}>${v.children}</Badge>`,
  },
  {
    name: 'title', title: 'Title', description: 'Pick a heading level.',
    controls: [
      { name: 'variant', type: 'select', label: 'Level', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], defaultValue: 'h3' },
      { name: 'children', type: 'text', label: 'Text', defaultValue: 'Heading text' },
    ],
    render: (v: V) => <Title variant={v.variant as any}>{String(v.children)}</Title>,
    code: (v: V) => `<Title${formatProps({ variant: v.variant })}>${v.children}</Title>`,
  },
  {
    name: 'text', title: 'Text', description: 'Try body text variants.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'sm', 'lg', 'muted', 'label', 'xs'], defaultValue: 'default' },
      { name: 'center', type: 'boolean', label: 'Center', defaultValue: false },
      { name: 'children', type: 'text', label: 'Content', defaultValue: 'The quick brown fox jumps over the lazy dog.' },
    ],
    render: (v: V) => <Text variant={v.variant as any} center={v.center as boolean}>{String(v.children)}</Text>,
    code: (v: V) => `<Text${formatProps({ variant: v.variant, center: v.center })}>${v.children}</Text>`,
  },
  {
    name: 'divider', title: 'Divider', description: 'Horizontal or vertical separator.',
    controls: [
      { name: 'orientation', type: 'select', label: 'Orientation', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    ],
    render: (v: V) => (
      <Stack direction="row" align="center" gap={2} style={{ height: v.orientation === 'vertical' ? 40 : 'auto' }}>
        <Text variant="sm">Above</Text>
        <Divider orientation={v.orientation as any} />
        <Text variant="sm">Below</Text>
      </Stack>
    ),
    code: (v: V) => `<Divider${formatProps({ orientation: v.orientation })} />`,
  },
  {
    name: 'icon', title: 'Icon', description: 'Render a Lucide icon at a given size.',
    controls: [
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
      { name: 'name', type: 'select', label: 'Icon', options: ['Star', 'Heart', 'Bell', 'User', 'Search'], defaultValue: 'Star' },
    ],
    render: (v: V) => {
      const iconMap: Record<string, any> = { Star, Heart, Bell, User, Search };
      return <Icon name={iconMap[String(v.name)]} size={v.size as any} />;
    },
    code: (v: V) => `<Icon name={${v.name}}${formatProps({ size: v.size })} />`,
  },
  {
    name: 'span', title: 'Span', description: 'Inline text with variant styling.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'bold', 'muted', 'sm'], defaultValue: 'bold' },
      { name: 'children', type: 'text', label: 'Content', defaultValue: 'Inline text' },
    ],
    render: (v: V) => (
      <Text>
        Surrounding text <Span variant={v.variant as any}>{String(v.children)}</Span> continues here.
      </Text>
    ),
    code: (v: V) => `<Span${formatProps({ variant: v.variant })}>${v.children}</Span>`,
  },

  /* ------------------------------- Forms -------------------------------- */
  {
    name: 'input', title: 'Input', description: 'Configure placeholder, value, and error state.',
    controls: [
      { name: 'placeholder', type: 'text', label: 'Placeholder', defaultValue: 'Enter your email' },
      { name: 'value', type: 'text', label: 'Value', defaultValue: '' },
      { name: 'error', type: 'boolean', label: 'Error', defaultValue: false },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Input placeholder={String(v.placeholder)} value={String(v.value)} error={v.error as boolean} disabled={v.disabled as boolean} icon={v.error ? undefined : <Mail size={16} />} onChange={() => {}} />
    ),
    code: (v: V) => `<Input${formatProps({ placeholder: v.placeholder, error: v.error, disabled: v.disabled })} icon={<Mail size={16} />} onChange={() => {}} />`,
  },
  {
    name: 'checkbox', title: 'Checkbox', description: 'Toggle label and error state.',
    controls: [
      { name: 'label', type: 'text', label: 'Label', defaultValue: 'I agree to the terms' },
      { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: true },
      { name: 'error', type: 'boolean', label: 'Error', defaultValue: false },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Checkbox label={String(v.label)} checked={v.checked as boolean} error={v.error as boolean} disabled={v.disabled as boolean} onChange={() => {}} />
    ),
    code: (v: V) => `<Checkbox${formatProps({ checked: v.checked, error: v.error, disabled: v.disabled })} label="${v.label}" onChange={() => {}} />`,
  },
  {
    name: 'radio', title: 'Radio', description: 'Single-choice radio with label.',
    controls: [
      { name: 'label', type: 'text', label: 'Label', defaultValue: 'Standard shipping' },
      { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: true },
      { name: 'error', type: 'boolean', label: 'Error', defaultValue: false },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Radio label={String(v.label)} checked={v.checked as boolean} error={v.error as boolean} disabled={v.disabled as boolean} onChange={() => {}} name="ship" />
    ),
    code: (v: V) => `<Radio${formatProps({ checked: v.checked, error: v.error, disabled: v.disabled })} label="${v.label}" name="ship" onChange={() => {}} />`,
  },
  {
    name: 'select', title: 'Select', description: 'Dropdown select with error state.',
    controls: [
      { name: 'error', type: 'boolean', label: 'Error', defaultValue: false },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Select error={v.error as boolean} disabled={v.disabled as boolean} defaultValue="md">
        <option value="sm">Small</option>
        <option value="md">Medium</option>
        <option value="lg">Large</option>
      </Select>
    ),
    code: (v: V) => `<Select${formatProps({ error: v.error, disabled: v.disabled })}>\n  <option value="sm">Small</option>\n  <option value="md">Medium</option>\n</Select>`,
  },
  {
    name: 'slider', title: 'Slider', description: 'Range slider with label and value display.',
    controls: [
      { name: 'min', type: 'number', label: 'Min', defaultValue: 0, min: 0, max: 100 },
      { name: 'max', type: 'number', label: 'Max', defaultValue: 100, min: 0, max: 500 },
      { name: 'step', type: 'number', label: 'Step', defaultValue: 1, min: 1, max: 50 },
      { name: 'showValue', type: 'boolean', label: 'Show Value', defaultValue: true },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Slider label="Volume" showValue={v.showValue as boolean} min={v.min as number} max={v.max as number} step={v.step as number} disabled={v.disabled as boolean} defaultValue={50} />
    ),
    code: (v: V) => `<Slider label="Volume"${formatProps({ min: v.min, max: v.max, step: v.step, showValue: v.showValue, disabled: v.disabled })} defaultValue={50} />`,
  },
  {
    name: 'stepper', title: 'Stepper', description: 'Numeric quantity stepper with min/max.',
    controls: [
      { name: 'value', type: 'number', label: 'Value', defaultValue: 3, min: 1, max: 99 },
      { name: 'min', type: 'number', label: 'Min', defaultValue: 1, min: 0, max: 10 },
      { name: 'max', type: 'number', label: 'Max', defaultValue: 99, min: 10, max: 999 },
    ],
    render: (v: V) => <Stepper value={v.value as number} min={v.min as number} max={v.max as number} onChange={() => {}} />,
    code: (v: V) => `<Stepper${formatProps({ value: v.value, min: v.min, max: v.max })} onChange={(value) => setValue(value)} />`,
  },
  {
    name: 'textarea', title: 'Textarea', description: 'Multi-line text input with error state.',
    controls: [
      { name: 'placeholder', type: 'text', label: 'Placeholder', defaultValue: 'Write a message…' },
      { name: 'rows', type: 'number', label: 'Rows', defaultValue: 4, min: 1, max: 20 },
      { name: 'error', type: 'boolean', label: 'Error', defaultValue: false },
      { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
    render: (v: V) => (
      <Textarea placeholder={String(v.placeholder)} rows={v.rows as number} error={v.error as boolean} disabled={v.disabled as boolean} onChange={() => {}} />
    ),
    code: (v: V) => `<Textarea${formatProps({ placeholder: v.placeholder, rows: v.rows, error: v.error, disabled: v.disabled })} onChange={() => {}} />`,
  },

  /* ------------------------------- Layout ------------------------------- */
  {
    name: 'stack', title: 'Stack', description: 'Flex container with direction and gap.',
    controls: [
      { name: 'direction', type: 'select', label: 'Direction', options: ['row', 'column', 'row-reverse', 'column-reverse'], defaultValue: 'row' },
      { name: 'gap', type: 'number', label: 'Gap', defaultValue: 2, min: 0, max: 8 },
      { name: 'align', type: 'select', label: 'Align', options: ['start', 'center', 'end', 'stretch', 'baseline'], defaultValue: 'center' },
      { name: 'justify', type: 'select', label: 'Justify', options: ['start', 'center', 'end', 'between', 'around', 'evenly'], defaultValue: 'start' },
      { name: 'wrap', type: 'boolean', label: 'Wrap', defaultValue: false },
    ],
    render: (v: V) => (
      <Stack direction={v.direction as any} gap={v.gap as number} align={v.align as any} justify={v.justify as any} wrap={v.wrap as boolean}>
        <Badge variant="primary">A</Badge>
        <Badge variant="secondary">B</Badge>
        <Badge variant="success">C</Badge>
      </Stack>
    ),
    code: (v: V) => `<Stack${formatProps({ direction: v.direction, gap: v.gap, align: v.align, justify: v.justify, wrap: v.wrap })}>\n  <Badge>A</Badge>\n  <Badge>B</Badge>\n</Stack>`,
  },
  {
    name: 'row', title: 'Row', description: 'Horizontal flex row with alignment and wrap.',
    controls: [
      { name: 'gap', type: 'number', label: 'Gap', defaultValue: 2, min: 0, max: 8 },
      { name: 'align', type: 'select', label: 'Align', options: ['start', 'center', 'end', 'stretch', 'baseline'], defaultValue: 'center' },
      { name: 'justify', type: 'select', label: 'Justify', options: ['start', 'center', 'end', 'between', 'around', 'evenly'], defaultValue: 'start' },
      { name: 'wrap', type: 'boolean', label: 'Wrap', defaultValue: true },
    ],
    render: (v: V) => (
      <Row gap={v.gap as number} align={v.align as any} justify={v.justify as any} wrap={v.wrap as boolean}>
        <Col><Badge variant="primary">1</Badge></Col>
        <Col><Badge variant="secondary">2</Badge></Col>
        <Col><Badge variant="info">3</Badge></Col>
      </Row>
    ),
    code: (v: V) => `<Row${formatProps({ gap: v.gap, align: v.align, justify: v.justify, wrap: v.wrap })}>\n  <Col>1</Col>\n  <Col>2</Col>\n</Row>`,
  },
  {
    name: 'grid', title: 'Grid', description: 'CSS grid with configurable columns and gap.',
    controls: [
      { name: 'columns', type: 'number', label: 'Columns', defaultValue: 3, min: 1, max: 12 },
      { name: 'gap', type: 'number', label: 'Gap', defaultValue: 4, min: 0, max: 8 },
    ],
    render: (v: V) => (
      <Grid columns={v.columns as number} gap={v.gap as number}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} style={{ padding: '1rem', background: '#f0f0f0', borderRadius: 4, textAlign: 'center' }}>
            <Text variant="sm">Cell {n}</Text>
          </div>
        ))}
      </Grid>
    ),
    code: (v: V) => `<Grid${formatProps({ columns: v.columns, gap: v.gap })}>\n  <div>Cell 1</div>\n  <div>Cell 2</div>\n</Grid>`,
  },
  {
    name: 'col', title: 'Col', description: 'Column with alignment, justify, and fill.',
    controls: [
      { name: 'align', type: 'select', label: 'Align', options: ['start', 'center', 'end', 'stretch'], defaultValue: 'stretch' },
      { name: 'justify', type: 'select', label: 'Justify', options: ['start', 'center', 'end', 'between', 'around', 'evenly'], defaultValue: 'start' },
      { name: 'fill', type: 'boolean', label: 'Fill', defaultValue: true },
      { name: 'gap', type: 'number', label: 'Gap', defaultValue: 2, min: 0, max: 8 },
    ],
    render: (v: V) => (
      <Row gap={2}>
        <Col align={v.align as any} justify={v.justify as any} fill={v.fill as boolean} gap={v.gap as number}>
          <Badge variant="primary">Col A</Badge>
        </Col>
        <Col align={v.align as any} justify={v.justify as any} fill={v.fill as boolean} gap={v.gap as number}>
          <Badge variant="secondary">Col B</Badge>
        </Col>
      </Row>
    ),
    code: (v: V) => `<Col${formatProps({ align: v.align, justify: v.justify, fill: v.fill, gap: v.gap })}>\n  Content\n</Col>`,
  },
  {
    name: 'container', title: 'Container', description: 'Centered content container with size limits.',
    controls: [
      { name: 'size', type: 'select', label: 'Size', options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'], defaultValue: 'md' },
      { name: 'fluid', type: 'boolean', label: 'Fluid', defaultValue: false },
    ],
    render: (v: V) => (
      <Container size={v.size as any} fluid={v.fluid as boolean} style={{ background: '#f9f9f9', padding: '1rem', borderRadius: 4 }}>
        <Text variant="sm">Container content</Text>
      </Container>
    ),
    code: (v: V) => `<Container${formatProps({ size: v.size, fluid: v.fluid })}>\n  Content\n</Container>`,
  },

  /* ---------------------------- Data Display ---------------------------- */
  {
    name: 'card', title: 'Card', description: 'Toggle hover and compose header and body.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'hero', 'flat', 'compact'], defaultValue: 'default' },
      { name: 'hoverable', type: 'boolean', label: 'Hoverable', defaultValue: true },
      { name: 'selected', type: 'boolean', label: 'Selected', defaultValue: false },
      { name: 'title', type: 'text', label: 'Title', defaultValue: 'Featured component' },
      { name: 'body', type: 'text', label: 'Body', defaultValue: 'Cards group related content and actions.' },
    ],
    render: (v: V) => (
      <Card variant={v.variant as any} hoverable={v.hoverable as boolean} selected={v.selected as boolean}>
        <CardHeader><Title variant="h4">{String(v.title)}</Title></CardHeader>
        <CardBody><Text>{String(v.body)}</Text></CardBody>
      </Card>
    ),
    code: (v: V) => `<Card${formatProps({ variant: v.variant, hoverable: v.hoverable, selected: v.selected })}>\n  <CardHeader><Title variant="h4">${v.title}</Title></CardHeader>\n  <CardBody><Text>${v.body}</Text></CardBody>\n</Card>`,
  },
  {
    name: 'comment', title: 'Comment', description: 'User comment with avatar, content, and metadata.',
    controls: [
      { name: 'author', type: 'text', label: 'Author', defaultValue: 'Jane Doe' },
      { name: 'handle', type: 'text', label: 'Handle', defaultValue: '@jane' },
      { name: 'initials', type: 'text', label: 'Initials', defaultValue: 'JD' },
      { name: 'timestamp', type: 'text', label: 'Timestamp', defaultValue: '2h ago' },
      { name: 'content', type: 'text', label: 'Content', defaultValue: 'This component looks great!' },
      { name: 'likes', type: 'number', label: 'Likes', defaultValue: 12, min: 0, max: 9999 },
    ],
    render: (v: V) => (
      <Comment author={String(v.author)} handle={String(v.handle)} initials={String(v.initials)} timestamp={String(v.timestamp)} content={String(v.content)} likes={v.likes as number} />
    ),
    code: (v: V) => `<Comment${formatProps({ author: v.author, handle: v.handle, initials: v.initials, timestamp: v.timestamp, likes: v.likes })}>\n  ${v.content}\n</Comment>`,
  },
  {
    name: 'rating', title: 'Rating', description: 'Star rating with optional count and size.',
    controls: [
      { name: 'value', type: 'number', label: 'Value', defaultValue: 4, min: 0, max: 5 },
      { name: 'count', type: 'number', label: 'Count', defaultValue: 128, min: 0, max: 99999 },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'lg'], defaultValue: 'sm' },
      { name: 'interactive', type: 'boolean', label: 'Interactive', defaultValue: false },
    ],
    render: (v: V) => (
      <Rating value={v.value as number} count={v.count as number} size={v.size as any} interactive={v.interactive as boolean} onChange={() => {}} />
    ),
    code: (v: V) => `<Rating${formatProps({ value: v.value, count: v.count, size: v.size, interactive: v.interactive })} />`,
  },
  {
    name: 'list', title: 'List', description: 'Ordered or unordered list of items.',
    controls: [
      { name: 'ordered', type: 'boolean', label: 'Ordered', defaultValue: false },
    ],
    render: (v: V) => (
      <List ordered={v.ordered as boolean}>
        <ListItem><Text variant="sm">First item</Text></ListItem>
        <ListItem><Text variant="sm">Second item</Text></ListItem>
        <ListItem><Text variant="sm">Third item</Text></ListItem>
      </List>
    ),
    code: (v: V) => `<List${formatProps({ ordered: v.ordered })}>\n  <ListItem>First item</ListItem>\n  <ListItem>Second item</ListItem>\n</List>`,
  },
  {
    name: 'table', title: 'Table', description: 'Structured data table with header and rows.',
    controls: [],
    render: () => (
      <Table>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Widget</Td>
            <Td>$9.99</Td>
            <Td>42</Td>
          </Tr>
          <Tr>
            <Td>Gadget</Td>
            <Td>$14.99</Td>
            <Td>17</Td>
          </Tr>
        </Tbody>
      </Table>
    ),
    code: () => `<Table>\n  <Thead><Tr><Th>Product</Th><Th>Price</Th></Tr></Thead>\n  <Tbody><Tr><Td>Widget</Td><Td>$9.99</Td></Tr></Tbody>\n</Table>`,
  },
  {
    name: 'accordion', title: 'Accordion', description: 'Collapsible content sections.',
    controls: [
      { name: 'openIndex', type: 'select', label: 'Open Section', options: ['none', '0', '1'], defaultValue: '0' },
    ],
    render: (v: V) => {
      const openIdx = v.openIndex === 'none' ? -1 : Number(v.openIndex);
      return (
        <Accordion>
          <AccordionItem title="Section One" open={openIdx === 0} onToggle={() => {}}>
            <Text variant="sm">Content for the first section.</Text>
          </AccordionItem>
          <AccordionItem title="Section Two" open={openIdx === 1} onToggle={() => {}}>
            <Text variant="sm">Content for the second section.</Text>
          </AccordionItem>
        </Accordion>
      );
    },
    code: (v: V) => `<Accordion>\n  <AccordionItem title="Section One" open={${v.openIndex === '0'}} onToggle={() => {}}>\n    Content\n  </AccordionItem>\n</Accordion>`,
  },

  /* ------------------------------ Feedback ------------------------------ */
  {
    name: 'alert', title: 'Alert', description: 'Configure alert tone and dismissibility.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['info', 'success', 'warning', 'error'], defaultValue: 'info' },
      { name: 'dismissible', type: 'boolean', label: 'Dismissible', defaultValue: false },
      { name: 'children', type: 'text', label: 'Message', defaultValue: 'This is an important alert message.' },
    ],
    render: (v: V) => (
      <Alert variant={v.variant as any} dismissible={v.dismissible as boolean} onDismiss={() => {}}>
        {String(v.children)}
      </Alert>
    ),
    code: (v: V) => `<Alert${formatProps({ variant: v.variant, dismissible: v.dismissible })} onDismiss={() => {}}>\n  ${v.children}\n</Alert>`,
  },
  {
    name: 'spinner', title: 'Spinner', description: 'Change size and accessibility label.',
    controls: [
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'label', type: 'text', label: 'Label', defaultValue: 'Loading…' },
    ],
    render: (v: V) => <Spinner size={v.size as any} label={String(v.label)} />,
    code: (v: V) => `<Spinner${formatProps({ size: v.size })} label="${v.label}" />`,
  },
  {
    name: 'skeleton', title: 'Skeleton', description: 'Loading placeholder with shape options.',
    controls: [
      { name: 'width', type: 'text', label: 'Width', defaultValue: '200px' },
      { name: 'height', type: 'text', label: 'Height', defaultValue: '20px' },
      { name: 'circle', type: 'boolean', label: 'Circle', defaultValue: false },
    ],
    render: (v: V) => (
      <Stack direction="column" gap={2}>
        <Skeleton width={v.circle as boolean ? '48px' : String(v.width)} height={v.circle as boolean ? '48px' : String(v.height)} circle={v.circle as boolean} />
        {!v.circle && <Skeleton width="150px" height="14px" />}
      </Stack>
    ),
    code: (v: V) => `<Skeleton${formatProps({ width: v.width, height: v.height, circle: v.circle })} />`,
  },
  {
    name: 'emptyState', title: 'EmptyState', description: 'Placeholder for empty content areas.',
    controls: [
      { name: 'title', type: 'text', label: 'Title', defaultValue: 'No results found' },
      { name: 'description', type: 'text', label: 'Description', defaultValue: 'Try adjusting your search or filters.' },
      { name: 'hasAction', type: 'boolean', label: 'Show Action', defaultValue: true },
    ],
    render: (v: V) => (
      <EmptyState icon={Package} title={String(v.title)} description={String(v.description)} action={v.hasAction as boolean ? <Button variant="primary" size="sm">Browse products</Button> : undefined} />
    ),
    code: (v: V) => `<EmptyState icon={Package}${formatProps({ title: v.title, description: v.description })}${v.hasAction ? ' action={<Button>Browse products</Button>}' : ''} />`,
  },

  /* ------------------------------- Media -------------------------------- */
  {
    name: 'avatar', title: 'Avatar', description: 'User avatar with image or initials.',
    controls: [
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
      { name: 'initials', type: 'text', label: 'Initials', defaultValue: 'AB' },
      { name: 'src', type: 'text', label: 'Image URL', defaultValue: '' },
    ],
    render: (v: V) => (
      <Avatar src={v.src ? String(v.src) : undefined} initials={String(v.initials)} size={v.size as any} />
    ),
    code: (v: V) => `<Avatar${formatProps({ size: v.size, initials: v.initials, src: v.src })} />`,
  },
  {
    name: 'image', title: 'Image', description: 'Responsive image with aspect ratio.',
    controls: [
      { name: 'aspect', type: 'select', label: 'Aspect', options: ['square', 'video', 'auto'], defaultValue: 'square' },
      { name: 'src', type: 'text', label: 'Source URL', defaultValue: 'https://picsum.photos/200' },
      { name: 'alt', type: 'text', label: 'Alt Text', defaultValue: 'Sample image' },
    ],
    render: (v: V) => (
      <div style={{ maxWidth: 240 }}>
        <Image src={String(v.src)} alt={String(v.alt)} aspect={v.aspect as any} />
      </div>
    ),
    code: (v: V) => `<Image${formatProps({ src: v.src, alt: v.alt, aspect: v.aspect })} />`,
  },

  /* ----------------------------- Navigation ----------------------------- */
  {
    name: 'breadcrumbs', title: 'Breadcrumbs', description: 'Navigation trail showing page hierarchy.',
    controls: [],
    render: () => (
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Widgets' },
      ]} />
    ),
    code: () => `<Breadcrumbs items={[\n  { label: 'Home', href: '/' },\n  { label: 'Products', href: '/products' },\n  { label: 'Widgets' },\n]} />`,
  },
  {
    name: 'link', title: 'Link', description: 'Navigation link with variant and active state.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'muted', 'underline'], defaultValue: 'default' },
      { name: 'active', type: 'boolean', label: 'Active', defaultValue: false },
      { name: 'children', type: 'text', label: 'Label', defaultValue: 'View details' },
    ],
    render: (v: V) => (
      <Link href="#" variant={v.variant as any} active={v.active as boolean}>
        {String(v.children)}
      </Link>
    ),
    code: (v: V) => `<Link href="#"${formatProps({ variant: v.variant, active: v.active })}>${v.children}</Link>`,
  },
  {
    name: 'menu', title: 'Menu', description: 'Hover-triggered dropdown menu.',
    controls: [
      { name: 'position', type: 'select', label: 'Position', options: ['bottom-end', 'bottom-start', 'bottom-center', 'right', 'left'], defaultValue: 'bottom-end' },
    ],
    render: (v: V) => (
      <Menu position={v.position as any} trigger={<Button variant="outline" size="sm" iconRight={ChevronDown as any}>Options</Button>}>
        <MenuItem active>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </Menu>
    ),
    code: (v: V) => `<Menu${formatProps({ position: v.position })} trigger={<Button>Options</Button>}>\n  <MenuItem>Profile</MenuItem>\n  <MenuItem>Settings</MenuItem>\n</Menu>`,
  },
  {
    name: 'pagination', title: 'Pagination', description: 'Page navigation with current and total pages.',
    controls: [
      { name: 'currentPage', type: 'number', label: 'Current Page', defaultValue: 3, min: 1, max: 20 },
      { name: 'totalPages', type: 'number', label: 'Total Pages', defaultValue: 10, min: 1, max: 100 },
    ],
    render: (v: V) => (
      <Pagination currentPage={v.currentPage as number} totalPages={v.totalPages as number} onPageChange={() => {}} />
    ),
    code: (v: V) => `<Pagination${formatProps({ currentPage: v.currentPage, totalPages: v.totalPages })} onPageChange={(page) => setPage(page)} />`,
  },
  {
    name: 'tabList', title: 'TabList', description: 'Tab navigation bar with active state.',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'pills'], defaultValue: 'default' },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md'], defaultValue: 'md' },
      { name: 'activeId', type: 'select', label: 'Active Tab', options: ['overview', 'details', 'reviews'], defaultValue: 'overview' },
    ],
    render: (v: V) => (
      <TabList
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'details', label: 'Details' },
          { id: 'reviews', label: 'Reviews' },
        ]}
        activeId={String(v.activeId)}
        variant={v.variant as any}
        size={v.size as any}
        onChange={() => {}}
      />
    ),
    code: (v: V) => `<TabList items={[...]}${formatProps({ activeId: v.activeId, variant: v.variant, size: v.size })} onChange={(id) => setActive(id)} />`,
  },
  {
    name: 'tabs', title: 'Tabs', description: 'Self-contained tabs with content panels.',
    controls: [
      { name: 'defaultActiveId', type: 'select', label: 'Default Tab', options: ['overview', 'details', 'reviews'], defaultValue: 'overview' },
    ],
    render: (v: V) => (
      <Tabs
        items={[
          { id: 'overview', label: 'Overview', content: <Text variant="sm">Overview content goes here.</Text> },
          { id: 'details', label: 'Details', content: <Text variant="sm">Detailed specifications.</Text> },
          { id: 'reviews', label: 'Reviews', content: <Text variant="sm">Customer reviews.</Text> },
        ]}
        defaultActiveId={String(v.defaultActiveId)}
      />
    ),
    code: (v: V) => `<Tabs items={[...]}${formatProps({ defaultActiveId: v.defaultActiveId })} />`,
  },

  /* ------------------------------ Overlays ------------------------------ */
  {
    name: 'tooltip', title: 'Tooltip', description: 'Hover-triggered informational tooltip.',
    controls: [
      { name: 'position', type: 'select', label: 'Position', options: ['top', 'bottom', 'left', 'right'], defaultValue: 'top' },
      { name: 'content', type: 'text', label: 'Content', defaultValue: 'Helpful tip' },
    ],
    render: (v: V) => (
      <Tooltip content={String(v.content)} position={v.position as any}>
        <Button variant="outline" size="sm">Hover me</Button>
      </Tooltip>
    ),
    code: (v: V) => `<Tooltip${formatProps({ content: v.content, position: v.position })}>\n  <Button>Hover me</Button>\n</Tooltip>`,
  },
  {
    name: 'popover', title: 'Popover', description: 'Click-triggered floating content panel.',
    controls: [
      { name: 'placement', type: 'select', label: 'Placement', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'], defaultValue: 'bottom-start' },
    ],
    render: (v: V) => (
      <Popover placement={v.placement as any} trigger={<Button variant="outline" size="sm">Open popover</Button>}>
        <Stack direction="column" gap={2} style={{ padding: '0.5rem' }}>
          <Title variant="h6">Popover title</Title>
          <Text variant="sm">Popover body content.</Text>
        </Stack>
      </Popover>
    ),
    code: (v: V) => `<Popover${formatProps({ placement: v.placement })} trigger={<Button>Open</Button>}>\n  Content\n</Popover>`,
  },

  /* ------------------------------ Commerce ------------------------------ */
  {
    name: 'product', title: 'ProductCard', description: 'Product card with image, rating, price, and add-to-cart.',
    controls: [
      { name: 'title', type: 'text', label: 'Title', defaultValue: 'Wireless Headphones' },
      { name: 'price', type: 'number', label: 'Price', defaultValue: 99, min: 0, max: 9999 },
      { name: 'salePrice', type: 'number', label: 'Sale Price', defaultValue: 0, min: 0, max: 9999 },
      { name: 'rating', type: 'number', label: 'Rating', defaultValue: 4, min: 0, max: 5 },
      { name: 'reviewCount', type: 'number', label: 'Reviews', defaultValue: 42, min: 0, max: 99999 },
    ],
    render: (v: V) => (
      <div style={{ maxWidth: 280 }}>
        <ProductCard
          image="https://picsum.photos/300"
          title={String(v.title)}
          description="High-quality audio with noise cancellation."
          price={v.price as number}
          salePrice={v.salePrice as number > 0 ? v.salePrice as number : undefined}
          rating={v.rating as number}
          reviewCount={v.reviewCount as number}
          onAddToCart={() => {}}
        />
      </div>
    ),
    code: (v: V) => `<ProductCard${formatProps({ title: v.title, price: v.price, rating: v.rating, reviewCount: v.reviewCount })} image="..." onAddToCart={() => {}} />`,
  },
  {
    name: 'price', title: 'Price', description: 'Formatted price with optional sale amount.',
    controls: [
      { name: 'amount', type: 'number', label: 'Amount', defaultValue: 49, min: 0, max: 9999 },
      { name: 'saleAmount', type: 'number', label: 'Sale Amount', defaultValue: 0, min: 0, max: 9999 },
      { name: 'currency', type: 'select', label: 'Currency', options: ['USD', 'EUR', 'GBP', 'JPY'], defaultValue: 'USD' },
    ],
    render: (v: V) => (
      <Price amount={v.amount as number} saleAmount={v.saleAmount as number > 0 ? v.saleAmount as number : undefined} currency={v.currency as any} />
    ),
    code: (v: V) => `<Price${formatProps({ amount: v.amount, saleAmount: v.saleAmount, currency: v.currency })} />`,
  },
  {
    name: 'cart', title: 'ItemCard (Cart)', description: 'Cart line item with image, stepper, and remove.',
    controls: [
      { name: 'name', type: 'text', label: 'Name', defaultValue: 'Coffee Mug' },
      { name: 'price', type: 'number', label: 'Price', defaultValue: 12, min: 0, max: 999 },
      { name: 'quantity', type: 'number', label: 'Quantity', defaultValue: 2, min: 1, max: 99 },
    ],
    render: (v: V) => (
      <div style={{ maxWidth: 400 }}>
        <ItemCard
          image="https://picsum.photos/100"
          name={String(v.name)}
          price={v.price as number}
          quantity={v.quantity as number}
          onQuantityChange={() => {}}
          onRemove={() => {}}
        />
      </div>
    ),
    code: (v: V) => `<ItemCard${formatProps({ name: v.name, price: v.price, quantity: v.quantity })} image="..." onQuantityChange={() => {}} onRemove={() => {}} />`,
  },
  {
    name: 'wishlist', title: 'WishlistList', description: 'Saved items list with remove action.',
    controls: [],
    render: () => (
      <div style={{ maxWidth: 400 }}>
        <WishlistList
          items={[
            { image: 'https://picsum.photos/100', name: 'Sneakers', price: 89 },
            { image: 'https://picsum.photos/100', name: 'Backpack', price: 45 },
          ]}
          onRemove={() => {}}
        />
      </div>
    ),
    code: () => `<WishlistList items={[...]} onRemove={(item, index) => removeItem(index)} />`,
  },
  {
    name: 'filter', title: 'FilterCard', description: 'Faceted filter with checkboxes and counts.',
    controls: [
      { name: 'title', type: 'text', label: 'Title', defaultValue: 'Category' },
    ],
    render: (v: V) => (
      <div style={{ maxWidth: 280 }}>
        <FilterCard
          title={String(v.title)}
          options={[
            { label: 'Electronics', value: 'electronics', count: 24 },
            { label: 'Clothing', value: 'clothing', count: 18 },
            { label: 'Books', value: 'books', count: 9 },
          ]}
          selectedValues={['electronics']}
          onToggle={() => {}}
        />
      </div>
    ),
    code: (v: V) => `<FilterCard${formatProps({ title: v.title })} options={[...]} selectedValues={[...]} onToggle={(v) => toggle(v)} />`,
  },
  {
    name: 'order', title: 'OrderCard', description: 'Order summary with line items and checkout.',
    controls: [
      { name: 'total', type: 'number', label: 'Total', defaultValue: 156, min: 0, max: 99999 },
      { name: 'currency', type: 'select', label: 'Currency', options: ['USD', 'EUR', 'GBP'], defaultValue: 'USD' },
    ],
    render: (v: V) => (
      <div style={{ maxWidth: 320 }}>
        <OrderCard
          items={[
            { label: 'Subtotal', amount: 130 },
            { label: 'Shipping', amount: 10 },
            { label: 'Tax', amount: 16 },
          ]}
          total={v.total as number}
          currency={v.currency as any}
          onCheckout={() => {}}
        />
      </div>
    ),
    code: (v: V) => `<OrderCard items={[...]}${formatProps({ total: v.total, currency: v.currency })} onCheckout={() => {}} />`,
  },
];
