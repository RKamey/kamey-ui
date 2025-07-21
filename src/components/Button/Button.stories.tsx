import type { Meta, StoryObj } from '@storybook/react';
import { Btn } from './Button';
import { FiStar, FiHeart, FiDownload } from 'react-icons/fi';

const meta: Meta<typeof Btn> = {
  title: 'Components/Btn',
  component: Btn,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de botón versátil con soporte para iconos, variantes personalizadas y presets predefinidos.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenido del botón'
    },
    type: {
      control: 'select',
      options: ['primary', 'link', 'text', 'default', 'dashed'],
      description: 'Tipo de botón de Ant Design'
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Tamaño del botón'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'danger', 'warning', 'info', 'dark'],
      description: 'Variante de color'
    },
    preset: {
      control: 'select',
      options: ['save', 'delete', 'edit', 'add', 'download', 'upload', 'refresh', 'search', 'settings', 'profile', 'favorite', 'cart', 'mail', 'call', 'home', 'next'],
      description: 'Botón predefinido con icono y texto'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posición del icono'
    },
    iconOnly: {
      control: 'boolean',
      description: 'Mostrar solo el icono sin texto'
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica
export const Default: Story = {
  args: {
    children: 'Botón básico'
  }
};

// Variantes de color
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Btn variant="default">Default</Btn>
      <Btn variant="success">Success</Btn>
      <Btn variant="danger">Danger</Btn>
      <Btn variant="warning">Warning</Btn>
      <Btn variant="info">Info</Btn>
      <Btn variant="dark">Dark</Btn>
    </div>
  )
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Btn size="small" variant="info">Small</Btn>
      <Btn size="middle" variant="info">Middle</Btn>
      <Btn size="large" variant="info">Large</Btn>
    </div>
  )
};

// Presets predefinidos
export const Presets: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Btn preset="save" />
      <Btn preset="delete" />
      <Btn preset="edit" />
      <Btn preset="add" />
      <Btn preset="download" />
      <Btn preset="upload" />
      <Btn preset="refresh" />
      <Btn preset="search" />
    </div>
  )
};

// Botones con iconos personalizados
export const CustomIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Btn icon={<FiStar />} variant="warning">Con estrella</Btn>
      <Btn icon={<FiHeart />} variant="danger" iconPosition="right">Me gusta</Btn>
      <Btn icon={<FiDownload />} variant="info">Descargar</Btn>
    </div>
  )
};

// Solo iconos
export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <Btn preset="save" iconOnly />
      <Btn preset="delete" iconOnly />
      <Btn preset="edit" iconOnly />
      <Btn preset="settings" iconOnly />
      <Btn preset="favorite" iconOnly />
    </div>
  )
};

// Estados
export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Btn variant="info">Normal</Btn>
      <Btn variant="info" loading>Loading</Btn>
      <Btn variant="info" disabled>Disabled</Btn>
    </div>
  )
};

// Tipos de Ant Design
export const Types: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Btn type="primary" variant="info">Primary</Btn>
      <Btn type="default" variant="info">Default</Btn>
      <Btn type="dashed" variant="info">Dashed</Btn>
      <Btn type="text" variant="info">Text</Btn>
      <Btn type="link" variant="info">Link</Btn>
    </div>
  )
};

// Posiciones de iconos
export const IconPositions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Btn preset="save" iconPosition="left">Guardar izquierda</Btn>
      <Btn preset="next" iconPosition="right">Siguiente derecha</Btn>
    </div>
  )
};

// Caso de uso real - Formulario
export const FormExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <Btn preset="save" size="large">Guardar cambios</Btn>
      <Btn type="default" size="large">Cancelar</Btn>
      <Btn preset="delete" type="text" size="large">Eliminar</Btn>
    </div>
  )
};

// Playground interactivo
export const Playground: Story = {
  args: {
    children: 'Botón personalizable',
    type: 'primary',
    size: 'middle',
    variant: 'default',
    iconPosition: 'left',
    iconOnly: false,
    loading: false,
    disabled: false
  }
};