import type { PageData } from '../types';

export const TIKTOK_PAGE_DATA: PageData = {
  id: 'tiktok',
  name: 'TikTok',
  description: 'Vertical video feed with side actions, creator info, and bottom nav.',
  layoutType: 'tiktok',
  themeVars: {
    '--phi-color-primary': '#000000',
    '--phi-color-primary-light': 'rgba(0, 0, 0, 0.1)',
    '--phi-color-background': '#000000',
    '--phi-color-background-card': '#000000',
    '--phi-color-background-secondary': '#161618',
    '--phi-color-text-primary': '#ffffff',
    '--phi-color-text-secondary': '#8a8b91',
    '--phi-color-border': '#2f2f2f',
    '--phi-radius-full': '9999px',
  },
  sections: [
    {
      id: 'video-feed',
      name: 'Video Feed',
      layout: 'col',
      gap: 0,
      components: [
        {
          type: 'Card',
          props: { hoverable: false, className: 'tiktok-video' },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'row', justify: 'between', align: 'end' },
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2 },
                      children: [
                        { type: 'Title', props: { variant: 'h5' }, children: '@creator' },
                        { type: 'Text', props: { variant: 'sm' }, children: 'Original sound - Artist Name · #trending' },
                      ],
                    },
                    {
                      type: 'Stack',
                      props: { direction: 'column', align: 'center', gap: 3 },
                      children: [
                        { type: 'Avatar', props: { initials: 'C', size: 'md' } },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart', children: '12.5K' } },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle', children: '482' } },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2', children: 'Share' } },
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
      id: 'bottom-nav',
      name: 'Bottom Navigation',
      layout: 'row',
      gap: 2,
      components: [
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Home', children: 'Home' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Search', children: 'Discover' } },
        { type: 'Button', props: { variant: 'primary', size: 'sm', children: '+' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle', children: 'Inbox' } },
        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'User', children: 'Profile' } },
      ],
    },
  ],
};
