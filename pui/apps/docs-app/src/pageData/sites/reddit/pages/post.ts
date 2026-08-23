import type { PageData } from '../../../types';
import { REDDIT_THEME } from '../theme';

export const REDDIT_POST_PAGE: PageData = {
  id: 'reddit-post',
  name: 'Reddit Post Detail',
  description: 'Post detail with full content, vote bar, and nested comments.',
  layoutType: 'reddit',
  themeVars: REDDIT_THEME,
  sections: [
    {
      id: 'post-detail',
      name: 'Post Detail',
      dataSource: 'reddit.post.detail',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Row',
                  props: { gap: 2, align: 'start' },
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1, align: 'center' },
                      children: [
                        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigUp' } },
                        { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '2.4k' },
                        { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigDown' } },
                      ],
                    },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2 },
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 1, align: 'center' },
                          children: [
                            { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: 'r/programming' },
                            { type: 'Text', props: { variant: 'sm' }, children: '· Posted by u/code_master · 4h' },
                          ],
                        },
                        { type: 'Title', props: { variant: 'h3' }, children: 'TypeScript 5.4 is out — what are the best new features?' },
                        { type: 'Text', props: { variant: 'default' }, children: 'The new NoInfer utility type and improved type narrowing are game changers. Here\'s a breakdown of what changed and how to use it in your projects.' },
                        { type: 'Text', props: { variant: 'default' }, children: 'Key highlights: NoInfer<T> prevents unwanted type inference in generic functions, the new Object.groupBy and Map.groupBy methods, and better narrowing for closures in loops. The release also includes performance improvements to incremental builds.' },
                        {
                          type: 'Row',
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'MessageCircle' }, children: '387 Comments' },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Share2' }, children: 'Share' },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Bookmark' }, children: 'Save' },
                            { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Award' }, children: 'Award' },
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
      id: 'comment-composer',
      name: 'Comment Composer',
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
                    { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: 'Comment as u/current_user' },
                    { type: 'Textarea', props: { placeholder: 'What are your thoughts?', rows: 4 } },
                    {
                      type: 'Row',
                      props: { gap: 2, justify: 'end' },
                      children: [
                        { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Cancel' },
                        { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Comment' },
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
      header: { type: 'Title', props: { variant: 'h5' }, children: '387 Comments' },
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'reddit.post.comments',
          itemTemplate: {
            type: 'Row',
            props: { gap: 2, align: 'start' },
            children: [
              { type: 'Avatar', props: { initials: '{item.avatar}', size: 'sm' } },
              {
                type: 'Stack',
                props: { direction: 'column', gap: 1 },
                children: [
                  {
                    type: 'Row',
                    props: { gap: 1, align: 'center' },
                    children: [
                      { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '{item.author}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '· {item.time} · {item.score} points' },
                    ],
                  },
                  { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                  {
                    type: 'Row',
                    props: { gap: 2 },
                    children: [
                      { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigUp' }, children: '{item.score}' },
                      { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'ArrowBigDown' } },
                      { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Reply' },
                      { type: 'Button', props: { variant: 'ghost', size: 'sm', iconLeft: 'Award' } },
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

export default REDDIT_POST_PAGE;
