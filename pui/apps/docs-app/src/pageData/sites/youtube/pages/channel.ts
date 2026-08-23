import type { PageData } from '../../../types';
import { YOUTUBE_THEME } from '../theme';

export const YOUTUBE_CHANNEL_PAGE: PageData = {
  id: 'youtube-channel',
  name: 'YouTube Channel',
  description: 'Channel page with banner, avatar, stats, tabs, and a grid of videos.',
  layoutType: 'youtube',
  themeVars: YOUTUBE_THEME,
  sections: [
    {
      id: 'channel-banner',
      name: 'Channel Banner',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 0 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'youtube-banner' },
              children: [
                {
                  type: 'CardBody',
                  children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Channel banner placeholder' }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'channel-header',
      name: 'Channel Header',
      body: [
        {
          type: 'Row',
          props: { gap: 3 },
          children: [
            {
              type: 'Row',
              props: { gap: 3, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'BB', size: 'xl' } },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 0 },
                  children: [
                    { type: 'Title', props: { variant: 'h3' }, children: 'Bright Byte' },
                    { type: 'Text', props: { variant: 'sm' }, children: '@brightbyte · 1.4M subscribers · 312 videos' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Design systems, front-end engineering, and product craft.' },
                  ],
                },
              ],
            },
            { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Subscribe' },
          ],
        },
      ],
    },
    {
      id: 'channel-stats',
      name: 'Channel Stats',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: '1.4M' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Subscribers' },
                  ],
                },
              ],
            },
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: '312' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Videos' },
                  ],
                },
              ],
            },
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: '48.6M' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Total views' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'channel-tabs',
      name: 'Channel Tabs',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Badge', props: { variant: 'primary' }, children: 'Home' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Videos' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Shorts' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Playlists' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Community' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'About' },
          ],
        },
      ],
    },
    {
      id: 'channel-videos',
      name: 'Channel Videos',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'youtube.channel.videos',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0, align: 'center', className: 'youtube-thumbnail' },
                    children: [
                      { type: 'Icon', props: { name: 'Play', size: 32 } },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.duration}' },
                    ],
                  },
                  { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                  { type: 'Text', props: { variant: 'sm' }, children: '{item.views} · {item.uploaded}' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

export default YOUTUBE_CHANNEL_PAGE;
