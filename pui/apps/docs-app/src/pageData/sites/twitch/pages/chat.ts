import type { PageData } from '../../../types';
import { TWITCH_THEME } from '../theme';

export const TWITCH_CHAT_PAGE: PageData = {
  id: 'twitch-chat',
  name: 'Twitch Chat',
  description: 'Live chat view with messages, emotes, and chat input.',
  layoutType: 'twitch',
  themeVars: TWITCH_THEME,
  sections: [
    {
      id: 'chat-header',
      name: 'Chat Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 1 },
          children: [
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Title', props: { variant: 'h2' }, children: 'Stream Chat' },
                { type: 'Badge', props: { variant: 'primary' }, children: '12,847 online' },
              ],
            },
            { type: 'Text', props: { variant: 'sm' }, children: 'Welcome to the chat room! Be kind and follow community guidelines.' },
          ],
        },
      ],
    },
    {
      id: 'chat-messages',
      name: 'Chat Messages',
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
                  props: { direction: 'column', gap: 1 },
                  dataSource: 'twitch.chat.messages',
                  itemTemplate: {
                    type: 'Text',
                    props: { variant: 'sm' },
                    children: '{item.user}: {item.text}',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chat-emotes',
      name: 'Emotes',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h3' }, children: 'Emotes' },
            {
              type: 'Row',
              props: { gap: 2, wrap: true },
              dataSource: 'twitch.emotes',
              itemTemplate: {
                type: 'Badge',
                props: { variant: 'primary' },
                children: '{item.name}',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'chat-input',
      name: 'Chat Input',
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
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Input', props: { placeholder: 'Send a message', defaultValue: '' } },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Chat' },
                      ],
                    },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Emote' },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Gift Sub' },
                        { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Channel Points' },
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
};

export default TWITCH_CHAT_PAGE;
