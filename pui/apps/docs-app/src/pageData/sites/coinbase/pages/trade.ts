import type { PageData } from '../../../types';
import { COINBASE_THEME } from '../theme';

export const COINBASE_TRADE_PAGE: PageData = {
  id: 'coinbase-trade',
  name: 'Coinbase Trade',
  description: 'Trade interface with asset detail, order panel, and market data.',
  layoutType: 'coinbase',
  themeVars: COINBASE_THEME,
  sections: [
    {
      id: 'trade-header',
      name: 'Trade Header',
      body: [
        {
          type: 'Row',
          props: { gap: 4, justify: 'between', align: 'center' },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 1 },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Bitcoin · BTC' },
                { type: 'Price', props: { value: 67234.50, currency: 'USD' } },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Badge', props: { variant: 'success' }, children: '+2.34% (24h)' },
                    { type: 'Badge', props: { variant: 'success' }, children: '+5.67% (7d)' },
                    { type: 'Badge', props: { variant: 'success' }, children: '+12.34% (30d)' },
                  ],
                },
              ],
            },
            {
              type: 'Row',
              props: { gap: 2 },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Buy BTC' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Sell BTC' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Convert' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'trade-order',
      name: 'Order Panel',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
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
                        { type: 'Title', props: { variant: 'h3' }, children: 'Place Order' },
                        {
                          type: 'Row',
                          props: { gap: 2 },
                          children: [
                            { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Buy' },
                            { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Sell' },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 2 },
                          children: [
                            { type: 'Title', props: { variant: 'h5' }, children: 'Order Type' },
                            {
                              type: 'Row',
                              props: { gap: 2 },
                              children: [
                                { type: 'Radio', props: { label: 'Market', checked: true } },
                                { type: 'Radio', props: { label: 'Limit' } },
                                { type: 'Radio', props: { label: 'Stop' } },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h5' }, children: 'Amount (BTC)' },
                            { type: 'Input', props: { placeholder: '0.0000', type: 'text' } },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h5' }, children: 'Price (USD)' },
                            { type: 'Input', props: { placeholder: '67,234.50', type: 'text', disabled: true } },
                          ],
                        },
                        {
                          type: 'Row',
                          props: { gap: 2 },
                          children: [
                            { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: '25%' },
                            { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: '50%' },
                            { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: '75%' },
                            { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Max' },
                          ],
                        },
                        { type: 'Divider' },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Estimated Total' }, { type: 'Text', props: { variant: 'sm' }, children: '$6,723.45' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Coinbase Fee' }, { type: 'Text', props: { variant: 'sm' }, children: '$29.99' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Network Fee' }, { type: 'Text', props: { variant: 'sm' }, children: '$2.50' }] },
                            { type: 'Divider' },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Total' }, { type: 'Price', props: { value: 6755.94, currency: 'USD' } }] },
                          ],
                        },
                        { type: 'Button', props: { variant: 'primary', size: 'lg' }, children: 'Buy 0.10 BTC' },
                      ],
                    },
                  ],
                },
              ],
            },
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
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 2 },
                          children: [
                            { type: 'Title', props: { variant: 'h3' }, children: 'Market Stats' },
                            {
                              type: 'Grid',
                              props: { columns: 2, gap: 2 },
                              dataSource: 'coinbase.asset.stats',
                              itemTemplate: {
                                type: 'Stack',
                                props: { direction: 'column', gap: 1 },
                                children: [
                                  { type: 'Text', props: { variant: 'sm' }, children: '{item.label}' },
                                  { type: 'Text', props: { variant: 'lg' }, children: '{item.value}' },
                                ],
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
          ],
        },
      ],
    },
    {
      id: 'trade-asset-info',
      name: 'About Bitcoin',
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
                    { type: 'Title', props: { variant: 'h2' }, children: 'About Bitcoin' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Bitcoin is the first decentralized cryptocurrency, created by an anonymous person or group known as Satoshi Nakamoto in 2009. It operates on a peer-to-peer network without the need for intermediaries, using blockchain technology to record transactions. Bitcoin has a fixed supply cap of 21 million coins, making it a deflationary asset often compared to digital gold.' },
                    {
                      type: 'Row',
                      props: { gap: 2, wrap: true },
                      children: [
                        { type: 'Badge', props: { variant: 'primary' }, children: 'Rank #1' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'Layer 1' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'Store of Value' },
                        { type: 'Badge', props: { variant: 'secondary' }, children: 'Proof of Work' },
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
      id: 'trade-categories',
      name: 'Explore Categories',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Explore by Category' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'coinbase.categories',
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
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.name}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.assetCount} assets · {item.marketCap}' },
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

export default COINBASE_TRADE_PAGE;
