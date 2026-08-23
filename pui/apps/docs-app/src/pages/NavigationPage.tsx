import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Link, Menu, MenuItem, Breadcrumbs, Tabs, TabList, Pagination, Navbar, NavbarSection, NavbarItem, Button, Row, Col, Stack } from '@phi/pui';
import { ChevronDown } from 'lucide-react';

export default function NavigationPage() {
  const [page, setPage] = React.useState(3);
  const [tabId, setTabId] = React.useState('tab1');

  return (
    <PageShell>
      <PageHeader
        title="Navigation"
        description="Link, Menu, MenuItem, Breadcrumbs, Tabs, TabList, Pagination, Navbar"
      />

      <Showcase title="Link" description="Navigation links with variants (default, muted, underline)">
        <Row xs={1} sm={2} lg={4} gap={4} align="center">
          <Col><Link href="#">Default Link</Link></Col>
          <Col><Link href="#" variant="muted">Muted Link</Link></Col>
          <Col><Link href="#" variant="underline">Underline Link</Link></Col>
          <Col><Link href="#" active>Active Link</Link></Col>
        </Row>
      </Showcase>

      <Showcase title="Menu" description="Hover dropdown menu with trigger and items">
        <Menu trigger={<Button variant="outline">Options <ChevronDown size={14} /></Button>}>
          <MenuItem onClick={() => {}}>Profile</MenuItem>
          <MenuItem onClick={() => {}}>Settings</MenuItem>
          <MenuItem active>Current Page</MenuItem>
          <MenuItem onClick={() => {}}>Logout</MenuItem>
        </Menu>
      </Showcase>

      <Showcase title="Breadcrumbs" description="Navigation trail with links">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Current Page' },
          ]}
        />
      </Showcase>

      <Showcase title="Tabs" description="Tabbed content panels">
        <Tabs
          items={[
            { id: 'overview', label: 'Overview', content: <p>Overview content goes here.</p> },
            { id: 'details', label: 'Details', content: <p>Detailed information is shown in this tab.</p> },
            { id: 'reviews', label: 'Reviews', content: <p>Customer reviews appear here.</p> },
          ]}
        />
      </Showcase>

      <Showcase title="TabList" description="Lightweight tab list with default and pills variants, controllable active tab">
        <Stack direction="column" gap={3}>
          <TabList
            items={[
              { id: 'tab1', label: 'First' },
              { id: 'tab2', label: 'Second' },
              { id: 'tab3', label: 'Third' },
              { id: 'tab4', label: 'Disabled', disabled: true },
            ]}
            activeId={tabId}
            onChange={setTabId}
          />
          <TabList
            items={[
              { id: 'p1', label: 'Pills One' },
              { id: 'p2', label: 'Pills Two' },
              { id: 'p3', label: 'Pills Three' },
            ]}
            variant="pills"
            size="sm"
          />
        </Stack>
      </Showcase>

      <Showcase title="Pagination" description="Page navigation with current page and total pages">
        <Stack direction="column" gap={3}>
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
          <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
          <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
        </Stack>
      </Showcase>

      <Showcase title="Navbar" description="Navigation bar with sections, items, sticky positioning, and variants (default, transparent, solid)">
        <Stack direction="column" gap={3}>
          <Navbar sticky variant="default" height={48}>
            <NavbarSection align="start">
              <NavbarItem active>Home</NavbarItem>
              <NavbarItem>Products</NavbarItem>
              <NavbarItem>About</NavbarItem>
            </NavbarSection>
            <NavbarSection align="end">
              <NavbarItem href="#">Login</NavbarItem>
            </NavbarSection>
          </Navbar>
          <Navbar variant="transparent" height={48}>
            <NavbarSection align="start">
              <NavbarItem>Transparent</NavbarItem>
              <NavbarItem>Nav</NavbarItem>
            </NavbarSection>
            <NavbarSection align="end">
              <NavbarItem>Right</NavbarItem>
            </NavbarSection>
          </Navbar>
          <Navbar variant="solid" height={48}>
            <NavbarSection align="start">
              <NavbarItem>Solid</NavbarItem>
              <NavbarItem>Nav</NavbarItem>
            </NavbarSection>
            <NavbarSection align="end">
              <NavbarItem>Right</NavbarItem>
            </NavbarSection>
          </Navbar>
        </Stack>
      </Showcase>
    </PageShell>
  );
}
