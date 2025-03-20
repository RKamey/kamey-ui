import type { Meta, StoryObj } from '@storybook/react';

import { useCrudOperations } from './useCrudOperations';

const meta = {
  component: useCrudOperations,
} satisfies Meta<typeof useCrudOperations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};