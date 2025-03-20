import type { Meta, StoryObj } from '@storybook/react';

import { DynamicTable } from './DynamicTable';

const meta = {
  component: DynamicTable,
} satisfies Meta<typeof DynamicTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: {},
    description: {},
    icon: {},
    columns: [],
    data: [],
    exportToExcel: {},
    createButtonIcon: {},
    moreActions: {},
    customFilters: {},
    actionConfig: {},
    searchConfig: {},
    themeConfig: {},
    backButton: {}
  }
};