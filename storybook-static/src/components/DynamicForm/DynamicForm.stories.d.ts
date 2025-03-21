import { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    component: ({ mode, title, description, icon, layout, cols, fields, submitButtonText, onSubmit, initialData, customCols, }: import('./DynamicForm').DynamicFormProps) => React.ReactNode;
    argTypes: {
        title: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
                defaultValue: {
                    summary: string;
                };
            };
        };
        description: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        icon: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        fields: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        apiConfig: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        initialData: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        mode: {
            description: string;
            table: {
                control: {
                    type: string;
                };
                options: string[];
            };
        };
        layout: {
            description: string;
            table: {
                control: {
                    type: string;
                };
                options: string[];
                defaultValue: {
                    summary: string;
                };
            };
        };
        cols: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        submitButtonText: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
                defaultValue: {
                    summary: string;
                };
            };
        };
        onSubmit: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
            };
        };
        customCols: {
            description: string;
            table: {
                type: {
                    summary: string;
                };
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
