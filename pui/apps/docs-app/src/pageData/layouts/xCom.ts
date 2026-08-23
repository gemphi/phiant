import type { PageData } from '../types';

export const X_COM_PAGE_DATA: PageData = {
  id: 'x-com',
  name: 'X.com',
  description: 'Social feed with navigation rail, composer, post list, and trending panel.',
  layoutType: 'x',
  themeVars: {
    '--phi-color-primary': '#000000',
    '--phi-color-primary-light': 'rgba(0, 0, 0, 0.1)',
    '--phi-color-background': '#ffffff',
    '--phi-color-background-card': '#ffffff',
    '--phi-color-background-secondary': '#f7f9f9',
    '--phi-color-border': '#eff3f4',
    '--phi-radius-full': '9999px',
  },
  sections: [
    {
      id: 'nav-rail',
      name: 'Navigation Rail',
      layout: 'col',
      gap: 1,
      components: [
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Home', children: 'Home' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Search', children: 'Explore' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Bell', children: 'Notifications' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle', children: 'Messages' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'User', children: 'Profile' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Settings', children: 'Settings' } },
      ],
    },
    {
      id: 'composer',
      name: 'Composer',
      layout: 'row',
      gap: 3,
      components: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'row', gap: 3, align: 'start' },
                  children: [
                    { type: 'Avatar', props: { initials: 'U', size: 'md' } },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2 },
                      children: [
                        { type: 'Textarea', props: { placeholder: 'What is happening?!', rows: 3 } },
                        {
                          type: 'Stack',
                          props: { direction: 'row', justify: 'between', align: 'center' },
                          children: [
                            { type: 'Button', props: { variant: 'primary', size: 'sm', children: 'Post' } },
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
      ],
    },
    {
      id: 'feed',
      name: 'Feed',
      layout: 'col',
      gap: 2,
      components: [
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'row', gap: 3, align: 'start' },
                  children: [
                    { type: 'Avatar', props: { initials: 'A', size: 'sm' } },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Title', props: { variant: 'h6' }, children: 'Account Name @handle · 2h' },
                        { type: 'Text', props: { variant: 'default' }, children: 'This is what a data-driven post looks like when rendered by the page renderer.' },
                        {
                          type: 'Stack',
                          props: { direction: 'row', justify: 'between' },
                          children: [
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart', children: '24' } },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle', children: '8' } },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2', children: '3' } },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MoreHorizontal' } },
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
      ],
    },
    {
      id: 'trending',
      name: 'Trending',
      layout: 'col',
      gap: 2,
      components: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardHeader',
              children: [{ type: 'Title', props: { variant: 'h5' }, children: 'Trends for you' }],
            },
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Text', props: { variant: 'sm' }, children: 'Technology · Trending' },
                    { type: 'Title', props: { variant: 'h6' }, children: '#PUI' },
                    { type: 'Divider' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Design · Trending' },
                    { type: 'Title', props: { variant: 'h6' }, children: '#ComponentSystems' },
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
