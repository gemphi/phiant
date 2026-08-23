export type SpotlightItem = {
  title: string;
  description: string;
  link: string;
};

export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    title: 'Inspect any component in real time',
    description: 'Hover, click, and inspect rendered components with the built-in inspector.',
    link: '/play',
  },
  {
    title: 'Full design token system with theming',
    description: 'Light, dark, and system themes powered by CSS custom properties.',
    link: '/primitives',
  },
  {
    title: 'Responsive 12-column grid and layout primitives',
    description: 'Container, Row, Col, Grid, Stack — all responsive out of the box.',
    link: '/layout',
  },
  {
    title: 'Commerce-ready components for storefronts',
    description: 'ProductCard, ItemCard, OrderCard, Price — build a full shopping experience.',
    link: '/commerce',
  },
];
