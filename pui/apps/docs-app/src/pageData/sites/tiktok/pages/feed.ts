import type { PageData } from '../../../types';
import { TIKTOK_THEME } from '../theme';

export const TIKTOK_FEED_PAGE: PageData = {
  id: 'tiktok-feed',
  name: 'TikTok For You Feed',
  description: 'Full-screen vertical video feed with side action rail, captions, and a bottom comment input.',
  layoutType: 'tiktok',
  themeVars: TIKTOK_THEME,
  sections: [
    {
      id: 'for-you-feed',
      name: 'For You Feed',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 0 },
          dataSource: 'tiktok.feed.videos',
          itemTemplate: {
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
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.handle}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.caption}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '♪ {item.sound}' },
                        ],
                      },
                      {
                        type: 'Stack',
                        props: { direction: 'column', align: 'center', gap: 3 },
                        children: [
                          { type: 'Avatar', props: { initials: '{item.avatar}', size: 'md' } },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' }, children: '{item.likes}' },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: '{item.comments}' },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' }, children: 'Share' },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MoreHorizontal' } },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'CardFooter',
                children: [
                  { type: 'Input', props: { placeholder: 'Add comment...', type: 'text' } },
                  { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Post' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'bottom-nav',
      name: 'Bottom Navigation',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Home' }, children: 'Home' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Search' }, children: 'Discover' },
            { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: '+' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: 'Inbox' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'User' }, children: 'Profile' },
          ],
        },
      ],
    },
  ],
};

export default TIKTOK_FEED_PAGE;
