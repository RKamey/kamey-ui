import type { Meta, StoryObj } from '@storybook/react';

import { openNotification } from './useNotification';

const meta = {
  component: openNotification,
} satisfies Meta<typeof openNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};