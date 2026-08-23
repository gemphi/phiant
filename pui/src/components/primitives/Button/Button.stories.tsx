import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'icon'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

export const WithIcon: Story = {
  args: { iconLeft: ShoppingCart, children: 'Add to cart' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving...' },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    iconLeft: ShoppingCart,
    'aria-label': 'Open cart',
  },
};
