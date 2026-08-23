import type { PageData } from '../../../types';
import { LINKEDIN_THEME } from '../theme';

export const LINKEDIN_WELCOME_PAGE: PageData = {
  id: 'linkedin-welcome',
  name: 'LinkedIn Feed',
  description: 'Professional feed with posts, suggestions, and trending content.',
  layoutType: 'linkedin',
  themeVars: LINKEDIN_THEME,
  sections: [
    {
      id: 'feed-hero',
      name: 'Feed Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'LinkedIn' },
            { type: 'Title', props: { variant: 'h4' }, children: 'Welcome back, Sarah — here is what is happening in your network.' },
          ],
        },
      ],
    },
    {
      id: 'feed-composer',
      name: 'Share Post',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Avatar', props: { src: 'https://i.pravatar.cc/150?img=47', alt: 'Sarah Chen', size: 'md' } },
                        { type: 'Text', props: { variant: 'default' }, children: 'Start a post, Sarah…' },
                      ],
                    },
                    {
                      type: 'Row',
                      props: { gap: 2, justify: 'start' },
                      children: [
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Photo' },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Video' },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Document' },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Write Article' },
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
      id: 'feed-posts',
      name: 'Feed Posts',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          dataSource: 'linkedin.feed.posts',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 2 },
                    children: [
                      {
                        type: 'Row',
                        props: { gap: 2, align: 'center' },
                        children: [
                          { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.author}', size: 'md' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h4' }, children: '{item.author}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.title} at {item.company} · {item.time}' },
                            ],
                          },
                        ],
                      },
                      { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                      { type: 'Image', props: { src: '{item.image}', alt: 'Post image' } },
                      {
                        type: 'Row',
                        props: { gap: 2 },
                        children: [
                          { type: 'Badge', props: { variant: 'primary' }, children: '{item.likes} Likes' },
                          { type: 'Badge', props: { variant: 'secondary' }, children: '{item.comments} Comments' },
                          { type: 'Badge', props: { variant: 'secondary' }, children: '{item.reposts} Reposts' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'feed-suggestions',
      name: 'People You May Know',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'People You May Know' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 2 },
              dataSource: 'linkedin.connections',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: true },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1, align: 'center' },
                        children: [
                          { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.name}', size: 'lg' } },
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.title} at {item.company}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.mutual} mutual connections' },
                          { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Connect' },
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
  ],
};

export default LINKEDIN_WELCOME_PAGE;
