import type { PageData } from '../../../types';
import { SPOTIFY_THEME } from '../theme';

export const SPOTIFY_WELCOME_PAGE: PageData = {
  id: 'spotify-welcome',
  name: 'Spotify Home',
  description: 'Home page with featured playlists, recent plays, and categories.',
  layoutType: 'spotify',
  themeVars: SPOTIFY_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Good Evening',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Good evening' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 2 },
              dataSource: 'spotify.hero.playlists',
              itemTemplate: {
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
                          { type: 'Image', props: { src: '{item.cover}', alt: '{item.name}' } },
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
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
    },
    {
      id: 'welcome-playlists',
      name: 'Featured Playlists',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Made for you' },
            {
              type: 'Grid',
              props: { columns: 5, gap: 3 },
              dataSource: 'spotify.playlists',
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
                          { type: 'Image', props: { src: '{item.cover}', alt: '{item.name}' } },
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
                          { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Play' },
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
    },
    {
      id: 'welcome-recent',
      name: 'Recently Played',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Recently played' },
            {
              type: 'Grid',
              props: { columns: 5, gap: 2 },
              dataSource: 'spotify.recent',
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
                          { type: 'Image', props: { src: '{item.cover}', alt: '{item.title}' } },
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.artist} · {item.playedAt}' },
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
    },
    {
      id: 'welcome-categories',
      name: 'Browse Categories',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Browse all' },
            {
              type: 'Grid',
              props: { columns: 5, gap: 2 },
              dataSource: 'spotify.categories',
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
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.playlistCount} playlists' },
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
    },
  ],
};

export default SPOTIFY_WELCOME_PAGE;
