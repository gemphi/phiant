import type { PageData } from '../../../types';
import { REDDIT_THEME } from '../theme';

export const REDDIT_SUBREDDIT_PAGE: PageData = {
  id: 'reddit-subreddit',
  name: 'Reddit Subreddit',
  description: 'Subreddit page with community banner, about panel, and post feed.',
  layoutType: 'reddit',
  themeVars: REDDIT_THEME,
  sections: [
    {
      id: 'subreddit-banner',
      name: 'Subreddit Banner',
      dataSource: 'reddit.subreddit.info',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'reddit-banner' },
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
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Avatar', props: { initials: 'r/', size: 'lg' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 0 },
                              children: [
                                { type: 'Title', props: { variant: 'h3' }, children: 'r/programming' },
                                { type: 'Text', props: { variant: 'sm' }, children: '4.2M members · 3.1k online' },
                              ],
                            },
                            { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Join' },
                          ],
                        },
                        { type: 'Text', props: { variant: 'default' }, children: 'Computer programming articles, tutorials, and discussions. Share your knowledge and learn from the community.' },
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
      id: 'subreddit-rules',
      name: 'Rules',
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
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Title', props: { variant: 'h6' }, children: 'Community Rules' },
                    { type: 'Text', props: { variant: 'sm' }, children: '1. Be respectful — no personal attacks or harassment.' },
                    { type: 'Text', props: { variant: 'sm' }, children: '2. Posts must be directly about programming.' },
                    { type: 'Text', props: { variant: 'sm' }, children: '3. No self-promotion without context.' },
                    { type: 'Text', props: { variant: 'sm' }, children: '4. Use appropriate flair for your post.' },
                    { type: 'Text', props: { variant: 'sm' }, children: '5. No clickbait titles.' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'subreddit-posts',
      name: 'Posts',
      header: { type: 'Title', props: { variant: 'h5' }, children: 'Recent Posts' },
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'reddit.posts',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'start' },
                    children: [
                      { type: 'Avatar', props: { initials: 'r/', size: 'sm' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Text', props: { variant: 'sm' }, children: 'Posted by {item.author} · {item.postedAgo}' },
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.commentCount} Comments · {item.score} upvotes' },
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
  ],
};

export default REDDIT_SUBREDDIT_PAGE;
