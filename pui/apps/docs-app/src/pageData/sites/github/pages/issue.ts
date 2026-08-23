import type { PageData } from '../../../types';
import { GITHUB_THEME } from '../theme';

export const GITHUB_ISSUE_PAGE: PageData = {
  id: 'github-issue',
  name: 'GitHub Issue',
  description: 'Issue detail with description, comments, and metadata.',
  layoutType: 'github',
  themeVars: GITHUB_THEME,
  sections: [
    {
      id: 'issue-header',
      name: 'Issue Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Plan cache returns stale results after schema migration' },
                { type: 'Badge', props: { variant: 'primary' }, children: '#142' },
              ],
            },
            {
              type: 'Row',
              props: { gap: 2 },
              children: [
                { type: 'Badge', props: { variant: 'error' }, children: 'Open' },
                { type: 'Badge', props: { variant: 'warning' }, children: 'High Priority' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'bug' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'optimizer' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'cache' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'issue-body',
      name: 'Issue Description',
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
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Avatar', props: { src: 'https://i.pravatar.cc/150?img=12', alt: 'jameswhitfield', size: 'sm' } },
                        { type: 'Text', props: { variant: 'sm' }, children: 'jameswhitfield opened this issue 3 days ago · 8 comments' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Description' },
                    { type: 'Text', props: { variant: 'default' }, children: 'After running a schema migration that adds a new index on the orders table, the plan cache continues to serve full-table scans instead of utilizing the new index. The cache entry does not invalidate on schema changes.' },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Reproduction Steps' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Text', props: { variant: 'default' }, children: '1. Create a table with 10M rows and no secondary index' },
                        { type: 'Text', props: { variant: 'default' }, children: '2. Run a SELECT query that triggers a full scan (cached plan)' },
                        { type: 'Text', props: { variant: 'default' }, children: '3. Add a secondary index via ALTER TABLE' },
                        { type: 'Text', props: { variant: 'default' }, children: '4. Re-run the same SELECT — still uses full scan from cache' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Expected Behavior' },
                    { type: 'Text', props: { variant: 'default' }, children: 'The plan cache should invalidate entries when a schema change affects the queried tables. The optimizer should detect the new index and produce an index scan plan.' },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Environment' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Text', props: { variant: 'sm' }, children: '• Go 1.22, spanner-query-optimizer v2.4.1' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Cloud Spanner instance with 1000 PU' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• 3-node cluster, us-central1' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'issue-comments',
      name: 'Comments',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Comments (8)' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              dataSource: 'github.repo.issue.comments',
              itemTemplate: {
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
                          {
                            type: 'Row',
                            props: { gap: 2, align: 'center' },
                            children: [
                              { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.author}', size: 'sm' } },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.author} commented {item.time}' },
                            ],
                          },
                          { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: 'issue-sidebar',
      name: 'Issue Metadata',
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
                    { type: 'Title', props: { variant: 'h4' }, children: 'Assignees' },
                    {
                      type: 'Row',
                      props: { gap: 1 },
                      children: [
                        { type: 'Avatar', props: { src: 'https://i.pravatar.cc/150?img=47', alt: 'sarahchen', size: 'sm' } },
                        { type: 'Text', props: { variant: 'sm' }, children: 'sarahchen' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h4' }, children: 'Labels' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Badge', props: { variant: 'error' }, children: 'bug' },
                        { type: 'Badge', props: { variant: 'warning' }, children: 'High Priority' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'optimizer' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'cache' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h4' }, children: 'Milestone' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'v2.5.0 — Q1 2025' },
                    { type: 'Title', props: { variant: 'h4' }, children: 'Linked PRs' },
                    { type: 'Text', props: { variant: 'sm' }, children: '#145 fix: synchronous schema invalidation' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default GITHUB_ISSUE_PAGE;
