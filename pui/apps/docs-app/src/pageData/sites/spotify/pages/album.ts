import type { PageData } from '../../../types';
import { SPOTIFY_THEME } from '../theme';

export const SPOTIFY_ALBUM_PAGE: PageData = {
  id: 'spotify-album',
  name: 'Spotify Album',
  description: 'Album detail page with track list, metadata, and artist info.',
  layoutType: 'spotify',
  themeVars: SPOTIFY_THEME,
  sections: [
    {
      id: 'album-header',
      name: 'Album Header',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'end' },
          children: [
            { type: 'Image', props: { src: 'https://picsum.photos/seed/afterhours/300/300', alt: 'After Hours' } },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                { type: 'Text', props: { variant: 'sm' }, children: 'Album' },
                { type: 'Title', props: { variant: 'h1' }, children: 'After Hours' },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Text', props: { variant: 'default' }, children: 'The Weeknd · 2020 · 14 songs · 47 min 32 sec' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Republic Records · R&B / Pop' },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Play' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Follow' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: '...' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'album-tracks',
      name: 'Track List',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Row',
              props: { gap: 2, justify: 'between' },
              children: [
                { type: 'Text', props: { variant: 'sm' }, children: '#' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Title' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Plays' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Duration' },
              ],
            },
            { type: 'Divider' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1 },
              dataSource: 'spotify.album.tracks',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: true },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Row',
                        props: { gap: 2, justify: 'between', align: 'center' },
                        children: [
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.trackNumber}' },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                              { type: 'Text', props: { variant: 'sm' }, children: 'The Weeknd' },
                            ],
                          },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.plays}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.duration}' },
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
      id: 'album-about',
      name: 'About Album',
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
                    { type: 'Title', props: { variant: 'h2' }, children: 'About After Hours' },
                    { type: 'Text', props: { variant: 'default' }, children: 'After Hours is the fourth studio album by Canadian singer The Weeknd. The album explores themes of heartbreak, escapism, and self-reflection, blending synth-pop, R&B, and new wave influences into a cinematic dark-pop experience.' },
                    {
                      type: 'Grid',
                      props: { columns: 3, gap: 2 },
                      children: [
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Released' },
                            { type: 'Text', props: { variant: 'default' }, children: 'March 20, 2020' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Label' },
                            { type: 'Text', props: { variant: 'default' }, children: 'Republic Records' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Genre' },
                            { type: 'Text', props: { variant: 'default' }, children: 'R&B / Pop' },
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
      id: 'album-more-tracks',
      name: 'More by The Weeknd',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Popular tracks' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'spotify.tracks',
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
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.plays} plays · {item.duration}' },
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

export default SPOTIFY_ALBUM_PAGE;
