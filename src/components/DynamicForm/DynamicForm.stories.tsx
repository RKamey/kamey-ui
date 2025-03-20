import type { Meta, StoryObj } from '@storybook/react';

import { DynamicForm } from './DynamicForm';

const meta = {
  component: DynamicForm,
} satisfies Meta<typeof DynamicForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: {},
    description: {},
    icon: {},
    fields: {},
    apiConfig: {},
    initialData: {}
  }
};