import type { Meta, StoryObj } from '@storybook/react';

import { useAsync } from './UseAsync';

const meta = {
  component: useAsync,
} satisfies Meta<typeof useAsync>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};