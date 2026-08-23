import type { PageData } from '../../../types';
import { YOUTUBE_THEME } from '../theme';

export const YOUTUBE_WELCOME_PAGE: PageData = {
  id: 'youtube-welcome',
  name: 'YouTube Welcome',
  description: 'Landing page with hero search, category chips, and a grid of trending videos.',
  layoutType: 'youtube',
  themeVars: YOUTUBE_THEME,
  sections: [
    {
      id: 'hero-search',
      name: 'Hero Search',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1, align: 'center' },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Enjoy the videos you love' },
                { type: 'Text', props: { variant: 'default' }, children: 'Search, watch, and share what matters to you.' },
              ],
            },
            {
              type: 'Row',
              props: { gap: 2, justify: 'center', align: 'center' },
              children: [
                { type: 'Input', props: { placeholder: 'Search', type: 'text' } },
                { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Search' }, children: 'Search' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'category-chips',
      name: 'Category Chips',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'youtube.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'trending-videos',
      name: 'Trending Videos',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'youtube.trending',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0, align: 'center', className: 'youtube-thumbnail' },
                    children: [
                      { type: 'Icon', props: { name: 'Play', size: 32 } },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.duration}' },
                    ],
                  },
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0 },
                    children: [
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.channel}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.views}' },
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

export default YOUTUBE_WELCOME_PAGE;
