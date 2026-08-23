import type { PageData } from '../../../types';
import { AMAZON_THEME } from '../theme';

export const AMAZON_CART_PAGE: PageData = {
  id: 'amazon-cart',
  name: 'Amazon Shopping Cart',
  description: 'Shopping cart with items, order summary, and checkout.',
  layoutType: 'amazon',
  themeVars: AMAZON_THEME,
  sections: [
    {
      id: 'cart-header',
      name: 'Cart Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Shopping Cart' },
            { type: 'Text', props: { variant: 'default' }, children: '3 items · Subtotal: $310.00' },
          ],
        },
      ],
    },
    {
      id: 'cart-items',
      name: 'Cart Items',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'amazon.cart.items',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: false },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 3, align: 'start' },
                    children: [
                      { type: 'Image', props: { src: '{item.image}', alt: '{item.title}' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Brand: {item.brand}' },
                          { type: 'Badge', props: { variant: 'success' }, children: 'In Stock' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Eligible for FREE Prime delivery' },
                          {
                            type: 'Row',
                            props: { gap: 2 },
                            children: [
                              { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: 'Qty: {item.quantity}' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Delete' },
                              { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Save for later' },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1, align: 'end' },
                        children: [
                          { type: 'Price', props: { amount: '{item.price}', currency: 'USD' } },
                        ],
                      },
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
      id: 'cart-summary',
      name: 'Order Summary',
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
                    { type: 'Title', props: { variant: 'h3' }, children: 'Order Summary' },
                    { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Items (3)' }, { type: 'Text', props: { variant: 'sm' }, children: '$310.00' }] },
                    { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Delivery' }, { type: 'Text', props: { variant: 'sm' }, children: 'FREE' }] },
                    { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Estimated tax' }, { type: 'Text', props: { variant: 'sm' }, children: '$24.80' }] },
                    { type: 'Divider' },
                    { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Order total' }, { type: 'Price', props: { amount: 334.8, currency: 'USD' } }] },
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Proceed to Checkout' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Free delivery with Prime — estimated delivery in 2 days.' },
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

export default AMAZON_CART_PAGE;
