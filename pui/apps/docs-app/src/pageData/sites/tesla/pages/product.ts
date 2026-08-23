import type { PageData } from '../../../types';
import { TESLA_THEME } from '../theme';

export const TESLA_PRODUCT_PAGE: PageData = {
  id: 'tesla-product',
  name: 'Tesla Product Detail',
  description: 'Single vehicle detail with configuration, specs, and gallery.',
  layoutType: 'tesla',
  themeVars: TESLA_THEME,
  sections: [
    {
      id: 'product-header',
      name: 'Product Header',
      dataSource: 'tesla.product.detail',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                { type: 'Image', props: { src: 'https://picsum.photos/seed/modelsmain/800/500', alt: 'Model S' } },
                {
                  type: 'Row',
                  props: { gap: 1 },
                  children: [
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/models1/200/120', alt: 'Angle 1' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/models2/200/120', alt: 'Angle 2' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/models3/200/120', alt: 'Angle 3' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/models4/200/120', alt: 'Interior' } },
                  ],
                },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Model S Plaid' },
                { type: 'Text', props: { variant: 'lg' }, children: 'The quickest acceleration in production — 1,020 hp, 0-60 mph in 1.99s.' },
                { type: 'Price', props: { value: 89990, currency: 'USD' } },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Continue to Order' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Compare' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'product-config',
      name: 'Configuration Options',
      dataSource: 'tesla.product.config',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Configure Your Model S' },
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
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Paint' },
                            {
                              type: 'Row',
                              props: { gap: 2 },
                              children: [
                                { type: 'Radio', props: { label: 'Pearl White Multi-Coat', checked: true } },
                                { type: 'Radio', props: { label: 'Solid Black' } },
                                { type: 'Radio', props: { label: 'Midnight Silver Metallic' } },
                                { type: 'Radio', props: { label: 'Deep Blue Metallic' } },
                                { type: 'Radio', props: { label: 'Red Multi-Coat' } },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Wheels' },
                            {
                              type: 'Row',
                              props: { gap: 2 },
                              children: [
                                { type: 'Radio', props: { label: '19" Tempest Wheels', checked: true } },
                                { type: 'Radio', props: { label: '21" Arachnid Wheels' } },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Interior' },
                            {
                              type: 'Row',
                              props: { gap: 2 },
                              children: [
                                { type: 'Radio', props: { label: 'All Black', checked: true } },
                                { type: 'Radio', props: { label: 'Black & White' } },
                                { type: 'Radio', props: { label: 'Cream' } },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Autopilot' },
                            {
                              type: 'Stack',
                              props: { direction: 'column', gap: 1 },
                              children: [
                                { type: 'Checkbox', props: { label: 'Autopilot (Included)', checked: true, disabled: true } },
                                { type: 'Checkbox', props: { label: 'Enhanced Autopilot ($6,000)' } },
                                { type: 'Checkbox', props: { label: 'Full Self-Driving Capability ($15,000)' } },
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
    },
    {
      id: 'product-specs',
      name: 'Specifications',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Specifications' },
            {
              type: 'Grid',
              props: { columns: 3, gap: 3 },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Range' },
                            { type: 'Text', props: { variant: 'lg' }, children: '405 mi' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'EPA estimated' },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Top Speed' },
                            { type: 'Text', props: { variant: 'lg' }, children: '200 mph' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Track mode' },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: '0-60 mph' },
                            { type: 'Text', props: { variant: 'lg' }, children: '1.99 s' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'With rollout' },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Peak Power' },
                            { type: 'Text', props: { variant: 'lg' }, children: '1,020 hp' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Tri-motor AWD' },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Drag Coefficient' },
                            { type: 'Text', props: { variant: 'lg' }, children: '0.208 Cd' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Lowest in production' },
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
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h4' }, children: 'Wheels' },
                            { type: 'Text', props: { variant: 'lg' }, children: '19" or 21"' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Aero-optimized' },
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
      id: 'product-reviews',
      name: 'Reviews',
      dataSource: 'tesla.product.reviews',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Owner Reviews' },
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Rating', props: { value: 4.8, max: 5, readOnly: true } },
                { type: 'Text', props: { variant: 'default' }, children: '4.8 out of 5 · 1,247 reviews' },
              ],
            },
            {
              type: 'CommentList',
              children: [
                {
                  type: 'Comment',
                  props: { author: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=12', time: '2 weeks ago' },
                  children: 'After 8 months and 12,000 miles, the Plaid continues to blow me away. The acceleration never gets old and the range is real — I regularly hit 380 miles on a full charge.',
                },
                {
                  type: 'Comment',
                  props: { author: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/150?img=25', time: '1 month ago' },
                  children: 'The yoke took about a week to get used to but now I prefer it. Autopilot on the highway is genuinely stress-reducing. Build quality on my 2024 is excellent.',
                },
                {
                  type: 'Comment',
                  props: { author: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=33', time: '1 month ago' },
                  children: 'Track mode at Laguna Seca was an experience I\'ll never forget. The car handles like it\'s on rails. Only complaint is the rear seat headroom for adults.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default TESLA_PRODUCT_PAGE;
