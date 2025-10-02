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

// Datos de ejemplo que simularían venir de una API real
const mockMenusApiResponse = {
  error: false,
  message: "Menús obtenidos correctamente",
  data: [
    {
      idDependencia: 1,
      titulo: "Menú con Páginas",
      etiqueta: null,
      external_link: null,
      tipo_menu: "interno",
      estatus: 1,
      position_menu: 0,
      fechaCreacion: "2025-10-02 04:20:38",
      fechaActualizacion: "2025-10-02 04:50:22",
      id: 1
    },
    {
      idDependencia: 1,
      titulo: "Contacto",
      external_link: null,
      tipo_menu: "pagina",
      estatus: 1,
      position_menu: 1,
      fechaCreacion: "2025-10-02 04:23:59",
      fechaActualizacion: "2025-10-02 04:25:13",
      id: 4,
      etiqueta_menu: "contacto"
    },
    {
      idDependencia: 1,
      titulo: "Link Externo",
      etiqueta: null,
      external_link: "https://www.google.com/?gws_rd=ssl",
      tipo_menu: "externo",
      estatus: 1,
      position_menu: 2,
      fechaCreacion: "2025-10-02 04:50:37",
      fechaActualizacion: "2025-10-02 04:50:37",
      id: 5
    },
    {
      idDependencia: 1,
      titulo: "Noticias",
      external_link: null,
      tipo_menu: "etiqueta",
      estatus: 1,
      position_menu: 3,
      fechaCreacion: "2025-10-02 04:50:47",
      fechaActualizacion: "2025-10-02 04:50:47",
      id: 6,
      etiqueta_menu: "noticias"
    },
    {
      idDependencia: 1,
      titulo: "Página Sobre Nosotros",
      external_link: null,
      tipo_menu: "pagina",
      estatus: 1,
      position_menu: 4,
      fechaCreacion: "2025-10-02 05:00:00",
      fechaActualizacion: "2025-10-02 05:00:00",
      id: 7,
      etiqueta_menu: "sobre-nosotros"
    },
    {
      idDependencia: 1,
      titulo: "Sistema Interno",
      external_link: null,
      tipo_menu: "interno",
      estatus: 0,
      position_menu: 5,
      fechaCreacion: "2025-10-02 05:10:00",
      fechaActualizacion: "2025-10-02 05:10:00",
      id: 8
    }
  ]
};

// Mock function que simula una llamada a la API
const mockApiCall = () => {
  return Promise.resolve({
    data: mockMenusApiResponse
  });
};

export const OnlyPages: Story = {
  args: {
    title: 'Formulario con Select Filtrado - Solo Páginas',
    description: 'Este ejemplo muestra cómo filtrar para obtener solo menús de tipo "pagina"',
    fields: [
      {
        name: 'idMenu',
        label: 'Menú (Solo páginas)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            responseDataPath: 'data', // Especificamos el path para acceder a los datos
            filterBy: {
              field: 'tipo_menu',
              condition: '==',
              value: 'pagina'
            }
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

export const ExcludePages: Story = {
  args: {
    title: 'Formulario con Select Filtrado - Excluir Páginas',
    description: 'Este ejemplo muestra cómo excluir menús de tipo "pagina"',
    fields: [
      {
        name: 'idMenu',
        label: 'Menú (Sin páginas)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            responseDataPath: 'data',
            filterBy: {
              field: 'tipo_menu',
              condition: '!=',
              value: 'pagina'
            }
          }
        }
      },
      {
        name: 'observaciones',
        label: 'Observaciones',
        type: 'text',
        placeholder: 'Ingrese observaciones'
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
    title: 'Formulario con Múltiples Filtros',
    description: 'Este ejemplo muestra cómo aplicar múltiples filtros: solo menús activos que sean páginas o internos',
    fields: [
      {
        name: 'idMenu',
        label: 'Menú (Páginas/Internos activos)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            responseDataPath: 'data',
            filterBy: [
              {
                field: 'estatus',
                condition: '==',
                value: 1
              },
              {
                field: 'tipo_menu',
                condition: 'in',
                value: ['pagina', 'interno']
              }
            ]
          }
        }
      },
      {
        name: 'prioridad',
        label: 'Prioridad',
        type: 'number',
        placeholder: 'Ingrese la prioridad'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};

export const ByMenuType: Story = {
  args: {
    title: 'Filtrar por Tipos de Menú Específicos',
    description: 'Este ejemplo filtra menús que sean de tipos específicos usando el operador "in"',
    fields: [
      {
        name: 'idMenu',
        label: 'Menús (Solo externos y etiquetas)',
        type: 'select',
        selectConfig: {
          apiConfig: {
            getterMethod: mockApiCall,
            valueKey: 'id',
            labelKey: 'titulo',
            responseDataPath: 'data',
            filterBy: {
              field: 'tipo_menu',
              condition: 'in',
              value: ['externo', 'etiqueta']
            }
          }
        }
      },
      {
        name: 'configuracion',
        label: 'Configuración',
        type: 'textarea'
      }
    ],
    onSubmit: (values) => {
      console.log('Valores del formulario:', values);
      alert(`Valores: ${JSON.stringify(values, null, 2)}`);
    }
  },
};