import type { Meta, StoryFn } from '@storybook/react';
import { DynamicCrud } from './DynamicCrud';

const meta: Meta<typeof DynamicCrud> = {
  title: 'Components/DynamicCrud',
  component: DynamicCrud,
  parameters: {
    docs: {
      description: {
        component:
          `El componente DynamicCrud permite generar un CRUD dinámico basado en configuraciones de columnas, campos y datos.
          Este componente es una recopilacion de los componentes DynamicTable y DynamicForm, permitiendo la creación, edición y eliminación de registros de una tabla.`,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Título del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
        defaultValue: { summary: 'Example DynamicCrud' },
      },
    },
    description: {
      description: 'Descripción del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
      },
    },
    formTitle: {
      description: 'Título del formulario de creación/edición.',
      table: {
        type: { summary: 'string | React.ReactElement' },
        defaultValue: { summary: 'Create' },
      },
    },
    formTitles: {
      description: 'Títulos personalizados para los formularios de creación y edición.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '["Create", "Update"]' },
      },
    },
    columns: {
      description: 'Configura las columnas de la tabla.',
      table: {
        type: { summary: 'ColumnProps[]' },
        defaultValue: { summary: '[]' },
      },
    },
    fields: {
      description: 'Define los campos del formulario.',
      table: {
        type: { summary: 'Array<{ name: string; label: string; type: string }>' },
      },
    },
    data: {
      description: 'Datos que se mostrarán en la tabla.',
      table: {
        type: { summary: 'Array<{ key: string; name: string; age: number; address: string }>' },
      },
    },
    showCreateButton: {
      description: 'Muestra u oculta el botón de creación.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    createButtonText: {
      description: 'Texto a mostrar en el botón de creación.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Crear' },
      },
    },
    onCreate: {
      description: 'Función que se ejecuta al crear un nuevo registro.',
      table: {
        type: { summary: '(values: Record<string, unknown>) => void' },
      },
    },
    onEdit: {
      description: 'Función que se ejecuta al editar un registro existente.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    onDelete: {
      description: 'Función que se ejecuta al eliminar un registro.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    formDescription: {
      description: 'Descripción del formulario de creación/edición.',
      table: {
        type: { summary: 'string | React.ReactElement' },
      },
    },
    createButtonIcon: {
      description: 'Icono a mostrar en el botón de creación.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    showRefreshButton: {
      description: 'Determina si se muestra el botón de actualización.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    createRedirect: {
      description: 'Redirección al crear un nuevo registro.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showSearchBar: {
      description: 'Muestra u oculta la barra de búsqueda.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    icon: {
      description: 'Icono a mostrar en el título del componente.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    submitButtonText: {
      description: 'Texto a mostrar en el botón de envío del formulario.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Submit' },
      },
    },
    layout: {
      description: 'Establece el diseño del formulario.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      }
    },
    actionConfig: {
      description: 'Configuración de las acciones de la tabla.',
      table: {
        type: { summary: 'ActionConfig' },
      },
    },
    showView: {
      description: 'Muestra u oculta la acción de ver detalles.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    searchConfig: {
      description: 'Configuración de la barra de búsqueda.',
      table: {
        type: { summary: 'SearchConfig' },
      },
    },
    headerDirection: {
      description: 'Dirección de la cabecera del componente.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    loading: {
      description: 'Determina si se muestra el indicador de carga.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onRefresh: {
      description: 'Función que se ejecuta al actualizar los datos.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onView: {
      description: 'Función que se ejecuta al ver los detalles de un registro.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    apiConfig: {
      description: 'Configuración de la API.',
      table: {
        type: { summary: 'ApiConfig' },
      },
    },
    initialData: {
      description: 'Datos iniciales del formulario.',
      table: {
        type: { summary: 'Record<string, unknown>' },
      },
    },
    themeConfig: {
      description: 'Configuración del tema de Ant Design.',
      table: {
        type: { summary: 'ThemeConfig' },
      },
    },
    moreActions: {
      description: 'Acciones adicionales a mostrar en la tabla.',
      table: {
        type: { summary: 'Object[]' },
      }
    },
    customFilters: {
      description: 'Filtros personalizados para la tabla.',
      table: {
        type: { summary: 'Object[]' },
      }
    },
    formCols: {
      description: 'Número de columnas del formulario.',
      table: {
        type: { summary: 'number' },
      }
    },
    formCustomCols: {
      description: 'Permite las columnas personalizadas en el formulario.',
      table: {
        type: { summary: 'boolean' },
      }
    },
    backButton: {
      description: 'Muestra un botón de retroceso en el formulario.',
      table: {
        type: { summary: 'boolean' },
      }
    },
    disableWrapper: {
      description: 'Deshabilita el contenedor del formulario.',
      table: {
        type: { summary: 'boolean' },
      }
    },
    exportToExcel: {
      description: 'Permite exportar los datos a un archivo Excel.',
      table: {
        type: { summary: 'ExcelConfigProps' },
      }
    },

  },
};

export default meta;

const Template: StoryFn<typeof DynamicCrud> = (args) => <DynamicCrud {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ],
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'address', label: 'Address', type: 'text' },
  ],
  data: [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ],
  showCreateButton: true,
  title: 'Example DynamicCrud',
  description: 'This is an example of DynamicCrud component.',
  showRefreshButton: true,
  showSearchBar: true,
  formCols: 2 as 1 | 2 | 3 | 4,
  moreActions: [
    {
      key: 'Action1',
      label: 'Action 1',
      className: '!text-blue-500',
      onClick: () => alert('Action 1 clicked'),
    },
    {
      key: 'Action2',
      label: 'Action 2',
      className: '!text-red-500',
      onClick: () => alert('Action 2 clicked'),
    },
  ],
  themeConfig: {
    components: {
      Table: {
        headerBg: '#e0e0e0',
      },
    },
  },
};
