import type { PageData } from '../../../types';
import { GITHUB_THEME } from '../theme';

export const GITHUB_REPO_PAGE: PageData = {
  id: 'github-repo',
  name: 'GitHub Repository',
  description: 'Repository detail with README, stats, and recent activity.',
  layoutType: 'github',
  themeVars: GITHUB_THEME,
  sections: [
    {
      id: 'repo-header',
      name: 'Repository Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Title', props: { variant: 'h2' }, children: 'sarahchen' },
                { type: 'Text', props: { variant: 'lg' }, children: '/' },
                { type: 'Title', props: { variant: 'h2' }, children: 'spanner-query-optimizer' },
                { type: 'Badge', props: { variant: 'primary' }, children: 'Public' },
              ],
            },
            { type: 'Text', props: { variant: 'default' }, children: 'Distributed query optimization engine for Cloud Spanner with adaptive plan caching.' },
            {
              type: 'Row',
              props: { gap: 2 },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Star' },
                { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Fork' },
                { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Watch' },
                { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Code' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'repo-stats',
      name: 'Repository Stats',
      body: [
        {
          type: 'Grid',
          props: { columns: 4, gap: 2 },
          dataSource: 'github.repo.stats',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: false },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0 },
                    children: [
                      { type: 'Title', props: { variant: 'h4' }, children: '{item.value}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.label}' },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'repo-readme',
      name: 'README',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h1' }, children: 'Spanner Query Optimizer' },
                    { type: 'Text', props: { variant: 'default' }, children: 'A distributed query optimization engine built for Google Cloud Spanner. Features adaptive plan caching, cost-based optimization, and real-time statistics aggregation across 2B daily queries.' },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Features' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Text', props: { variant: 'default' }, children: '• Adaptive plan caching with 40% p99 latency reduction' },
                        { type: 'Text', props: { variant: 'default' }, children: '• Cost-based optimizer with histogram-driven cardinality estimation' },
                        { type: 'Text', props: { variant: 'default' }, children: '• Real-time statistics aggregation across distributed nodes' },
                        { type: 'Text', props: { variant: 'default' }, children: '• Pluggable optimizer rules for custom query patterns' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Quick Start' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'go get github.com/sarahchen/spanner-query-optimizer' },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Contributing' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Pull requests welcome! Please open an issue first to discuss what you would like to change. See CONTRIBUTING.md for guidelines.' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'repo-commits',
      name: 'Recent Commits',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Recent Commits' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1 },
              dataSource: 'github.repo.commits',
              itemTemplate: {
                type: 'Text',
                props: { variant: 'sm' },
                children: '{item.message} ({item.hash}) — {item.author} · {item.time}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default GITHUB_REPO_PAGE;
