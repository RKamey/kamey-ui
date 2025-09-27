import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from './DynamicForm';

const meta = {
  title: 'Components/DynamicForm/ConditionalFields',
  parameters: {
    docs: {
      description: {
        component:
          `**DynamicForm con Campos Condicionales** - Ejemplo de cómo usar campos que se muestran/ocultan y cambian sus validaciones basado en el valor de otros campos.
          \n\n**Características:**
          \n- Campos que se muestran/ocultan dinámicamente
          \n- Validaciones que cambian según las condiciones
          \n- Limpieza automática de valores cuando un campo se oculta
          \n- Soporte para múltiples condiciones por campo`
      },
    },
  },
  component: DynamicForm,
  argTypes: {
    fields: {
      description: 'Campos con configuración condicional',
      table: {
        type: { summary: 'FormField[]' },
      },
    },
  },
} satisfies Meta<typeof DynamicForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal: Páginas con tipos internos y externos
export const PageTypeConditional: Story = {
  args: {
    title: 'Crear Página',
    description: 'Los campos se muestran/ocultan según el tipo de página seleccionado',
    fields: [
      {
        name: 'titulo',
        label: 'Título',
        type: 'text',
        placeholder: 'Ingrese el título de la página',
        validations: [{ required: true }]
      },
      {
        name: 'tipo_pagina',
        label: 'Tipo de Página',
        type: 'select',
        options: [
          { label: 'Interna (contenido)', value: 'interno' },
          { label: 'Externa (enlace)', value: 'externo' }
        ],
        validations: [{ required: true }]
      },
      {
        name: 'etiqueta',
        label: 'Etiqueta',
        type: 'text',
        placeholder: 'etiqueta-de-la-pagina',
        conditionalConfig: {
          dependsOn: 'tipo_pagina',
          conditions: [
            {
              value: 'interno',
              show: true,
              validations: [
                { required: true },
                {
                  regex: {
                    pattern: '^[a-z0-9-]+$',
                    message: 'Solo letras minúsculas, números y guiones'
                  }
                }
              ]
            },
            {
              value: 'externo',
              show: false,
              validations: []
            }
          ]
        }
      },
      {
        name: 'external_link',
        label: 'URL Externa',
        type: 'text',
        placeholder: 'https://ejemplo.com',
        conditionalConfig: {
          dependsOn: 'tipo_pagina',
          conditions: [
            {
              value: 'externo',
              show: true,
              validations: [
                { required: true },
                {
                  regex: {
                    pattern: '^https?:\\/\\/.+\\..+',
                    message: 'Debe ser una URL válida'
                  }
                }
              ]
            },
            {
              value: 'interno',
              show: false,
              validations: []
            }
          ]
        }
      },
      {
        name: 'estatus',
        label: 'Activo',
        type: 'switch'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Datos enviados: ${JSON.stringify(values, null, 2)}`);
    }
  },
};

// Historia adicional: Configuración de usuario con roles
export const UserRoleConditional: Story = {
  args: {
    title: 'Configuración de Usuario',
    description: 'Los campos de configuración cambian según el rol seleccionado',
    fields: [
      {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        validations: [{ required: true }]
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        validations: [
          { required: true },
          { email: { value: true, message: 'Email inválido' } }
        ]
      },
      {
        name: 'rol',
        label: 'Rol del Usuario',
        type: 'select',
        options: [
          { label: 'Administrador', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' }
        ],
        validations: [{ required: true }]
      },
      {
        name: 'permisos_admin',
        label: 'Permisos de Administrador',
        type: 'checkbox',
        checkboxConfig: {
          options: [
            { label: 'Gestionar usuarios', value: 'manage_users' },
            { label: 'Configurar sistema', value: 'system_config' },
            { label: 'Ver reportes', value: 'view_reports' }
          ]
        },
        conditionalConfig: {
          dependsOn: 'rol',
          conditions: [
            {
              value: 'admin',
              show: true,
              validations: [{ required: true }]
            },
            {
              value: 'editor',
              show: false,
              validations: []
            },
            {
              value: 'viewer',
              show: false,
              validations: []
            }
          ]
        }
      },
      {
        name: 'departamentos',
        label: 'Departamentos Asignados',
        type: 'select',
        selectConfig: {
          options: [
            { label: 'Ventas', value: 'sales' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Desarrollo', value: 'dev' }
          ]
        },
        conditionalConfig: {
          dependsOn: 'rol',
          conditions: [
            {
              value: 'editor',
              show: true,
              validations: [{ required: true }]
            },
            {
              value: 'admin',
              show: false,
              validations: []
            },
            {
              value: 'viewer',
              show: false,
              validations: []
            }
          ]
        }
      },
      {
        name: 'solo_lectura',
        label: 'Solo Lectura',
        type: 'switch',
        conditionalConfig: {
          dependsOn: 'rol',
          conditions: [
            {
              value: 'viewer',
              show: true,
              validations: []
            },
            {
              value: 'admin',
              show: false,
              validations: []
            },
            {
              value: 'editor',
              show: false,
              validations: []
            }
          ]
        }
      }
    ],
    onSubmit: (values) => {
      console.log('Usuario configurado:', values);
      alert(`Usuario configurado: ${JSON.stringify(values, null, 2)}`);
    }
  },
};