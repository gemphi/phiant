import type { PageData } from '../../../types';
import { AMAZON_THEME } from '../theme';

export const AMAZON_WELCOME_PAGE: PageData = {
  id: 'amazon-welcome',
  name: 'Amazon Storefront',
  description: 'Storefront landing with hero, deals, categories, and featured products.',
  layoutType: 'amazon',
  themeVars: AMAZON_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Hero',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3, align: 'center' },
          children: [
            { type: 'Badge', props: { variant: 'primary' }, children: 'Prime Big Deals' },
            { type: 'Title', props: { variant: 'h1' }, children: 'Shop deals on everything you need' },
            { type: 'Text', props: { variant: 'lg' }, children: 'Up to 70% off electronics, home, kitchen, and more. Free delivery with Prime.' },
            {
              type: 'Row',
              props: { gap: 2, justify: 'center' },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Shop All Deals' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Try Prime Free' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-categories',
      name: 'Shop by Category',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Shop by Category' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'amazon.categories',
              itemTemplate: {
                type: 'Card',
                props: { hoverable: true },
                children: [
                  {
                    type: 'CardBody',
                    children: [
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1, align: 'center' },
                        children: [
                          { type: 'Icon', props: { name: '{item.icon}', size: 32 } },
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.productCount} items' },
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
      id: 'welcome-deals',
      name: "Today's Deals",
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: "Today's Deals" },
            {
              type: 'Grid',
              props: { columns: 4, gap: 3 },
              dataSource: 'amazon.deals',
              itemTemplate: {
                type: 'ProductCard',
                props: {
                  name: '{item.title}',
                  price: '{item.dealPrice}',
                  image: '{item.image}',
                  badge: '{item.discount}% off',
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-featured',
      name: 'Featured Products',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Featured Products' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 3 },
              dataSource: 'amazon.products',
              itemTemplate: {
                type: 'ProductCard',
                props: {
                  name: '{item.title}',
                  price: '{item.price}',
                  image: '{item.image}',
                  badge: '{item.badge}',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default AMAZON_WELCOME_PAGE;
