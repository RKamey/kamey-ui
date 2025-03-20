import { Meta, StoryObj } from '@storybook/react';
import { openNotification } from './useNotification';
import { Button } from 'antd';


// Define argument types for the notification stories
type NotificationArgs = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description: string;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

/**
 * Metadata para la historia del componente de notificación.
 * @description Define el componente asociado a la historia de notificación.
 * @see openNotification - Función que muestra una notificación con un mensaje.
 */
const meta = {
  title: 'Components/Notification',
  // Component is removed since openNotification is a function, not a React component
  parameters: {
    docs: {
      docsOnly: true,
      description: {
        component: `
**openNotification** es un hook personalizado que permite mostrar notificaciones emergentes en la aplicación.
### Uso:
\`\`\`typescript
import { openNotification } from 'kamey-components';
openNotification('success', 'Usuario creado', 'El usuario fue creado exitosamente');
\`\`\`
`,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning'],
    },
    placement: {
      control: { type: 'select' },
      defaultValue: 'bottomRight',
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    },
  },
} satisfies Meta<NotificationArgs>;

export default meta;

// Define the Story type with our args type
type Story = StoryObj<NotificationArgs>;

/**
 * Template for notification stories
 */
const NotificationStory: Story = {
  render: (args) => {
    const { type, message, description, placement } = args;

    const handleClick = () => {
      openNotification(type, message, description, placement ?? 'bottomRight');
    };

    return (
      <div>
        <Button onClick={handleClick}>Abrir notificación</Button>
      </div>
    );
  },
};

export const SuccessNotification: Story = {
  ...NotificationStory,
  args: {
    type: 'success',
    message: 'Usuario creado',
    description: 'El usuario fue creado exitosamente',
    placement: 'bottomRight',
  },
};

export const ErrorNotification: Story = {
  ...NotificationStory,
  args: {
    type: 'error',
    message: 'Error al crear usuario',
    description: 'Ocurrió un error al intentar crear el usuario',
    placement: 'bottomLeft',
  },
};

export const InfoNotification: Story = {
  ...NotificationStory,
  args: {
    type: 'info',
    message: 'Información importante',
    description: 'Este es un mensaje informativo',
    placement: 'topRight',
  },
};

export const WarningNotification: Story = {
  ...NotificationStory,
  args: {
    type: 'warning',
    message: 'Advertencia',
    description: 'Este es un mensaje de advertencia',
    placement: 'topLeft',
  },
};