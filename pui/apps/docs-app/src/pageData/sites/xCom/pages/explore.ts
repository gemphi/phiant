import type { PageData } from '../../../types';
import { X_COM_THEME } from '../theme';

export const X_COM_EXPLORE_PAGE: PageData = {
  id: 'x-com-explore',
  name: 'X.com Explore',
  description: 'Search bar with trending topics grouped by category.',
  layoutType: 'x-com',
  themeVars: X_COM_THEME,
  sections: [
    {
      id: 'explore-search',
      name: 'Search',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Input', props: { placeholder: 'Search X', type: 'text' } },
            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Search' }, children: 'Search' },
          ],
        },
      ],
    },
    {
      id: 'explore-tabs',
      name: 'Explore Tabs',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'x.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'explore-trends',
      name: 'Trending Topics',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardHeader',
                  children: [{ type: 'Title', props: { variant: 'h5' }, children: 'Trending now' }],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 3 },
                      dataSource: 'x.trends',
                      itemTemplate: {
                        type: 'Row',
                        props: { justify: 'between', align: 'center' },
                        children: [
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.rank} · {item.category}' },
                              { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.posts}' },
                            ],
                          },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MoreHorizontal' } },
                        ],
                      },
                    },
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

export default X_COM_EXPLORE_PAGE;
