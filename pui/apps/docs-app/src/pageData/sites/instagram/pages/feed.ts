import type { PageData } from '../../../types';
import { INSTAGRAM_THEME } from '../theme';

export const INSTAGRAM_FEED_PAGE: PageData = {
  id: 'instagram-feed',
  name: 'Instagram Home Feed',
  description: 'Single-column feed with a stories rail, posts with media, likes, captions and comments, plus a sidebar with profile summary and suggested followers.',
  layoutType: 'instagram',
  themeVars: INSTAGRAM_THEME,
  sections: [
    {
      id: 'feed-stories',
      name: 'Stories Rail',
      body: [
        {
          type: 'Row',
          props: { gap: 3 },
          dataSource: 'instagram.stories',
          itemTemplate: {
            type: 'Stack',
            props: { direction: 'column', gap: 1, align: 'center' },
            children: [
              { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.author}', size: 'lg' } },
              { type: 'Text', props: { variant: 'sm' }, children: '{item.handle}' },
            ],
          },
        },
      ],
    },
    {
      id: 'feed-posts',
      name: 'Posts',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          dataSource: 'instagram.feed.posts',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: false },
            children: [
              {
                type: 'CardHeader',
                children: [
                  {
                    type: 'Row',
                    props: { justify: 'between', align: 'center' },
                    children: [
                      {
                        type: 'Row',
                        props: { gap: 2, align: 'center' },
                        children: [
                          { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.author}', size: 'sm' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h6' }, children: '{item.handle}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.location}' },
                            ],
                          },
                        ],
                      },
                      { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MoreHorizontal' } },
                    ],
                  },
                ],
              },
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 2 },
                    children: [
                      { type: 'Span', props: { className: 'image-placeholder', style: { aspectRatio: '1 / 1', background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)', borderRadius: '8px', minHeight: '300px' } } },
                      {
                        type: 'Row',
                        props: { justify: 'between', align: 'center' },
                        children: [
                          {
                            type: 'Row',
                            props: { gap: 3, align: 'center' },
                            children: [
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' } },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' } },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' } },
                            ],
                          },
                          { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Play' } },
                        ],
                      },
                      { type: 'Text', props: { variant: 'default', weight: 'bold' }, children: '{item.likes} likes' },
                      { type: 'Text', props: { variant: 'default' }, children: '{item.handle} {item.caption}' },
                      { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'View all {item.comments} comments' },
                      { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '{item.time}' },
                    ],
                  },
                ],
              },
              {
                type: 'CardFooter',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'center' },
                    children: [
                      { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' } },
                      { type: 'Input', props: { placeholder: 'Add a comment...', type: 'text' } },
                      { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Post' },
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
      id: 'feed-sidebar',
      name: 'Sidebar',
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
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Row',
                      props: { justify: 'between', align: 'center', gap: 2 },
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 2, align: 'center' },
                          children: [
                            { type: 'Avatar', props: { initials: 'U', size: 'md' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 0 },
                              children: [
                                { type: 'Title', props: { variant: 'h6' }, children: 'your.username' },
                                { type: 'Text', props: { variant: 'sm' }, children: 'Your Name' },
                              ],
                            },
                          ],
                        },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Switch' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardHeader',
                  children: [
                    {
                      type: 'Row',
                      props: { justify: 'between', align: 'center' },
                      children: [
                        { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'Suggested for you' },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'See All' },
                      ],
                    },
                  ],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 3 },
                      dataSource: 'instagram.suggested',
                      itemTemplate: {
                        type: 'Row',
                        props: { justify: 'between', align: 'center' },
                        children: [
                          {
                            type: 'Row',
                            props: { gap: 2, align: 'center' },
                            children: [
                              { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.name}', size: 'sm' } },
                              {
                                type: 'Stack',
                                props: { direction: 'column', gap: 0 },
                                children: [
                                  { type: 'Title', props: { variant: 'h6' }, children: '{item.handle}' },
                                  { type: 'Text', props: { variant: 'sm' }, children: '{item.mutuals} mutual connections' },
                                ],
                              },
                            ],
                          },
                          { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Follow' },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: 'CardFooter',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 2 },
                          children: [
                            { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'About' },
                            { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'Help' },
                            { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'Press' },
                            { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'API' },
                          ],
                        },
                        { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '© 2024 Instagram clone' },
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
};

export default INSTAGRAM_FEED_PAGE;
