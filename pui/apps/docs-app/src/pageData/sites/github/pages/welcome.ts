import type { PageData } from '../../../types';
import { GITHUB_THEME } from '../theme';

export const GITHUB_WELCOME_PAGE: PageData = {
  id: 'github-welcome',
  name: 'GitHub Dashboard',
  description: 'Developer dashboard with repo feed, trending, and notifications.',
  layoutType: 'github',
  themeVars: GITHUB_THEME,
  sections: [
    {
      id: 'dashboard-header',
      name: 'Dashboard Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'GitHub' },
            { type: 'Text', props: { variant: 'lg' }, children: 'Welcome back, @sarahchen — here is your activity feed.' },
            {
              type: 'Row',
              props: { gap: 2 },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'New Repository' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Import Repository' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'New Codespace' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'dashboard-repos',
      name: 'Your Repositories',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Your Repositories' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              dataSource: 'github.repos',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: true },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          {
                            type: 'Row',
                            props: { gap: 2, align: 'center' },
                            children: [
                              { type: 'Title', props: { variant: 'h4' }, children: '{item.owner}/{item.name}' },
                              { type: 'Badge', props: { variant: 'primary' }, children: 'Public' },
                            ],
                          },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
                          {
                            type: 'Row',
                            props: { gap: 2 },
                            children: [
                              { type: 'Badge', props: { variant: 'secondary' }, children: '{item.language}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.stars} stars' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.forks} forks' },
                              { type: 'Text', props: { variant: 'sm' }, children: 'Updated {item.updated}' },
                            ],
                          },
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
      id: 'dashboard-trending',
      name: 'Trending Repositories',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Trending Repositories' },
            {
              type: 'Grid',
              props: { columns: 2, gap: 2 },
              dataSource: 'github.trending',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: true },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.owner}/{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
                          {
                            type: 'Row',
                            props: { gap: 2 },
                            children: [
                              { type: 'Badge', props: { variant: 'secondary' }, children: '{item.language}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.starsToday} stars today' },
                            ],
                          },
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
      id: 'dashboard-notifications',
      name: 'Notifications',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Notifications' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1 },
              dataSource: 'github.notifications',
              itemTemplate: {
                type: 'Text',
                props: { variant: 'sm' },
                children: '{item.text}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default GITHUB_WELCOME_PAGE;
