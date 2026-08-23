import type { PageData } from '../../../types';
import { AMAZON_THEME } from '../theme';

export const AMAZON_PRODUCT_PAGE: PageData = {
  id: 'amazon-product',
  name: 'Amazon Product Detail',
  description: 'Single product detail with gallery, variations, specs, and reviews.',
  layoutType: 'amazon',
  themeVars: AMAZON_THEME,
  sections: [
    {
      id: 'product-header',
      name: 'Product Header',
      dataSource: 'amazon.product.detail',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 2 },
              children: [
                { type: 'Image', props: { src: 'https://picsum.photos/seed/airpodsmain/600/600', alt: 'AirPods Pro 2' } },
                {
                  type: 'Row',
                  props: { gap: 1 },
                  children: [
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/airpodscase/150/150', alt: 'Case' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/airpodsin/150/150', alt: 'In ear' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/airpodsside/150/150', alt: 'Side' } },
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/airpodsbox/150/150', alt: 'Box' } },
                  ],
                },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                { type: 'Text', props: { variant: 'sm' }, children: 'Visit the Apple Store' },
                { type: 'Title', props: { variant: 'h1' }, children: 'Apple AirPods Pro (2nd Gen) with USB-C Charging Case' },
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Rating', props: { value: 4.7, max: 5, readOnly: true } },
                    { type: 'Text', props: { variant: 'sm' }, children: '4.7 (87,432 ratings)' },
                  ],
                },
                { type: 'Badge', props: { variant: 'success' }, children: "Amazon's Choice" },
                { type: 'Divider' },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Price', props: { amount: 189, currency: 'USD' } },
                    { type: 'Text', props: { variant: 'sm' }, children: 'List Price: $249.00' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'You save: $60.00 (24%)' },
                  ],
                },
                { type: 'Divider' },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Text', props: { variant: 'sm' }, children: '✓ FREE delivery with Prime' },
                    { type: 'Text', props: { variant: 'sm' }, children: '✓ In Stock — ships from and sold by Amazon.com' },
                    { type: 'Text', props: { variant: 'sm' }, children: '✓ Returns: 30-day refund/replacement' },
                  ],
                },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h4' }, children: 'Variations' },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Radio', props: { label: 'Standard ($189)', checked: true } },
                        { type: 'Radio', props: { label: 'Free Engraving ($189)' } },
                        { type: 'Radio', props: { label: 'With AppleCare+ ($248)' } },
                      ],
                    },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2 },
                  children: [
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Add to Cart' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Buy Now' },
                    { type: 'Button', props: { variant: 'outline', size: 'md' }, children: 'Add to List' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'product-features',
      name: 'About this item',
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
                    { type: 'Title', props: { variant: 'h3' }, children: 'About this item' },
                    { type: 'Text', props: { variant: 'default' }, children: 'AirPods Pro feature up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. The redesigned USB-C charging case includes a built-in speaker for Find My and a lanyard loop. Up to 6 hours of listening time with ANC enabled, and 30 hours total with the MagSafe charging case.' },
                    { type: 'Divider' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      children: [
                        { type: 'Text', props: { variant: 'sm' }, children: '• Up to 2x more Active Noise Cancellation' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Adaptive Transparency reduces loud environmental noise' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Personalized Spatial Audio with dynamic head tracking' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• USB-C charging case with built-in speaker and lanyard loop' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Up to 6 hours of listening time with ANC' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Sweat and dust resistant (IP54)' },
                        { type: 'Text', props: { variant: 'sm' }, children: '• Four silicone ear tip sizes for the best fit and acoustic seal' },
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
      name: 'Customer Reviews',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            { type: 'Title', props: { variant: 'h2' }, children: 'Customer Reviews' },
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Rating', props: { value: 4.7, max: 5, readOnly: true } },
                { type: 'Text', props: { variant: 'default' }, children: '4.7 out of 5 · 87,432 ratings' },
              ],
            },
            {
              type: 'CommentList',
              dataSource: 'amazon.product.reviews',
              itemTemplate: {
                type: 'Comment',
                props: {
                  author: '{item.author}',
                  avatar: '{item.avatar}',
                  timestamp: '{item.date}',
                  content: '{item.text}',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default AMAZON_PRODUCT_PAGE;
