import type { PageData } from '../../../types';
import { APP_STORE_THEME } from '../theme';

export const APP_STORE_APP_DETAIL_PAGE: PageData = {
  id: 'app-store-app-detail',
  name: 'App Detail',
  description: 'Single app detail page with screenshots, description, and the Get button.',
  layoutType: 'app-store',
  themeVars: APP_STORE_THEME,
  sections: [
    {
      id: 'app-header',
      name: 'App Header',
      body: [
        {
          type: 'Row',
          props: { gap: 3 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Row',
                      props: { gap: 3, align: 'center', justify: 'between' },
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Avatar', props: { initials: 'FF', size: 'xl' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 1 },
                              children: [
                                { type: 'Title', props: { variant: 'h3' }, children: 'Focus Flow' },
                                { type: 'Text', props: { variant: 'sm' }, children: 'Productivity · Tasks & Planning' },
                                {
                                  type: 'Row',
                                  props: { gap: 2, align: 'center' },
                                  children: [
                                    { type: 'Rating', props: { value: 4.8, max: 5 } },
                                    { type: 'Text', props: { variant: 'sm' }, children: '24.3K Ratings' },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Get' },
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
      id: 'screenshots',
      name: 'Screenshots',
      body: [
        {
          type: 'Row',
          props: { gap: 2 },
          dataSource: 'appstore.app.screenshots',
          itemTemplate: {
            type: 'Image',
            props: { src: '{item.src}', alt: '{item.alt}', width: '{item.width}', height: '{item.height}' },
          },
        },
      ],
    },
    {
      id: 'description',
      name: 'Description',
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
                  children: [{ type: 'Title', props: { variant: 'h5' }, children: 'What\'s New' }],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Text',
                      props: { variant: 'default' },
                      children: 'Focus Flow helps you plan your day around deep work. Version 3.2 adds calendar sync, weekly reviews, and a redesigned timer with ambient soundscapes.',
                    },
                    { type: 'Divider' },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'Age 4+' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: '128 MB' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'In-App Purchases' },
                      ],
                    },
                  ],
                },
                {
                  type: 'CardFooter',
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md', iconLeft: 'Home' }, children: 'Get' },
                    { type: 'Button', props: { variant: 'ghost', size: 'md', iconLeft: 'Share2' }, children: 'Share' },
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

export default APP_STORE_APP_DETAIL_PAGE;
