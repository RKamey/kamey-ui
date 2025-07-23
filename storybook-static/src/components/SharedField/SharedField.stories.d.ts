import { Meta, StoryObj } from '@storybook/react';
import { SharedFieldConfig } from './types';
declare const FieldGeneratorDemo: ({ fields, showColumns, showFields }: {
    fields: Record<string, SharedFieldConfig>;
    showColumns?: boolean;
    showFields?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
declare const meta: Meta<typeof FieldGeneratorDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicExample: Story;
export declare const AdvancedExample: Story;
export declare const ComplexFieldsExample: Story;
export declare const ColumnsOnly: Story;
export declare const FormFieldsOnly: Story;
export declare const SideBySideComparison: Story;
export declare const Interactive: Story;
