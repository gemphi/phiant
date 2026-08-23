import type { PageData } from '../../../types';
import { TIKTOK_THEME } from '../theme';

export const TIKTOK_ABOUT_PAGE: PageData = {
  id: 'tiktok-about',
  name: 'About TikTok',
  description: 'Mission statement, community guidelines, and platform stats.',
  layoutType: 'tiktok',
  themeVars: TIKTOK_THEME,
  sections: [
    {
      id: 'about-hero',
      name: 'About Hero',
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
                { type: 'Badge', props: { variant: 'primary' }, children: 'Our Mission' },
                { type: 'Title', props: { variant: 'h2' }, children: 'Inspire creativity, bring joy' },
                {
                  type: 'Text',
                  props: { variant: 'default' },
                  children: 'TikTok is the leading destination for short-form mobile video, giving everyone the tools to become a creator.',
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Get the app' },
                    { type: 'Button', props: { variant: 'ghost', size: 'md' }, children: 'Creator Portal' },
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
      id: 'about-stats',
      name: 'By the Numbers',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          children: [
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h3' }, children: '1.5B+' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Monthly active users' },
              ],
            },
          ],
        },
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h3' }, children: '150+' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Countries and regions' },
              ],
            },
          ],
        },
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Title', props: { variant: 'h3' }, children: '75+' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Languages supported' },
              ],
            },
          ],
        },
        ],
        },
      ],
    },
    {
      id: 'about-safety',
      name: 'Community & Safety',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardHeader',
              children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Safety by design' }],
            },
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Text', props: { variant: 'default' }, children: 'Family Pairing lets parents manage screen time and content settings.' },
                    { type: 'Divider' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Our community guidelines are enforced by a mix of technology and human moderators.' },
                  ],
                },
              ],
            },
            {
              type: 'CardFooter',
              children: [
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Family Pairing' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Content Moderation' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Screen Time' },
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

export default TIKTOK_ABOUT_PAGE;
