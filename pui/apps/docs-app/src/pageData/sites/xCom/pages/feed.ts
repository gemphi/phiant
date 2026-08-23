import type { PageData } from '../../../types';
import { X_COM_THEME } from '../theme';

export const X_COM_FEED_PAGE: PageData = {
  id: 'x-com-feed',
  name: 'X.com Home Feed',
  description: 'Home timeline with a stories/spaces rail, composer, scrolling posts, and a who-to-follow list.',
  layoutType: 'x-com',
  themeVars: X_COM_THEME,
  sections: [
    {
      id: 'stories-spaces',
      name: 'Stories & Spaces',
      body: [
        {
          type: 'Row',
          props: { gap: 3 },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'AK', size: 'lg' } },
                { type: 'Text', props: { variant: 'sm' }, children: 'Ada Kim' },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'JD', size: 'lg' } },
                { type: 'Text', props: { variant: 'sm' }, children: 'Jordan Diaz' },
              ],
            },
            {
              type: 'Card',
              props: { hoverable: true },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Badge', props: { variant: 'error' }, children: 'LIVE' },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 0 },
                          children: [
                            { type: 'Title', props: { variant: 'h6' }, children: 'Design Systems at Scale' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Spaces · 1.2K listening' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'MR', size: 'lg' } },
                { type: 'Text', props: { variant: 'sm' }, children: 'Maya Reyes' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'composer',
      name: 'Composer',
      body: [
        {
          type: 'Row',
          props: { gap: 3 },
          children: [
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
                                {
                                  type: 'Row',
                                  props: { gap: 2 },
                                  children: [
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Search' } },
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Bell' } },
                                  ],
                                },
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
            },
          ],
        },
      ],
    },
    {
      id: 'feed',
      name: 'Feed',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'x.feed.tweets',
          itemTemplate: {
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
                      { type: 'Avatar', props: { src: '{item.avatar}', size: 'sm' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.author} {item.handle} · {item.time}' },
                          { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                          {
                            type: 'Stack',
                            props: { direction: 'row', justify: 'between' },
                            children: [
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: '{item.replies}' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' }, children: '{item.reposts}' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Heart' }, children: '{item.likes}' },
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
        },
      ],
    },
    {
      id: 'who-to-follow',
      name: 'Who to follow',
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
                  children: [{ type: 'Title', props: { variant: 'h5' }, children: 'Who to follow' }],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 3 },
                      dataSource: 'x.whoToFollow',
                      itemTemplate: {
                        type: 'Row',
                        props: { justify: 'between', align: 'center' },
                        children: [
                          {
                            type: 'Row',
                            props: { gap: 2, align: 'center' },
                            children: [
                              { type: 'Avatar', props: { src: '{item.avatar}', size: 'sm' } },
                              {
                                type: 'Stack',
                                props: { direction: 'column', gap: 0 },
                                children: [
                                  { type: 'Title', props: { variant: 'h6' }, children: '{item.name}' },
                                  { type: 'Text', props: { variant: 'sm' }, children: '{item.handle}' },
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
                  children: [{ type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Show more' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default X_COM_FEED_PAGE;
