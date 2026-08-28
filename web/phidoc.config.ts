import type { PhiDocSiteConfig } from '@phiace/phidoc';

const config: PhiDocSiteConfig = {
  title: 'Phient',
  description: 'Enterprise agentic ecosystem: dual-cognition agent runtime, MCP tooling, and governed orchestration.',
  version: '0.1.0',
  brandId: 'phient',
  docs: {
    path: '../docs',
    routeBasePath: 'docs',
    include: ['*.md', 'agents/**/*.md'],
    exclude: ['**/node_modules/**', '**/.git/**', '**/_*/**', 'v1/**', 'v2/**'],
  },
  blog: {
    path: '../specs',
    routeBasePath: 'specs',
  },
  home: {
    title: 'Enterprise Agentic Ecosystem',
    tagline: 'Dual-cognition agent runtime with MCP subroutines, OOD intent guardrails, and governed multi-agent orchestration.',
    actions: [
      { label: 'Documentation', href: '/docs/readme', variant: 'primary' },
      { label: 'Architecture', href: '/docs/architecture', variant: 'outline' },
      { label: 'Specialist Agents', href: '/docs/agents/readme', variant: 'secondary' },
    ],
    features: [
      {
        title: 'Dual-Cognition Runtime',
        description: 'Deliberative planning and reflexive execution loops coordinated through a governed agent runtime.',
        href: '/docs/architecture',
      },
      {
        title: 'Specialist Agents',
        description: 'Eleven focused agents — phione, phibot, phidoc, phigit, phillm, phirag, and more — each with a single mandate.',
        href: '/docs/agents/readme',
      },
      {
        title: 'MCP Tooling',
        description: 'Subroutine registry and Model Context Protocol server expose vetted tools to Claude Desktop and IDE hosts.',
        href: '/docs/mcp-tooling',
      },
    ],
  },
  nav: [
    { label: 'Docs', href: '/docs/readme' },
    { label: 'Architecture', href: '/docs/architecture' },
    { label: 'Agents', href: '/docs/agents/readme' },
    { label: 'Governance', href: '/docs/governance' },
    { label: 'GitHub', href: 'https://github.com/gemphi/phient', external: true },
  ],
  sidebar: {
    mode: 'auto',
  },
  blogSidebar: {
    mode: 'auto',
  },
  layout: {
    navbarSticky: true,
    navbarVariant: 'default',
    sidebarCollapsed: false,
  },
};

export default config;
