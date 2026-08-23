import type { PageData } from '../../../types';
import { NIKE_THEME } from '../theme';

export const NIKE_CART_PAGE: PageData = {
  id: 'nike-cart',
  name: 'Nike Shopping Cart',
  description: 'Shopping cart with order summary and checkout.',
  layoutType: 'nike',
  themeVars: NIKE_THEME,
  sections: [
    {
      id: 'cart-header',
      name: 'Cart Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Your Bag' },
            { type: 'Text', props: { variant: 'default' }, children: '3 items in your bag' },
          ],
        },
      ],
    },
    {
      id: 'cart-items',
      name: 'Cart Items',
      dataSource: 'nike.cart.items',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
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
                          type: 'Row',
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1cart/200/200', alt: 'Air Jordan 1' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 1 },
                              children: [
                                { type: 'Title', props: { variant: 'h4' }, children: 'Air Jordan 1 Retro High OG' },
                                { type: 'Text', props: { variant: 'sm' }, children: 'Black / Varsity Red · Size 9' },
                                { type: 'Price', props: { value: 180, currency: 'USD' } },
                                {
                                  type: 'Row',
                                  props: { gap: 2, align: 'center' },
                                  children: [
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: '-' },
                                    { type: 'Text', props: { variant: 'default' }, children: '1' },
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: '+' },
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
                  type: 'Card',
                  props: { hoverable: false },
                  children: [
                    {
                      type: 'CardBody',
                      children: [
                        {
                          type: 'Row',
                          props: { gap: 3, align: 'center' },
                          children: [
                            { type: 'Image', props: { src: 'https://picsum.photos/seed/pegasuscart/200/200', alt: 'Pegasus 41' } },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 1 },
                              children: [
                                { type: 'Title', props: { variant: 'h4' }, children: 'Nike Pegasus 41' },
                                { type: 'Text', props: { variant: 'sm' }, children: 'Volt / Black · Size 10.5' },
                                { type: 'Price', props: { value: 140, currency: 'USD' } },
                                {
                                  type: 'Row',
                                  props: { gap: 2, align: 'center' },
                                  children: [
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: '-' },
                                    { type: 'Text', props: { variant: 'default' }, children: '1' },
                                    { type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: '+' },
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
                        { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Subtotal' }, { type: 'Text', props: { variant: 'sm' }, children: '$320.00' }] },
                        { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Shipping' }, { type: 'Text', props: { variant: 'sm' }, children: 'Free' }] },
                        { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Estimated Tax' }, { type: 'Text', props: { variant: 'sm' }, children: '$25.60' }] },
                        { type: 'Divider' },
                        { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Total' }, { type: 'Price', props: { value: 345.6, currency: 'USD' } }] },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Checkout' },
                        { type: 'Text', props: { variant: 'sm' }, children: 'Free shipping on orders over $50. Free returns within 60 days.' },
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

export default NIKE_CART_PAGE;
