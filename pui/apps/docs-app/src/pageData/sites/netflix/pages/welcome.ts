import type { PageData } from '../../../types';
import { NETFLIX_THEME } from '../theme';

export const NETFLIX_WELCOME_PAGE: PageData = {
  id: 'netflix-welcome',
  name: 'Netflix Browse',
  description: 'Landing page with cinematic hero banner and content rows.',
  layoutType: 'netflix',
  themeVars: NETFLIX_THEME,
  sections: [
    {
      id: 'hero-banner',
      name: 'Hero Banner',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'netflix-hero' },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2 },
                      children: [
                        { type: 'Badge', props: { variant: 'primary' }, children: 'Netflix Original' },
                        { type: 'Title', props: { variant: 'h1' }, children: 'Stranger Things' },
                        { type: 'Text', props: { variant: 'default' }, children: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.' },
                        {
                          type: 'Row',
                          props: { gap: 2, align: 'center' },
                          children: [
                            { type: 'Button', props: { variant: 'primary', size: 'md', iconLeft: 'Play' }, children: 'Play' },
                            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Info' }, children: 'More Info' },
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
      id: 'category-chips',
      name: 'Categories',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'netflix.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'trending-row',
      name: 'Trending Now',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'Trending Now' },
      body: [
        {
          type: 'Grid',
          props: { columns: 5, gap: 2 },
          dataSource: 'netflix.trending',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 1 },
                    children: [
                      { type: 'Icon', props: { name: 'Film', size: 32 } },
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.year} · {item.seasons}' },
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
      id: 'new-releases-row',
      name: 'New Releases',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'New Releases' },
      body: [
        {
          type: 'Grid',
          props: { columns: 5, gap: 2 },
          dataSource: 'netflix.newReleases',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 1 },
                    children: [
                      { type: 'Icon', props: { name: 'Film', size: 32 } },
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.year} · {item.type}' },
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

export default NETFLIX_WELCOME_PAGE;
