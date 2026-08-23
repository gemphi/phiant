import type { PageData } from '../../../types';
import { TIKTOK_THEME } from '../theme';

export const TIKTOK_VIDEO_PAGE: PageData = {
  id: 'tiktok-video',
  name: 'TikTok Video Detail',
  description: 'Single video view with creator info, action rail, and comments panel.',
  layoutType: 'tiktok',
  themeVars: TIKTOK_THEME,
  sections: [
    {
      id: 'video-player',
      name: 'Video Player',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
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
                            { type: 'Title', props: { variant: 'h5' }, children: '@danko.cooks' },
                            { type: 'Text', props: { variant: 'sm' }, children: '5-minute garlic butter pasta 🍝 #cooking #quickrecipes' },
                            { type: 'Text', props: { variant: 'sm' }, children: '♪ original sound - danko.cooks' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', align: 'center', gap: 3 },
                          children: [
                            { type: 'Avatar', props: { initials: 'DK', size: 'md' } },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' }, children: '96.4K' },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: '1.2K' },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' }, children: 'Share' },
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
      id: 'comments',
      name: 'Comments',
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
                  children: [{ type: 'Title', props: { variant: 'h5' }, children: 'Comments · 1.2K' }],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 3 },
                      dataSource: 'tiktok.video.comments',
                      itemTemplate: {
                        type: 'Stack',
                        props: { direction: 'row', gap: 2, align: 'start' },
                        children: [
                          { type: 'Avatar', props: { initials: '{item.avatar}', size: 'sm' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h6' }, children: '{item.handle}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.text}' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' }, children: '{item.likes}' },
                            ],
                          },
                        ],
                      },
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
          ],
        },
      ],
    },
  ],
};

export default TIKTOK_VIDEO_PAGE;
