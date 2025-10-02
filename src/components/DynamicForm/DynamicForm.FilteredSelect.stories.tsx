import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from './DynamicForm';

const meta = {
  title: 'Components/DynamicForm/Filtered Select',
  parameters: {
    docs: {
      description: {
        component: `**DynamicForm con Filtros en Select** permite filtrar las opciones que vienen de la API según criterios específicos.
        
        ### Operadores de Filtro Disponibles:
        - \`equals\`: Valor exacto
        - \`not_equals\`: Valor diferente
        - \`contains\`: Contiene el texto (insensible a mayúsculas)
        - \`not_contains\`: No contiene el texto
        - \`greater_than\`: Mayor que (para números)
        - \`less_than\`: Menor que (para números)
        - \`in\`: Valor está en la lista
        - \`not_in\`: Valor no está en la lista
        
        ### Ejemplo de uso:
        \`\`\`typescript
        {
          name: 'idMenu',
          label: 'Menú',
          type: 'select',
          selectConfig: {
            apiConfig: {
              url: 'https://api.example.com/menus',
              method: 'GET',
              valueKey: 'id',
              labelKey: 'titulo',
              filterBy: {
                field: 'tipo_menu',
                operator: 'not_equals',
                value: 'pagina'
              }
            }
          }
        }
        \`\`\`
        `
      },
    },
  },
  component: DynamicForm,
  argTypes: {
    fields: {
      description: 'Campos del formulario con configuración de filtros.',
      table: {
        type: { summary: 'FormField[]' },
      },
    },
  },
} satisfies Meta<typeof DynamicForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo que simularían venir de una API
const mockMenusData = [
  { id: 1, titulo: 'Inicio', tipo_menu: 'pagina', activo: true },
  { id: 2, titulo: 'Productos', tipo_menu: 'categoria', activo: true },
  { id: 3, titulo: 'Servicios', tipo_menu: 'categoria', activo: true },
  { id: 4, titulo: 'Acerca de', tipo_menu: 'pagina', activo: true },
  { id: 5, titulo: 'Contacto', tipo_menu: 'pagina', activo: false },
  { id: 6, titulo: 'Blog', tipo_menu: 'categoria', activo: true },
  { id: 7, titulo: 'Categoría Premium', tipo_menu: 'categoria', activo: true },
];

// Mock function que simula una llamada a la API
const mockApiCall = () => {
  return Promise.resolve({
    data: {
      data: mockMenusData
    }
  });
};

export const SingleFilter: Story = {
  args: {
    title: 'Formulario con Select Filtrado (Un filtro)',
    description: 'Este ejemplo muestra cómo filtrar opciones para excluir menús de tipo "pagina"',
    fields: [
      {
        name: 'idMenu',
        label: 'Menú (Solo categorías)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            filterBy: {
              field: 'tipo_menu',
              operator: 'not_equals',
              value: 'pagina'
            }
          }
        }
      },
      {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese su nombre'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};

export const MultipleFilters: Story = {
  args: {
    title: 'Formulario con Select Filtrado (Múltiples filtros)',
    description: 'Este ejemplo muestra cómo aplicar múltiples filtros: solo categorías activas',
    fields: [
      {
        name: 'idMenu',
        label: 'Menú (Solo categorías activas)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            filterBy: [
              {
                field: 'tipo_menu',
                operator: 'equals',
                value: 'categoria'
              },
              {
                field: 'activo',
                operator: 'equals',
                value: true
              }
            ]
          }
        }
      },
      {
        name: 'descripcion',
        label: 'Descripción',
        type: 'textarea',
        placeholder: 'Ingrese una descripción'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};

export const ContainsFilter: Story = {
  args: {
    title: 'Formulario con Filtro de Contenido',
    description: 'Este ejemplo filtra menús que contienen "Premium" en el título',
    fields: [
      {
        name: 'idMenu',
        label: 'Menús Premium',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            filterBy: {
              field: 'titulo',
              operator: 'contains',
              value: 'Premium'
            }
          }
        }
      },
      {
        name: 'categoria',
        label: 'Categoría',
        type: 'text'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};

export const InOperatorFilter: Story = {
  args: {
    title: 'Formulario con Filtro IN',
    description: 'Este ejemplo filtra menús que tienen IDs específicos usando el operador "in"',
    fields: [
      {
        name: 'idMenu',
        label: 'Menús Específicos (IDs: 2, 3, 6)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            filterBy: {
              field: 'id',
              operator: 'in',
              value: [2, 3, 6]
            }
          }
        }
      },
      {
        name: 'observaciones',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};