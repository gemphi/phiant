import type { PageData } from '../../../types';
import { SPOTIFY_THEME } from '../theme';

export const SPOTIFY_ARTIST_PAGE: PageData = {
  id: 'spotify-artist',
  name: 'Spotify Artist',
  description: 'Artist profile with bio, top tracks, discography, and popular albums.',
  layoutType: 'spotify',
  themeVars: SPOTIFY_THEME,
  sections: [
    {
      id: 'artist-header',
      name: 'Artist Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Title', props: { variant: 'h1' }, children: 'The Weeknd' },
                    { type: 'Badge', props: { variant: 'primary' }, children: 'Verified' },
                  ],
                },
                { type: 'Text', props: { variant: 'lg' }, children: '108.4M monthly listeners' },
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
      id: 'artist-popular',
      name: 'Popular Tracks',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Popular' },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1 },
              dataSource: 'spotify.tracks',
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
                          { type: 'Image', props: { src: '{item.cover}', alt: '{item.title}' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.album}' },
                            ],
                          },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.plays} plays' },
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
      id: 'artist-discography',
      name: 'Discography',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Discography' },
            {
              type: 'Grid',
              props: { columns: 5, gap: 3 },
              dataSource: 'spotify.artist.albums',
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
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.year} · {item.type} · {item.trackCount} songs' },
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
      id: 'artist-about',
      name: 'About',
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
                  props: { direction: 'column', gap: 3 },
                  children: [
                    { type: 'Title', props: { variant: 'h2' }, children: 'About' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Abel Tesfaye, known professionally as The Weeknd, is a Canadian singer-songwriter and record producer. Known for his versatility and dark lyricism, his music explores escapism, romance, and melancholia. He is one of the most-streamed artists of all time.' },
                    {
                      type: 'Grid',
                      props: { columns: 3, gap: 3 },
                      children: [
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Followers' },
                            { type: 'Title', props: { variant: 'h3' }, children: '45.2M' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Monthly Listeners' },
                            { type: 'Title', props: { variant: 'h3' }, children: '108.4M' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Text', props: { variant: 'sm' }, children: 'Genre' },
                            { type: 'Title', props: { variant: 'h4' }, children: 'R&B / Pop' },
                          ],
                        },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h4' }, children: 'Top Cities' },
                    {
                      type: 'Row',
                      props: { gap: 2, wrap: true },
                      dataSource: 'spotify.artist.topCities',
                      itemTemplate: {
                        type: 'Badge',
                        props: { variant: 'secondary' },
                        children: '{item}',
                      },
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
      id: 'artist-podcasts',
      name: 'Podcasts You Might Like',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Podcasts you might like' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'spotify.podcasts',
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
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.host} · {item.category}' },
                          { type: 'Rating', props: { value: '{item.rating}', max: 5, readOnly: true } },
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

export default SPOTIFY_ARTIST_PAGE;
