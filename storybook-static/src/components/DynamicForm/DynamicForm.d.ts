import { default as React, ReactElement } from '../../../node_modules/react';
import { FormField } from './types';
export interface ApiConfig {
    url: string;
    method: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    responseDataPath?: string;
}
export interface DynamicFormProps {
    mode?: "create" | "update" | "view";
    title?: string | ReactElement;
    description?: string | ReactElement;
    icon?: ReactElement;
    layout?: "vertical" | "horizontal";
    cols?: 1 | 2 | 3 | 4;
    fields: FormField[] | FormField[][];
    submitButtonText?: string;
    onSubmit?: (data: unknown) => void;
    apiConfig?: ApiConfig;
    initialData?: Record<string, unknown>;
    customCols?: boolean;
}
export declare const DynamicForm: ({ mode, title, description, icon, layout, cols, fields, submitButtonText, onSubmit, initialData, customCols, }: DynamicFormProps) => React.ReactNode;
