import type { PageData } from '../../../types';
import { INSTAGRAM_THEME } from '../theme';

export const INSTAGRAM_EXPLORE_PAGE: PageData = {
  id: 'instagram-explore',
  name: 'Instagram Explore',
  description: 'Search bar with category chips and a 3-column grid of explore posts.',
  layoutType: 'instagram',
  themeVars: INSTAGRAM_THEME,
  sections: [
    {
      id: 'explore-search',
      name: 'Search',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Input', props: { placeholder: 'Search', type: 'text', iconLeft: 'Search' } },
            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Search' }, children: 'Search' },
          ],
        },
      ],
    },
    {
      id: 'explore-chips',
      name: 'Category Chips',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'instagram.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'explore-grid',
      name: 'Explore Grid',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 2 },
          dataSource: 'instagram.explore.grid',
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
                      { type: 'Span', props: { className: 'image-placeholder', style: { aspectRatio: '1 / 1', background: 'linear-gradient(135deg, #833AB4, #FD1D1D)', borderRadius: '8px', minHeight: '160px' } } },
                      {
                        type: 'Row',
                        props: { justify: 'between', align: 'center' },
                        children: [
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.handle}' },
                          {
                            type: 'Row',
                            props: { gap: 1, align: 'center' },
                            children: [
                              { type: 'Icon', props: { name: 'Heart' } },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.likes}' },
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
        },
      ],
    },
  ],
};

export default INSTAGRAM_EXPLORE_PAGE;
