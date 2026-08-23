import type { PageData } from '../../../types';
import { PINTEREST_THEME } from '../theme';

export const PINTEREST_WELCOME_PAGE: PageData = {
  id: 'pinterest-welcome',
  name: 'Pinterest Home Feed',
  description: 'Visual discovery home feed with category chips and a masonry-style pin grid.',
  layoutType: 'pinterest',
  themeVars: PINTEREST_THEME,
  sections: [
    {
      id: 'welcome-categories',
      name: 'Category Chips',
      body: [
        {
          type: 'Row',
          props: { gap: 2, wrap: true },
          dataSource: 'pinterest.categories',
          itemTemplate: {
            type: 'Button',
            props: { variant: 'ghost', size: 'md' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'welcome-masonry',
      name: 'Masonry Pin Grid',
      body: [
        {
          type: 'Grid',
          props: { columns: 4, gap: 3 },
          dataSource: 'pinterest.pins',
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
                      { type: 'Image', props: { src: '{item.image}', alt: '{item.title}' } },
                      { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '{item.source}' },
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

export default PINTEREST_WELCOME_PAGE;
