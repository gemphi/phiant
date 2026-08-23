import type { PageData } from '../types';

/* ---------- Commerce page data (pure data, no functions) ---------- */

export const COMMERCE_PAGE_DATA: PageData = {
  id: 'commerce',
  name: 'Commerce',
  description: 'ProductCard, ItemCard, OrderCard — card-based commerce components',
  layoutType: 'commerce',
  sections: [
    {
      id: 'price-demos',
      name: 'Price',
      layout: 'row',
      gap: 3,
      components: [
        { type: 'Price', props: { amount: 49.99 } },
        { type: 'Price', props: { amount: 99.99, saleAmount: 69.99 } },
        { type: 'Price', props: { amount: 149.99, currency: 'EUR', locale: 'de-DE' } },
        { type: 'Price', props: { amount: 29.99, saleAmount: 19.99, currency: 'GBP', locale: 'en-GB' } },
      ],
    },
    {
      id: 'product-card-demos',
      name: 'ProductCard',
      layout: 'grid',
      cols: 2,
      gap: 4,
      components: [
        {
          type: 'ProductCard',
          props: {
            image: 'https://picsum.photos/300/200',
            title: 'Wireless Headphones',
            description: 'Premium sound quality with noise cancellation.',
            price: 199.99,
            salePrice: 149.99,
            rating: 4.5,
            reviewCount: 128,
            action: 'addToCart',
            actionPayload: { id: 'headphones', title: 'Wireless Headphones', price: 149.99 },
          },
        },
        {
          type: 'ProductCard',
          props: {
            image: 'https://picsum.photos/300/200',
            title: 'Smart Watch',
            price: 249.99,
            rating: 5,
            reviewCount: 42,
            action: 'addToCart',
            actionPayload: { id: 'watch', title: 'Smart Watch', price: 249.99 },
          },
        },
      ],
    },
    {
      id: 'item-card-demos',
      name: 'ItemCard',
      layout: 'grid',
      cols: 2,
      gap: 4,
      components: [
        {
          type: 'ItemCard',
          props: {
            image: 'https://picsum.photos/100/100',
            name: 'Wireless Headphones',
            price: 149.99,
            quantity: 2,
            action: 'updateQuantity',
            actionPayload: { id: 'headphones' },
          },
        },
        {
          type: 'ItemCard',
          props: {
            image: 'https://picsum.photos/100/100',
            name: 'USB-C Cable',
            price: 12.99,
            quantity: 1,
            action: 'updateQuantity',
            actionPayload: { id: 'cable' },
          },
        },
      ],
    },
    {
      id: 'order-card-demo',
      name: 'OrderCard',
      layout: 'col',
      gap: 2,
      components: [
        {
          type: 'OrderCard',
          props: {
            items: [
              { label: 'Subtotal', amount: 162.98 },
              { label: 'Shipping', amount: 9.99 },
              { label: 'Tax', amount: 17.29 },
            ],
            total: 190.26,
            action: 'checkout',
          },
        },
      ],
    },
  ],
};
