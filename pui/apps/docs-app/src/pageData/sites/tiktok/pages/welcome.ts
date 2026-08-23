import type { PageData } from '../../../types';
import { TIKTOK_THEME } from '../theme';

export const TIKTOK_WELCOME_PAGE: PageData = {
  id: 'tiktok-welcome',
  name: 'TikTok Welcome',
  description: 'Landing hero with a call to action and trending hashtags.',
  layoutType: 'tiktok',
  themeVars: TIKTOK_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Welcome Hero',
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
                    { type: 'Title', props: { variant: 'h1' }, children: 'Make Your Day' },
                    {
                      type: 'Text',
                      props: { variant: 'default' },
                      children: 'Discover videos made for you. Follow your favorite creators and start scrolling.',
                    },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Log in' },
                        { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Sign up' },
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
      id: 'trending-hashtags',
      name: 'Trending Hashtags',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'tiktok.trending.hashtags',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.tag}',
          },
        },
      ],
    },
    {
      id: 'trending-creators',
      name: 'Trending Creators',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'tiktok.trending.creators',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  { type: 'Avatar', props: { initials: '{item.avatar}', size: 'lg' } },
                  { type: 'Title', props: { variant: 'h6' }, children: '{item.handle}' },
                  { type: 'Text', props: { variant: 'sm' }, children: '{item.followers} followers' },
                  { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Follow' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

export default TIKTOK_WELCOME_PAGE;
