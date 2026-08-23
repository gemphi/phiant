import type { PageData } from '../../../types';
import { TESLA_THEME } from '../theme';

export const TESLA_CART_PAGE: PageData = {
  id: 'tesla-cart',
  name: 'Tesla Order Summary',
  description: 'Order summary with selected configuration and delivery details.',
  layoutType: 'tesla',
  themeVars: TESLA_THEME,
  sections: [
    {
      id: 'cart-header',
      name: 'Order Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Order Summary' },
            { type: 'Text', props: { variant: 'default' }, children: 'Review your configuration and proceed to payment.' },
          ],
        },
      ],
    },
    {
      id: 'cart-items',
      name: 'Configured Vehicle',
      dataSource: 'tesla.cart.items',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                { type: 'Image', props: { src: 'https://picsum.photos/seed/modelscart/600/400', alt: 'Model S Plaid' } },
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
                        { type: 'Title', props: { variant: 'h2' }, children: 'Model S Plaid' },
                        { type: 'Text', props: { variant: 'default' }, children: 'Pearl White Multi-Coat' },
                        { type: 'Text', props: { variant: 'default' }, children: '19" Tempest Wheels' },
                        { type: 'Text', props: { variant: 'default' }, children: 'All Black Interior' },
                        { type: 'Text', props: { variant: 'default' }, children: 'Full Self-Driving Capability' },
                        { type: 'Divider' },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Vehicle' }, { type: 'Text', props: { variant: 'sm' }, children: '$89,990' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Red Multi-Coat' }, { type: 'Text', props: { variant: 'sm' }, children: '$2,500' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: '21" Arachnid Wheels' }, { type: 'Text', props: { variant: 'sm' }, children: '$4,500' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Full Self-Driving' }, { type: 'Text', props: { variant: 'sm' }, children: '$15,000' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Destination & Documentation' }, { type: 'Text', props: { variant: 'sm' }, children: '$1,640' }] },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Est. Savings (Gas)' }, { type: 'Text', props: { variant: 'sm' }, children: '-$5,200' }] },
                            { type: 'Divider' },
                            { type: 'Row', props: { justify: 'between' }, children: [{ type: 'Title', props: { variant: 'h4' }, children: 'Subtotal' }, { type: 'Price', props: { value: 108430, currency: 'USD' } }] },
                          ],
                        },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Proceed to Payment' },
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
      id: 'cart-delivery',
      name: 'Delivery Details',
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
                  props: { direction: 'column', gap: 3 },
                  children: [
                    { type: 'Title', props: { variant: 'h3' }, children: 'Delivery' },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Input', props: { placeholder: 'First name', type: 'text' } },
                        { type: 'Input', props: { placeholder: 'Last name', type: 'text' } },
                      ],
                    },
                    { type: 'Input', props: { placeholder: 'Email', type: 'email' } },
                    { type: 'Input', props: { placeholder: 'Phone number', type: 'tel' } },
                    { type: 'Input', props: { placeholder: 'Delivery address', type: 'text' } },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Input', props: { placeholder: 'City', type: 'text' } },
                        { type: 'Input', props: { placeholder: 'ZIP code', type: 'text' } },
                      ],
                    },
                    { type: 'Select', props: { placeholder: 'Preferred delivery location' } },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Estimated delivery: 4-8 weeks after order confirmation.' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cart-locations',
      name: 'Showroom Locations',
      dataSource: 'tesla.locations',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Find a Showroom' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 2 },
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
                            { type: 'Title', props: { variant: 'h4' }, children: 'Palo Alto, CA' },
                            { type: 'Text', props: { variant: 'sm' }, children: '4180 El Camino Real' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Open today · 10am-7pm' },
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
                            { type: 'Title', props: { variant: 'h4' }, children: 'Los Angeles, CA' },
                            { type: 'Text', props: { variant: 'sm' }, children: '8535 Beverly Blvd' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Open today · 10am-8pm' },
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
                            { type: 'Title', props: { variant: 'h4' }, children: 'Brooklyn, NY' },
                            { type: 'Text', props: { variant: 'sm' }, children: '160 Imlay Street' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Open today · 10am-7pm' },
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

export default TESLA_CART_PAGE;
