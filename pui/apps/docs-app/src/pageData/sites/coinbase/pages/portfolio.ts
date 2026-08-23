import type { PageData } from '../../../types';
import { COINBASE_THEME } from '../theme';

export const COINBASE_PORTFOLIO_PAGE: PageData = {
  id: 'coinbase-portfolio',
  name: 'Coinbase Portfolio',
  description: 'Portfolio holdings, transactions, and price alerts.',
  layoutType: 'coinbase',
  themeVars: COINBASE_THEME,
  sections: [
    {
      id: 'portfolio-summary',
      name: 'Portfolio Summary',
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
                    { type: 'Title', props: { variant: 'h1' }, children: 'Portfolio' },
                    { type: 'Text', props: { variant: 'xxl' }, children: '$48,523.67' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Total Cost: $38,210.45 · P&L: +$10,313.22 (+27.0%)' },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Buy' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Send' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Receive' },
                  ],
                },
              ],
            },
            {
              type: 'Grid',
              props: { columns: 4, gap: 3 },
              dataSource: 'coinbase.portfolio.stats',
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
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.label}' },
                          { type: 'Title', props: { variant: 'h3' }, children: '{item.value}' },
                          { type: 'Badge', props: { variant: 'success' }, children: '{item.badge}' },
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
      id: 'portfolio-holdings',
      name: 'Holdings Detail',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Holdings' },
            {
              type: 'Grid',
              props: { columns: 2, gap: 3 },
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
                        props: { direction: 'column', gap: 2 },
                        children: [
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.name} ({item.symbol})' },
                          {
                            type: 'Grid',
                            props: { columns: 2, gap: 2 },
                            children: [
                              { type: 'Stack', props: { direction: 'column', gap: 1 }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Amount' }, { type: 'Text', props: { variant: 'default' }, children: '{item.amount} {item.symbol}' }] },
                              { type: 'Stack', props: { direction: 'column', gap: 1 }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Avg Cost' }, { type: 'Text', props: { variant: 'default' }, children: '${item.avgCost}' }] },
                              { type: 'Stack', props: { direction: 'column', gap: 1 }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Current Price' }, { type: 'Text', props: { variant: 'default' }, children: '${item.currentPrice}' }] },
                              { type: 'Stack', props: { direction: 'column', gap: 1 }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Value' }, { type: 'Text', props: { variant: 'default' }, children: '${item.totalValue}' }] },
                            ],
                          },
                          { type: 'Row', props: { justify: 'between', align: 'center' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'P&L' }, { type: 'Badge', props: { variant: 'success' }, children: '+${item.pnl} (+{item.pnlPercent}%)' }] },
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
      id: 'portfolio-transactions',
      name: 'Recent Transactions',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Recent Transactions' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 2 },
              dataSource: 'coinbase.transactions',
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
                          { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Badge', props: { variant: 'success' }, children: '{item.type}' }, { type: 'Text', props: { variant: 'sm' }, children: '{item.date}' }] },
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.amount} {item.asset}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '${item.total} · {item.method}' },
                          { type: 'Badge', props: { variant: 'success' }, children: '{item.status}' },
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
      id: 'portfolio-alerts',
      name: 'Price Alerts',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Price Alerts' },
            {
              type: 'Grid',
              props: { columns: 4, gap: 2 },
              dataSource: 'coinbase.price.alerts',
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
                          { type: 'Title', props: { variant: 'h5' }, children: '{item.symbol}' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Alert {item.condition} ${item.target}' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Current: ${item.current}' },
                          { type: 'Badge', props: { variant: 'primary' }, children: '{item.status}' },
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

export default COINBASE_PORTFOLIO_PAGE;
