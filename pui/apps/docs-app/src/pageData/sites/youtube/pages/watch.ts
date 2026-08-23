import type { PageData } from '../../../types';
import { YOUTUBE_THEME } from '../theme';

export const YOUTUBE_WATCH_PAGE: PageData = {
  id: 'youtube-watch',
  name: 'YouTube Watch',
  description: 'Single video page with player, channel info, actions, comments, and related videos.',
  layoutType: 'youtube',
  themeVars: YOUTUBE_THEME,
  sections: [
    {
      id: 'video-player',
      name: 'Video Player',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'youtube-player' },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2, align: 'center' },
                      children: [
                        { type: 'Icon', props: { name: 'Play', size: 48 } },
                        { type: 'Text', props: { variant: 'sm' }, children: 'Video player placeholder · 12:04' },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: 'Title', props: { variant: 'h4' }, children: 'Building a Design System from Scratch' },
            { type: 'Text', props: { variant: 'sm' }, children: '482K views · 3 days ago' },
            {
              type: 'Row',
              props: { justify: 'between', align: 'center' },
              children: [
                {
                  type: 'Row',
                  props: { gap: 3, align: 'center' },
                  children: [
                    { type: 'Avatar', props: { initials: 'BB', size: 'md' } },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 0 },
                      children: [
                        { type: 'Title', props: { variant: 'h6' }, children: 'Bright Byte' },
                        { type: 'Text', props: { variant: 'sm' }, children: '1.4M subscribers' },
                      ],
                    },
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Subscribe' },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'ThumbsUp' }, children: '24K' },
                    { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'ThumbsDown' } },
                    { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'Share2' }, children: 'Share' },
                    { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'Cast' } },
                    { type: 'Button', props: { variant: 'secondary', size: 'sm', iconLeft: 'MoreHorizontal' } },
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
                    {
                      type: 'Text',
                      props: { variant: 'default' },
                      children: 'In this video we walk through how to build a scalable, data-driven design system component library from the ground up, covering tokens, theming, and a component registry.',
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
            { type: 'Title', props: { variant: 'h5' }, children: '1,204 Comments' },
            {
              type: 'Row',
              props: { gap: 2, align: 'start' },
              children: [
                { type: 'Avatar', props: { initials: 'U', size: 'sm' } },
                { type: 'Input', props: { placeholder: 'Add a comment...', type: 'text' } },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              dataSource: 'youtube.watch.comments',
              itemTemplate: {
                type: 'Row',
                props: { gap: 2, align: 'start' },
                children: [
                  { type: 'Avatar', props: { initials: '{item.avatar}', size: 'sm' } },
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0 },
                    children: [
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.handle} · {item.time}' },
                      { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                      {
                        type: 'Row',
                        props: { gap: 2 },
                        children: [
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ThumbsUp' }, children: '{item.likes}' },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ThumbsDown' } },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Reply' },
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
      id: 'related-videos',
      name: 'Related Videos',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h6' }, children: 'Up next' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              dataSource: 'youtube.watch.related',
              itemTemplate: {
                type: 'Row',
                props: { gap: 2, align: 'start' },
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0, align: 'center', className: 'youtube-thumbnail' },
                    children: [{ type: 'Icon', props: { name: 'Play', size: 24 } }],
                  },
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0 },
                    children: [
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.channel} · {item.views}' },
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

export default YOUTUBE_WATCH_PAGE;
