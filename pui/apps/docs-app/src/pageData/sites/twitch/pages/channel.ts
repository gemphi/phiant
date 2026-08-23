import type { PageData } from '../../../types';
import { TWITCH_THEME } from '../theme';

export const TWITCH_CHANNEL_PAGE: PageData = {
  id: 'twitch-channel',
  name: 'Twitch Channel',
  description: 'Streamer channel with live stream, info, and clips.',
  layoutType: 'twitch',
  themeVars: TWITCH_THEME,
  sections: [
    {
      id: 'channel-stream',
      name: 'Live Stream',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Image', props: { src: 'https://picsum.photos/seed/twstream1/800/450', alt: 'Live stream' } },
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Badge', props: { variant: 'error' }, children: 'LIVE' },
                { type: 'Text', props: { variant: 'sm' }, children: '67,234 viewers' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Started 3h 24m ago' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'channel-info',
      name: 'Channel Info',
      body: [
        {
          type: 'Row',
          props: { gap: 3, align: 'start' },
          children: [
            { type: 'Avatar', props: { src: 'https://i.pravatar.cc/150?img=14', alt: 'xQc', size: 'xl' } },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Title', props: { variant: 'h1' }, children: 'xQc' },
                    { type: 'Badge', props: { variant: 'primary' }, children: 'Partner' },
                  ],
                },
                { type: 'Text', props: { variant: 'lg' }, children: '12.4M followers' },
                { type: 'Text', props: { variant: 'default' }, children: 'Just Chatting · English' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Reacting to internet drama and playing games. New videos every day on YouTube.' },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Follow' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Subscribe' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Gift a Sub' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'channel-clips',
      name: 'Popular Clips',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Popular Clips' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 2 },
              dataSource: 'twitch.clips',
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
                          { type: 'Image', props: { src: '{item.thumbnail}', alt: '{item.title}' } },
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Clipped by {item.clipper} · {item.views} views · {item.created}' },
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
    },
    {
      id: 'channel-followers',
      name: 'Recent Followers',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Recent Followers' },
            {
              type: 'Grid',
              props: { columns: 2, gap: 2 },
              dataSource: 'twitch.followers',
              itemTemplate: {
                type: 'Row',
                props: { gap: 2, align: 'center' },
                children: [
                  { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.name}', size: 'sm' } },
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0 },
                    children: [
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.name}' },
                      { type: 'Text', props: { variant: 'xs' }, children: 'followed {item.followedAt}' },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export default TWITCH_CHANNEL_PAGE;
