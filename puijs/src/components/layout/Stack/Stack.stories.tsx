import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './index';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = () => (
  <div
    style={{
      width: 40,
      height: 40,
      backgroundColor: 'var(--phi-color-primary)',
      borderRadius: 'var(--phi-radius-md)',
    }}
  />
);

export const Vertical: Story = {
  render: () => (
    <Stack gap={4}>
      <Box />
      <Box />
      <Box />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap={4} align="center">
      <Box />
      <Box />
      <Box />
    </Stack>
  ),
};
