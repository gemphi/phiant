import type { PageData } from '../../../types';
import { NIKE_THEME } from '../theme';

export const NIKE_PRODUCT_PAGE: PageData = {
  id: 'nike-product',
  name: 'Nike Product Detail',
  description: 'Shoe detail with sizes, colors, and reviews.',
  layoutType: 'nike',
  themeVars: NIKE_THEME,
  sections: [
    {
      id: 'product-header',
      name: 'Product Header',
      dataSource: 'nike.product.detail',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1main/600/600', alt: 'Air Jordan 1' } },
                {
                  type: 'Row',
                  props: { gap: 1 },
                  children: [
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1a/150/150', alt: 'View 1' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1b/150/150', alt: 'View 2' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1c/150/150', alt: 'View 3' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/aj1d/150/150', alt: 'View 4' } },
                  ],
                },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                { type: 'Badge', props: { variant: 'primary' }, children: 'Just Dropped' },
                { type: 'Title', props: { variant: 'h1' }, children: 'Air Jordan 1 Retro High OG' },
                { type: 'Text', props: { variant: 'default' }, children: 'Men\'s Shoes' },
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Rating', props: { value: 4.7, max: 5, readOnly: true } },
                    { type: 'Text', props: { variant: 'sm' }, children: '4.7 (2,341 reviews)' },
                  ],
                },
                { type: 'Price', props: { value: 180, currency: 'USD' } },
                { type: 'Divider' },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: 'Select Size' },
                    {
                      type: 'Row',
                      props: { gap: 1, wrap: true },
                      children: [
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '7' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '7.5' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '8' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '8.5' },
                        { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: '9' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '9.5' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '10' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '10.5' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '11' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '12' },
                        { type: 'Button', props: { variant: 'outline', size: 'sm' }, children: '13' },
                      ],
                    },
                  ],
                },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: 'Select Color' },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Radio', props: { label: 'Black / Varsity Red', checked: true } },
                        { type: 'Radio', props: { label: 'White / Black' } },
                        { type: 'Radio', props: { label: 'University Blue' } },
                      ],
                    },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Add to Bag' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Favorite' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'product-details',
      name: 'Product Details',
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
                    { type: 'Title', props: { variant: 'h3' }, children: 'Product Details' },
                    { type: 'Text', props: { variant: 'default' }, children: 'The Air Jordan 1 Retro High OG channels the original that changed the game. Crafted with premium leather and sealed with that iconic Wings logo, it delivers timeless style and all-day comfort.' },
                    { type: 'Divider' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Text', props: { variant: 'sm' }, children: '• Premium leather upper for a classic look and durable support' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Air-Sole unit in the heel for lightweight cushioning' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Rubber outsole with circular tread pattern for traction' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• High-top silhouette for ankle support' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Colorway: Black / Varsity Red / White' },
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
      dataSource: 'nike.product.reviews',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Reviews' },
            {
              type: 'CommentList',
              children: [
                {
                  type: 'Comment',
                  props: { author: 'Marcus Bell', avatar: 'https://i.pravatar.cc/150?img=12', time: '3 days ago' },
                  children: 'These are even better in person. The leather quality is top notch and the colorway is perfect. Runs true to size.',
                },
                {
                  type: 'Comment',
                  props: { author: 'Elena Rossi', avatar: 'https://i.pravatar.cc/150?img=23', time: '1 week ago' },
                  children: 'Iconic shoe, iconic colorway. The varsity red pops perfectly against the black. Comfortable enough for all-day wear.',
                },
                {
                  type: 'Comment',
                  props: { author: 'Devon Walker', avatar: 'https://i.pravatar.cc/150?img=33', time: '2 weeks ago' },
                  children: 'My first pair of Jordan 1s and I get it now. The build quality is noticeably better than the mids. Worth the extra money.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default NIKE_PRODUCT_PAGE;
