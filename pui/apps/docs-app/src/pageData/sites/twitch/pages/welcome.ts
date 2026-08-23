import type { PageData } from '../../../types';
import { TWITCH_THEME } from '../theme';

export const TWITCH_WELCOME_PAGE: PageData = {
  id: 'twitch-welcome',
  name: 'Twitch Browse',
  description: 'Browse live channels, categories, and recommended streamers.',
  layoutType: 'twitch',
  themeVars: TWITCH_THEME,
  sections: [
    {
      id: 'browse-header',
      name: 'Browse Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Browse' },
            { type: 'Text', props: { variant: 'lg' }, children: 'Discover live streams across every game and category.' },
            {
              type: 'Row',
              props: { gap: 2, wrap: true },
              children: [
                { type: 'Badge', props: { variant: 'primary' }, children: 'Just Chatting' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'League of Legends' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Grand Theft Auto V' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'VALORANT' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Counter-Strike 2' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Minecraft' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Dota 2' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'browse-live',
      name: 'Live Channels',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Live Channels We Think You Will Like' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 3 },
              dataSource: 'twitch.streams',
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
                          { type: 'Image', props: { src: '{item.thumbnail}', alt: 'Stream thumbnail' } },
                          {
                            type: 'Row',
                            props: { gap: 2, align: 'start' },
                            children: [
                              { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.streamer}', size: 'md' } },
                              {
                                type: 'Stack',
                                props: { direction: 'column', gap: 0 },
                                children: [
                                  { type: 'Title', props: { variant: 'h4' }, children: '{item.streamer}' },
                                  { type: 'Text', props: { variant: 'sm' }, children: '{item.game} · {item.language}' },
                                  { type: 'Badge', props: { variant: 'error' }, children: 'LIVE · {item.viewers} viewers' },
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
    },
    {
      id: 'browse-categories',
      name: 'Categories',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Top Categories' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'twitch.categories',
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
                          { type: 'Image', props: { src: '{item.image}', alt: '{item.name}' } },
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.viewers} viewers · {item.channels} channels' },
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

export default TWITCH_WELCOME_PAGE;
