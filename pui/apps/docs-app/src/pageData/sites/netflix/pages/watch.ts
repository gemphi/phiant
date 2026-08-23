import type { PageData } from '../../../types';
import { NETFLIX_THEME } from '../theme';

export const NETFLIX_WATCH_PAGE: PageData = {
  id: 'netflix-watch',
  name: 'Netflix Title Detail',
  description: 'Title detail page with synopsis, episodes list, and related titles.',
  layoutType: 'netflix',
  themeVars: NETFLIX_THEME,
  sections: [
    {
      id: 'title-hero',
      name: 'Title Hero',
      dataSource: 'netflix.title.detail',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false, className: 'netflix-title-hero' },
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
                        {
                          type: 'Row',
                          props: { gap: 2, align: 'center' },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: '2022' },
                            { type: 'Badge', props: { variant: 'secondary' }, children: 'TV-14' },
                            { type: 'Text', props: { variant: 'sm' }, children: '4 Seasons' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'IMDb 8.7' },
                          ],
                        },
                        { type: 'Text', props: { variant: 'default' }, children: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.' },
                        {
                          type: 'Row',
                          props: { gap: 2, align: 'center' },
                          children: [
                            { type: 'Button', props: { variant: 'primary', size: 'md', iconLeft: 'Play' }, children: 'Play' },
                            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Plus' }, children: 'My List' },
                            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'ThumbsUp' } },
                            { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Share2' } },
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
      id: 'episodes',
      name: 'Episodes',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'Episodes' },
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'netflix.title.episodes',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 3, align: 'start' },
                    children: [
                      { type: 'Icon', props: { name: 'Play', size: 32 } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 0 },
                        children: [
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.number}. {item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.duration}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
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
      id: 'more-like-this',
      name: 'More Like This',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'More Like This' },
      body: [
        {
          type: 'Grid',
          props: { columns: 4, gap: 2 },
          dataSource: 'netflix.titles',
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
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.genre} · {item.seasons}' },
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

export default NETFLIX_WATCH_PAGE;
