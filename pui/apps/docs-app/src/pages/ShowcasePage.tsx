import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Card, CardHeader, CardBody, CardFooter, CardImage, Accordion, AccordionItem, Rating, Table, Thead, Tbody, Tr, Th, Td, List, ListItem, Button, Title, Text, Row, Col, Stack } from '@phi/pui';
import styles from './pages.module.scss';

export default function ShowcasePage() {
  const [openItem, setOpenItem] = React.useState<string | null>('item1');

  return (
    <PageShell>
      <PageHeader
        title="Data Display"
        description="Card, Accordion, Rating, Table, List — content organization components"
      />

      <Showcase title="Card" description="Content card with header, body, footer, and image">
        <Card className={styles.cardMax}>
          <CardImage src="https://picsum.photos/360/200" alt="Card image" />
          <CardHeader action={<Button variant="ghost" size="sm">Edit</Button>}>
            <Title variant="h4">Card Title</Title>
          </CardHeader>
          <CardBody>
            <Text variant="sm">This is the card body content. It can contain any elements.</Text>
          </CardBody>
          <CardFooter>
            <Button variant="primary" size="sm">Action</Button>
          </CardFooter>
        </Card>
      </Showcase>

      <Showcase title="Card Variants" description="default, hero, flat, compact variants">
        <Row xs={1} sm={2} lg={4} gap={4}>
          <Col>
            <Card variant="default">
              <CardBody><Text variant="sm">Default card</Text></CardBody>
            </Card>
          </Col>
          <Col>
            <Card variant="hero">
              <CardBody><Text variant="sm">Hero card</Text></CardBody>
            </Card>
          </Col>
          <Col>
            <Card variant="flat">
              <CardBody><Text variant="sm">Flat card</Text></CardBody>
            </Card>
          </Col>
          <Col>
            <Card variant="compact">
              <CardBody><Text variant="sm">Compact card</Text></CardBody>
            </Card>
          </Col>
        </Row>
      </Showcase>

      <Showcase title="Accordion" description="Collapsible content sections">
        <Accordion>
          <AccordionItem
            title="Section 1"
            open={openItem === 'item1'}
            onToggle={() => setOpenItem(openItem === 'item1' ? null : 'item1')}
          >
            <Text variant="sm">Content for section 1.</Text>
          </AccordionItem>
          <AccordionItem
            title="Section 2"
            open={openItem === 'item2'}
            onToggle={() => setOpenItem(openItem === 'item2' ? null : 'item2')}
          >
            <Text variant="sm">Content for section 2.</Text>
          </AccordionItem>
          <AccordionItem
            title="Section 3"
            open={openItem === 'item3'}
            onToggle={() => setOpenItem(openItem === 'item3' ? null : 'item3')}
          >
            <Text variant="sm">Content for section 3.</Text>
          </AccordionItem>
        </Accordion>
      </Showcase>

      <Showcase title="Rating" description="Star rating display (sm, lg sizes, with count)">
        <Stack direction="column" gap={2}>
          <Rating value={3} count={124} />
          <Rating value={4.5} count={89} size="lg" />
          <Rating value={5} />
          <Rating value={2} size="lg" />
        </Stack>
      </Showcase>

      <Showcase title="Table" description="Data table with Thead, Tbody, Tr, Th, Td">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Alice Johnson</Td>
              <Td>alice@example.com</Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>Bob Smith</Td>
              <Td>bob@example.com</Td>
              <Td>User</Td>
            </Tr>
            <Tr>
              <Td>Carol White</Td>
              <Td>carol@example.com</Td>
              <Td>Editor</Td>
            </Tr>
          </Tbody>
        </Table>
      </Showcase>

      <Showcase title="List" description="Unordered and ordered lists">
        <List>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
        </List>
        <List ordered>
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
          <ListItem>Third step</ListItem>
        </List>
      </Showcase>
    </PageShell>
  );
}
