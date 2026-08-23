import type { PageData } from '../../../types';
import { APP_STORE_THEME } from '../theme';

export const APP_STORE_ABOUT_PAGE: PageData = {
  id: 'app-store-about',
  name: 'About the App Store',
  description: 'Editorial page describing the App Store mission, safety, and stats.',
  layoutType: 'app-store',
  themeVars: APP_STORE_THEME,
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
          props: { hoverable: false, className: 'app-hero' },
          children: [
            {
              type: 'CardBody',
              children: [
                { type: 'Badge', props: { variant: 'primary' }, children: 'Our Story' },
                { type: 'Title', props: { variant: 'h2' }, children: 'A world of apps, curated for you' },
                {
                  type: 'Text',
                  props: { variant: 'default' },
                  children: 'The App Store is a safe and trusted place to discover apps that meet our high standards for privacy, security, and content.',
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md', iconLeft: 'Search' }, children: 'Explore Apps' },
                    { type: 'Button', props: { variant: 'ghost', size: 'md' }, children: 'Developer Program' },
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
                { type: 'Title', props: { variant: 'h3' }, children: '1.8M+' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Apps available worldwide' },
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
                { type: 'Title', props: { variant: 'h3' }, children: '175' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Countries and regions served' },
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
                { type: 'Title', props: { variant: 'h3' }, children: '$1.1T' },
                { type: 'Text', props: { variant: 'sm' }, children: 'Developer billings and sales facilitated' },
              ],
            },
          ],
        },
        ],
        },
      ],
    },
    {
      id: 'about-principles',
      name: 'Our Principles',
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
              children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Trust & Safety' }],
            },
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Text', props: { variant: 'default' }, children: 'Every app is reviewed by a human before it reaches you.' },
                    { type: 'Divider' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Privacy labels tell you what data an app collects before you download it.' },
                    { type: 'Divider' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Parental controls help families choose age-appropriate apps.' },
                  ],
                },
              ],
            },
            {
              type: 'CardFooter',
              children: [
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Human Review' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Privacy Labels' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Family Sharing' },
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

export default APP_STORE_ABOUT_PAGE;
