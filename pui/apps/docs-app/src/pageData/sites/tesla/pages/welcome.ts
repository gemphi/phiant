import type { PageData } from '../../../types';
import { TESLA_THEME } from '../theme';

export const TESLA_WELCOME_PAGE: PageData = {
  id: 'tesla-welcome',
  name: 'Tesla Welcome',
  description: 'Model showcase landing with featured vehicles and category navigation.',
  layoutType: 'tesla',
  themeVars: TESLA_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Hero',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 4, align: 'center' },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Tesla' },
            { type: 'Title', props: { variant: 'h3' }, children: 'Accelerating the world\'s transition to sustainable energy.' },
            {
              type: 'Row',
              props: { gap: 2, justify: 'center' },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Order Now' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Schedule a Test Drive' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-models',
      name: 'Model Showcase',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'tesla.models',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 2 },
                    children: [
                      { type: 'Image', props: { src: '{item.image}', alt: '{item.name}' } },
                      { type: 'Title', props: { variant: 'h3' }, children: '{item.name}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.tagline}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.power} · 0-60 in {item.acceleration} · {item.range} range' },
                      { type: 'Price', props: { value: '{item.price}', currency: 'USD' } },
                      { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Configure' },
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
      id: 'welcome-categories',
      name: 'Categories',
      body: [
        {
          type: 'Row',
          props: { gap: 2, wrap: true },
          dataSource: 'tesla.categories',
          itemTemplate: {
            type: 'Badge',
            props: { variant: 'secondary' },
            children: '{item.name}',
          },
        },
      ],
    },
    {
      id: 'welcome-charging',
      name: 'Supercharger Network',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Supercharger Network' },
            { type: 'Text', props: { variant: 'default' }, children: 'Over 60,000 Superchargers worldwide. Charge up to 200 miles in 15 minutes.' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'tesla.charging',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: false },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.location}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.stalls} stalls · {item.power}' },
                          { type: 'Badge', props: { variant: 'secondary' }, children: '{item.status}' },
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

export default TESLA_WELCOME_PAGE;
