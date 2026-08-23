import type { PageData } from '../../../types';
import { COINBASE_THEME } from '../theme';

export const COINBASE_WELCOME_PAGE: PageData = {
  id: 'coinbase-welcome',
  name: 'Coinbase Dashboard',
  description: 'Portfolio overview with market assets, watchlist, and news.',
  layoutType: 'coinbase',
  themeVars: COINBASE_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Portfolio Hero',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Row',
              props: { gap: 4, justify: 'between', align: 'center' },
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Title', props: { variant: 'h1' }, children: 'Your Portfolio' },
                    { type: 'Text', props: { variant: 'lg' }, children: '$48,523.67' },
                    { type: 'Text', props: { variant: 'sm' }, children: '+$10,313.22 (27.0%) all time' },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Buy' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Sell' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Send' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'welcome-portfolio',
      name: 'Holdings',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Your Holdings' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 3 },
              dataSource: 'coinbase.portfolio.holdings',
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
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name} ({item.symbol})' },
                          { type: 'Text', props: { variant: 'lg' }, children: '${item.totalValue}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.amount} {item.symbol}' },
                          { type: 'Badge', props: { variant: 'success' }, children: '+{item.pnlPercent}%' },
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
      id: 'welcome-assets',
      name: 'Top Assets',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Top Assets' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 3 },
              dataSource: 'coinbase.assets',
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
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name} · {item.symbol}' },
                          { type: 'Price', props: { value: '{item.price}', currency: 'USD' } },
                          { type: 'Badge', props: { variant: 'success' }, children: '+{item.change24h}%' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Market Cap: {item.marketCap}' },
                          { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Trade' },
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
      id: 'welcome-watchlist',
      name: 'Watchlist',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Watchlist' },
            {
              type: 'Grid',
              props: { columns: 5, gap: 2 },
              dataSource: 'coinbase.watchlist',
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
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.symbol}' },
                          { type: 'Price', props: { value: '{item.price}', currency: 'USD' } },
                          { type: 'Badge', props: { variant: 'success' }, children: '+{item.change24h}%' },
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
      id: 'welcome-news',
      name: 'Latest News',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Latest News' },
            {
              type: 'Grid',
              props: { columns: 2, gap: 3 },
              dataSource: 'coinbase.news',
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
                          { type: 'Badge', props: { variant: 'primary' }, children: '{item.category}' },
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.summary}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.source} · {item.date}' },
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

export default COINBASE_WELCOME_PAGE;
