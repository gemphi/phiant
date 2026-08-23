import type { PageData } from '../../../types';
import { X_COM_THEME } from '../theme';

export const X_COM_PROFILE_PAGE: PageData = {
  id: 'x-com-profile',
  name: 'X.com Profile',
  description: 'User profile page with cover, stats, and post/reply tabs.',
  layoutType: 'x-com',
  themeVars: X_COM_THEME,
  sections: [
    {
      id: 'profile-header',
      name: 'Profile Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
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
                      props: { justify: 'between', align: 'start' },
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Avatar', props: { initials: 'AK', size: 'xl' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 0 },
                              children: [
                                { type: 'Title', props: { variant: 'h4' }, children: 'Ada Kim' },
                                { type: 'Text', props: { variant: 'sm' }, children: '@adakim' },
                              ],
                            },
                          ],
                        },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Edit profile' },
                      ],
                    },
                    { type: 'Text', props: { variant: 'default' }, children: 'Product designer building better tools for creators. Coffee enthusiast.' },
                    {
                      type: 'Row',
                      props: { gap: 4 },
                      children: [
                        { type: 'Text', props: { variant: 'sm' }, children: '812 Following' },
                        { type: 'Text', props: { variant: 'sm' }, children: '14.2K Followers' },
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
      id: 'profile-tabs',
      name: 'Profile Tabs',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          children: [
            { type: 'Badge', props: { variant: 'primary' }, children: 'Posts' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Replies' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Highlights' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Media' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Likes' },
          ],
        },
      ],
    },
    {
      id: 'profile-posts',
      name: 'Posts',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'x.profile.tweets',
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
                      { type: 'Avatar', props: { initials: 'AK', size: 'sm' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h6' }, children: 'Ada Kim @adakim · {item.time}' },
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
  ],
};

export default X_COM_PROFILE_PAGE;
