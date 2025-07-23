import { Meta } from '@storybook/react';
type SampleDataItem = {
    key: string;
    name: string;
    age: number | null | undefined;
    date: Date | null;
    active: boolean;
    score: number;
    category: {
        type: string;
        level: number;
    } | null;
};
declare const sampleData: SampleDataItem[];
declare const SortOrderDemo: ({ data, initialSortKey }: {
    data?: typeof sampleData;
    initialSortKey?: string;
}) => import("react/jsx-runtime").JSX.Element;
declare const meta: Meta<typeof SortOrderDemo>;
export default meta;
export declare const Default: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
export declare const StringSort: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
export declare const NumericSort: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
export declare const DateSort: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
export declare const BooleanSort: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
export declare const NullHandling: import('@storybook/core/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, {
    data?: typeof sampleData;
    initialSortKey?: string;
}>;
