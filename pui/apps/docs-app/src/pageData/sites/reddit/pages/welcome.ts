import type { PageData } from '../../../types';
import { REDDIT_THEME } from '../theme';

export const REDDIT_WELCOME_PAGE: PageData = {
  id: 'reddit-welcome',
  name: 'Reddit Home',
  description: 'Home feed with sort tabs, post cards, and trending sidebar.',
  layoutType: 'reddit',
  themeVars: REDDIT_THEME,
  sections: [
    {
      id: 'sort-bar',
      name: 'Sort Bar',
      body: [
        {
          type: 'Row',
          props: { gap: 2, align: 'center' },
          children: [
            { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Hot' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'New' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Top' },
            { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Rising' },
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
                          {
                            type: 'Row',
                            props: { gap: 1, align: 'center' },
                            children: [
                              { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '{item.subreddit}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '· {item.postedAgo} · Posted by {item.author}' },
                            ],
                          },
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.title}' },
                          { type: 'Badge', props: { variant: 'secondary' }, children: '{item.flair}' },
                          {
                            type: 'Row',
                            props: { gap: 3, align: 'center' },
                            children: [
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigUp' }, children: '{item.score}' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigDown' } },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: '{item.commentCount} Comments' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' }, children: 'Share' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Bookmark' }, children: 'Save' },
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
      id: 'trending-communities',
      name: 'Trending Communities',
      header: { type: 'Title', props: { variant: 'h5' }, children: 'Trending Communities' },
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'reddit.trending',
          itemTemplate: {
            type: 'Row',
            props: { gap: 2, align: 'center' },
            children: [
              { type: 'Avatar', props: { initials: 'r/', size: 'sm' } },
              {
                type: 'Stack',
                props: { direction: 'column', gap: 0 },
                children: [
                  { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '{item.name}' },
                  { type: 'Text', props: { variant: 'sm' }, children: '{item.members} members' },
                ],
              },
              { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Join' },
            ],
          },
        },
      ],
    },
  ],
};

export default REDDIT_WELCOME_PAGE;
