import type { PageData } from '../../../types';
import { NIKE_THEME } from '../theme';

export const NIKE_WELCOME_PAGE: PageData = {
  id: 'nike-welcome',
  name: 'Nike Welcome',
  description: 'Featured products landing with hero, collections, and trending shoes.',
  layoutType: 'nike',
  themeVars: NIKE_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Hero',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3, align: 'center' },
          children: [
            { type: 'Badge', props: { variant: 'primary' }, children: 'Just Dropped' },
            { type: 'Title', props: { variant: 'h1' }, children: 'AIR JORDAN 1 RETRO HIGH OG' },
            { type: 'Text', props: { variant: 'lg' }, children: 'The legacy lives on. Shop the latest colorways now.' },
            {
              type: 'Row',
              props: { gap: 2, justify: 'center' },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Shop Now' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Explore Collections' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-categories',
      name: 'Shop by Sport',
      dataSource: 'nike.categories',
      body: [
        {
          type: 'Row',
          props: { gap: 2, wrap: true },
          children: [
            { type: 'Badge', props: { variant: 'primary' }, children: 'Running' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Basketball' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Training' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Lifestyle' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Soccer' },
            { type: 'Badge', props: { variant: 'secondary' }, children: 'Tennis' },
          ],
        },
      ],
    },
    {
      id: 'welcome-featured',
      name: 'Featured Products',
      dataSource: 'nike.products',
      body: [
        {
          type: 'Grid',
          props: { columns: 4, gap: 3 },
          children: [
            {
              type: 'ProductCard',
              props: {
                name: 'Air Jordan 1 Retro High OG',
                price: 180,
                image: 'https://picsum.photos/seed/aj1/400/400',
                badge: 'New',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Air Max 90',
                price: 130,
                image: 'https://picsum.photos/seed/airmax90/400/400',
                badge: 'Trending',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Pegasus 41',
                price: 140,
                image: 'https://picsum.photos/seed/pegasus41/400/400',
                badge: 'Best Seller',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Dunk Low',
                price: 115,
                image: 'https://picsum.photos/seed/dunklow/400/400',
                badge: 'New',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Blazer Mid \'77',
                price: 105,
                image: 'https://picsum.photos/seed/blazer77/400/400',
                badge: 'Classic',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Air Force 1 \'07',
                price: 115,
                image: 'https://picsum.photos/seed/af107/400/400',
                badge: 'Essential',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike Metcon 9',
                price: 140,
                image: 'https://picsum.photos/seed/metcon9/400/400',
                badge: 'Training',
              },
            },
            {
              type: 'ProductCard',
              props: {
                name: 'Nike LeBron 21',
                price: 200,
                image: 'https://picsum.photos/seed/lebron21/400/400',
                badge: 'Basketball',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-collections',
      name: 'Collections',
      dataSource: 'nike.collections',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Shop Collections' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              children: [
                {
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
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/coljordan/300/200', alt: 'Jordan Brand' } },
                            { type: 'Title', props: { variant: 'h4' }, children: 'Jordan Brand' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'The legacy of greatness' },
                          ],
                        },
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
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/colrunning/300/200', alt: 'Running' } },
                            { type: 'Title', props: { variant: 'h4' }, children: 'Running' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Engineered for speed' },
                          ],
                        },
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
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/coltraining/300/200', alt: 'Training' } },
                            { type: 'Title', props: { variant: 'h4' }, children: 'Training' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Built for the grind' },
                          ],
                        },
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
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/colsb/300/200', alt: 'SB' } },
                            { type: 'Title', props: { variant: 'h4' }, children: 'Nike SB' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Skateboarding culture' },
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
  ],
};

export default NIKE_WELCOME_PAGE;
