import { StoryObj } from '@storybook/react';
type NotificationArgs = {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    description: string;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
};
/**
 * Metadata para la historia del componente de notificación.
 * @description Define el componente asociado a la historia de notificación.
 * @see openNotification - Función que muestra una notificación con un mensaje.
 */
declare const meta: {
    title: string;
    parameters: {
        docs: {
            docsOnly: boolean;
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        type: {
            control: {
                type: "select";
            };
            options: string[];
        };
        placement: {
            control: {
                type: "select";
            };
            defaultValue: string;
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<NotificationArgs>;
export declare const SuccessNotification: Story;
export declare const ErrorNotification: Story;
export declare const InfoNotification: Story;
export declare const WarningNotification: Story;
