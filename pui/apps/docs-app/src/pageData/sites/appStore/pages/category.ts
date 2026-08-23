import type { PageData } from '../../../types';
import { APP_STORE_THEME } from '../theme';

export const APP_STORE_CATEGORY_PAGE: PageData = {
  id: 'app-store-category',
  name: 'App Store Category',
  description: 'Category pill navigation with a filtered list of apps.',
  layoutType: 'app-store',
  themeVars: APP_STORE_THEME,
  sections: [
    {
      id: 'category-pills',
      name: 'Category Pills',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'appstore.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'category-header',
      name: 'Category Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 1 },
          children: [
            { type: 'Title', props: { variant: 'h3' }, children: 'Productivity' },
            { type: 'Text', props: { variant: 'default' }, children: 'Apps to help you get more done, faster.' },
          ],
        },
      ],
    },
    {
      id: 'app-list',
      name: 'App List',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'appstore.category.apps',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 3, align: 'center', justify: 'between' },
                    children: [
                      {
                        type: 'Row',
                        props: { gap: 3, align: 'center' },
                        children: [
                          { type: 'Avatar', props: { src: '{item.icon}', size: 'lg' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 1 },
                            children: [
                              { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.developer}' },
                              { type: 'Rating', props: { value: '{item.rating}', max: 5 } },
                            ],
                          },
                        ],
                      },
                      { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Get' },
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

export default APP_STORE_CATEGORY_PAGE;
