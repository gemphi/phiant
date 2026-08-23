import type { PageData } from '../types';

export const APP_STORE_PAGE_DATA: PageData = {
  id: 'app-store',
  name: 'Apple App Store',
  description: 'Editorial hero, app cards with ratings, and category pills.',
  layoutType: 'app-store',
  themeVars: {
    '--phi-color-primary': '#0071e3',
    '--phi-color-primary-light': 'rgba(0, 113, 227, 0.1)',
    '--phi-color-background': '#f5f5f7',
    '--phi-color-background-card': '#ffffff',
    '--phi-color-background-secondary': '#f5f5f7',
    '--phi-color-text-primary': '#1d1d1f',
    '--phi-color-text-secondary': '#86868b',
    '--phi-color-border': '#d2d2d7',
    '--phi-radius-md': '1.125rem',
  },
  sections: [
    {
      id: 'hero',
      name: 'Editorial Hero',
      layout: 'col',
      gap: 3,
      components: [
        {
          type: 'Card',
          props: { hoverable: false, className: 'app-hero' },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Badge', props: { variant: 'primary' }, children: 'Now Available' },
                { type: 'Title', props: { variant: 'h2' }, children: 'App of the Day' },
                { type: 'Text', props: { variant: 'default' }, children: 'Discover the apps and games that are changing the way we create, learn, and play.' },
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Get' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'categories',
      name: 'Category Pills',
      layout: 'row',
      gap: 2,
      components: [
        { type: 'Badge', props: { variant: 'secondary' }, children: 'Games' },
        { type: 'Badge', props: { variant: 'secondary' }, children: 'Productivity' },
        { type: 'Badge', props: { variant: 'secondary' }, children: 'Photo & Video' },
        { type: 'Badge', props: { variant: 'secondary' }, children: 'Social' },
      ],
    },
    {
      id: 'app-grid',
      name: 'Apps We Love',
      layout: 'grid',
      cols: 3,
      gap: 3,
      components: [
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h5' }, children: 'Procreate' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Sketch. Paint. Create.' },
                { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Get' },
              ],
            },
          ],
        },
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h5' }, children: 'Things 3' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Organize your life.' },
                { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: '$9.99' },
              ],
            },
          ],
        },
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h5' }, children: 'LumaFusion' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Pro video editing.' },
                { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: '$29.99' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
