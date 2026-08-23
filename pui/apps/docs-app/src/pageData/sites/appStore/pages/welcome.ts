import type { PageData } from '../../../types';
import { APP_STORE_THEME } from '../theme';

export const APP_STORE_WELCOME_PAGE: PageData = {
  id: 'app-store-welcome',
  name: 'App Store Welcome',
  description: 'Featured hero banner and a grid of featured apps.',
  layoutType: 'app-store',
  themeVars: APP_STORE_THEME,
  sections: [
    {
      id: 'featured-hero',
      name: 'Featured Hero',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'app-hero' },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    { type: 'Badge', props: { variant: 'primary' }, children: 'App of the Day' },
                    { type: 'Title', props: { variant: 'h2' }, children: 'Focus Flow' },
                    {
                      type: 'Text',
                      props: { variant: 'default' },
                      children: 'A beautifully simple way to plan your day, track deep work sessions, and beat distraction.',
                    },
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Get' },
                        { type: 'Rating', props: { value: 4.8, max: 5 } },
                        { type: 'Text', props: { variant: 'sm' }, children: '24.3K Ratings' },
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
      id: 'quick-links',
      name: 'Quick Links',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'Home' }, children: 'Today' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Games' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Apps' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Search' }, children: 'Search' },
          ],
        },
      ],
    },
    {
      id: 'featured-apps',
      name: 'Featured Apps',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'appstore.featured',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'center' },
                    children: [
                      { type: 'Avatar', props: { src: '{item.icon}', size: 'lg' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.developer}' },
                        ],
                      },
                    ],
                  },
                  { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Get' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

export default APP_STORE_WELCOME_PAGE;
